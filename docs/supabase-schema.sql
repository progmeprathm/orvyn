-- Orvyn Core Data Model
-- Run this in your Supabase SQL Editor

-- Users Table
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  username text UNIQUE NOT NULL,
  avatar text,
  bio text,
  followers_count integer DEFAULT 0,
  following_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Spaces Table
CREATE TABLE public.spaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text,
  member_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Posts Table
CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  space_id uuid REFERENCES public.spaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  image text,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Memberships Table (Join table for Users <-> Spaces)
CREATE TABLE public.memberships (
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  space_id uuid REFERENCES public.spaces(id) ON DELETE CASCADE,
  joined_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (user_id, space_id)
);

-- Likes Table
CREATE TABLE public.likes (
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (user_id, post_id)
);

-- Optional: Initial Mock Data for Testing
INSERT INTO public.users (id, name, username, bio, avatar) VALUES 
('00000000-0000-0000-0000-000000000001', 'Alex Mercer', '@alex_m', 'Exploring the digital frontier.', 'https://i.pravatar.cc/150?u=a042581f4e29026704d');

INSERT INTO public.spaces (id, title, description, category, member_count) VALUES 
('11111111-1111-1111-1111-111111111111', 'Quantum Computing Horizons', 'Exploring the bleeding edge of quantum algorithms.', 'Tech', 15420),
('22222222-2222-2222-2222-222222222222', 'Generative Art Collectives', 'Prompt engineering and algorithmic aesthetics.', 'Art', 8930);

-- Comments Table (Phase 1)
CREATE TABLE public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  author_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Polls Support (Phase 2)
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS post_type text DEFAULT 'standard';
ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS poll_options jsonb;

CREATE TABLE public.poll_votes (
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
  option_id text NOT NULL,
  PRIMARY KEY (user_id, post_id)
);

-- Phase 3: Rooms & Auth Sync
CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  space_id uuid REFERENCES public.spaces(id) ON DELETE CASCADE,
  title text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS room_id uuid REFERENCES public.rooms(id) ON DELETE CASCADE;

-- Insert a default 'General' room for our mock spaces so old posts don't break
INSERT INTO public.rooms (id, space_id, title) VALUES 
('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'General'),
('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'General');
UPDATE public.posts SET room_id = '33333333-3333-3333-3333-333333333333' WHERE space_id = '11111111-1111-1111-1111-111111111111';
UPDATE public.posts SET room_id = '44444444-4444-4444-4444-444444444444' WHERE space_id = '22222222-2222-2222-2222-222222222222';

-- Auth Trigger to auto-create public.users profile when someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, name, username, bio, avatar)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'username', '', 'https://i.pravatar.cc/150?u=' || new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
