import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
};

export type Space = {
  id: string;
  title: string;
  desc: string;
  memberCount: number;
  isJoined: boolean;
  category: string;
};

export type Post = {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  timeContext: string;
  spaceId: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  image: string | null;
  isLikedByMe: boolean;
};

interface StoreState {
  currentUser: User | null;
  spaces: Space[];
  posts: Post[];
  isLoading: boolean;
  
  fetchSpaces: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  joinSpace: (spaceId: string) => Promise<void>;
  leaveSpace: (spaceId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  addPost: (post: Omit<Post, 'id' | 'authorName' | 'authorUsername' | 'authorAvatar' | 'likes' | 'comments' | 'isLikedByMe' | 'timeContext'>) => Promise<void>;
}

const MOCK_CURRENT_USER_ID = '00000000-0000-0000-0000-000000000001';

export const useStore = create<StoreState>((set, get) => ({
  currentUser: {
    id: MOCK_CURRENT_USER_ID,
    name: 'Alex Mercer',
    username: '@alex_m',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    bio: 'Exploring the digital frontier.',
    followers: 1200,
    following: 342,
  },
  spaces: [],
  posts: [],
  isLoading: false,

  fetchSpaces: async () => {
    set({ isLoading: true });
    
    const { data: spacesData, error: spacesError } = await supabase
      .from('spaces')
      .select('*');
      
    const { data: memberData } = await supabase
      .from('memberships')
      .select('space_id')
      .eq('user_id', MOCK_CURRENT_USER_ID);
      
    if (!spacesError && spacesData) {
      const joinedIds = new Set(memberData?.map(m => m.space_id) || []);
      
      const mappedSpaces: Space[] = spacesData.map(s => ({
        id: s.id,
        title: s.title,
        desc: s.description,
        category: s.category,
        memberCount: s.member_count,
        isJoined: joinedIds.has(s.id),
      }));
      
      set({ spaces: mappedSpaces });
    }
    set({ isLoading: false });
  },

  fetchPosts: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(name, username, avatar),
        space:spaces(title)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const mappedPosts: Post[] = data.map(p => ({
        id: p.id,
        authorName: p.author?.name || 'Unknown',
        authorUsername: p.author?.username || '@unknown',
        authorAvatar: p.author?.avatar,
        timeContext: `in ${p.space?.title || 'Unknown Space'}`,
        spaceId: p.space_id,
        title: p.title,
        content: p.content,
        likes: p.likes_count,
        comments: p.comments_count,
        image: p.image,
        isLikedByMe: false,
      }));
      set({ posts: mappedPosts });
    }
  },

  joinSpace: async (spaceId) => {
    set((state) => ({
      spaces: state.spaces.map(s => 
        s.id === spaceId ? { ...s, isJoined: true, memberCount: s.memberCount + 1 } : s
      )
    }));
    
    await supabase.from('memberships').insert({
      user_id: MOCK_CURRENT_USER_ID,
      space_id: spaceId
    });
  },

  leaveSpace: async (spaceId) => {
    set((state) => ({
      spaces: state.spaces.map(s => 
        s.id === spaceId ? { ...s, isJoined: false, memberCount: s.memberCount - 1 } : s
      )
    }));
    
    await supabase.from('memberships').delete()
      .eq('user_id', MOCK_CURRENT_USER_ID)
      .eq('space_id', spaceId);
  },

  likePost: async (postId) => {
    const post = get().posts.find(p => p.id === postId);
    if (!post) return;
    
    const isLiking = !post.isLikedByMe;

    set((state) => ({
      posts: state.posts.map(p => {
        if (p.id === postId) {
          return { 
            ...p, 
            isLikedByMe: isLiking,
            likes: isLiking ? p.likes + 1 : p.likes - 1 
          };
        }
        return p;
      })
    }));

    if (isLiking) {
      await supabase.from('likes').insert({ user_id: MOCK_CURRENT_USER_ID, post_id: postId });
    } else {
      await supabase.from('likes').delete()
        .eq('user_id', MOCK_CURRENT_USER_ID)
        .eq('post_id', postId);
    }
  },

  addPost: async (postData) => {
    const currentUser = get().currentUser!;
    const tempId = Math.random().toString();
    const space = get().spaces.find(s => s.id === postData.spaceId);
    
    const newPost: Post = {
      id: tempId,
      authorName: currentUser.name,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      timeContext: `in ${space?.title || 'Unknown Space'}`,
      likes: 0,
      comments: 0,
      isLikedByMe: false,
      ...postData
    };
    
    set((state) => ({ posts: [newPost, ...state.posts] }));
    
    await supabase.from('posts').insert({
      author_id: MOCK_CURRENT_USER_ID,
      space_id: postData.spaceId,
      title: postData.title,
      content: postData.content,
      image: postData.image
    });
    
    get().fetchPosts();
  }
}));
