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
  roomId: string | null;
  title: string;
  content: string;
  likes: number;
  comments: number;
  image: string | null;
  isLikedByMe: boolean;
  postType: 'standard' | 'poll' | 'question';
  pollOptions?: { id: string; text: string; votes: number }[];
  votedOptionId?: string | null;
};

export type Comment = {
  id: string;
  postId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
};

interface StoreState {
  authUserId: string | null;
  setAuthUserId: (id: string | null) => void;
  currentUser: User | null;
  spaces: Space[];
  posts: Post[];
  comments: Record<string, Comment[]>; // map postId to comments
  isLoading: boolean;
  
  fetchCurrentUser: () => Promise<void>;
  fetchSpaces: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<void>;
  joinSpace: (spaceId: string) => Promise<void>;
  leaveSpace: (spaceId: string) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  votePoll: (postId: string, optionId: string) => Promise<void>;
  addPost: (post: Omit<Post, 'id' | 'authorName' | 'authorUsername' | 'authorAvatar' | 'likes' | 'comments' | 'isLikedByMe' | 'timeContext' | 'votedOptionId'>) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  authUserId: null,
  setAuthUserId: (id) => set({ authUserId: id }),
  currentUser: null,
  spaces: [],
  posts: [],
  comments: {},
  isLoading: false,

  fetchCurrentUser: async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', get().authUserId!)
      .single();
      
    if (data) {
      set({ currentUser: {
        id: data.id,
        name: data.name,
        username: data.username,
        avatar: data.avatar,
        bio: data.bio,
        followers: data.followers_count,
        following: data.following_count
      }});
    }
  },

  fetchSpaces: async () => {
    set({ isLoading: true });
    
    const { data: spacesData } = await supabase.from('spaces').select('*');
    const { data: memberData } = await supabase.from('memberships').select('space_id').eq('user_id', get().authUserId!);
      
    if (spacesData) {
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
    const { data } = await supabase
      .from('posts')
      .select(`*, author:users(name, username, avatar), space:spaces(title)`)
      .order('created_at', { ascending: false });
      
    // Fetch user's likes to determine isLikedByMe
    const { data: likesData } = await supabase
      .from('likes')
      .select('post_id')
      .eq('user_id', get().authUserId!);
      
    const likedIds = new Set(likesData?.map(l => l.post_id) || []);

    // Fetch user's votes
    const { data: votesData } = await supabase
      .from('poll_votes')
      .select('post_id, option_id')
      .eq('user_id', get().authUserId!);
      
    const votedOptions = new Map(votesData?.map(v => [v.post_id, v.option_id]) || []);

    if (data) {
      const mappedPosts: Post[] = data.map(p => ({
        id: p.id,
        authorName: p.author?.name || 'Unknown',
        authorUsername: p.author?.username || '@unknown',
        authorAvatar: p.author?.avatar,
        timeContext: `in ${p.space?.title || 'Unknown Space'}`,
        spaceId: p.space_id,
        roomId: p.room_id,
        title: p.title,
        content: p.content,
        likes: p.likes_count,
        comments: p.comments_count,
        image: p.image,
        isLikedByMe: likedIds.has(p.id),
        postType: p.post_type || 'standard',
        pollOptions: p.poll_options,
        votedOptionId: votedOptions.get(p.id)
      }));
      set({ posts: mappedPosts });
    }
  },

  joinSpace: async (spaceId) => {
    const space = get().spaces.find(s => s.id === spaceId);
    if (!space) return;

    // Optimistic
    set((state) => ({
      spaces: state.spaces.map(s => s.id === spaceId ? { ...s, isJoined: true, memberCount: s.memberCount + 1 } : s)
    }));
    
    // DB sync
    await supabase.from('memberships').insert({ user_id: get().authUserId!, space_id: spaceId });
    // Note: To properly update spaces.member_count securely, an RPC or Trigger should be used. 
    // We will do a direct update here for MVP purposes since RLS is likely off.
    await supabase.from('spaces').update({ member_count: space.memberCount + 1 }).eq('id', spaceId);
  },

  leaveSpace: async (spaceId) => {
    const space = get().spaces.find(s => s.id === spaceId);
    if (!space) return;

    set((state) => ({
      spaces: state.spaces.map(s => s.id === spaceId ? { ...s, isJoined: false, memberCount: s.memberCount - 1 } : s)
    }));
    
    await supabase.from('memberships').delete().eq('user_id', get().authUserId!).eq('space_id', spaceId);
    await supabase.from('spaces').update({ member_count: space.memberCount - 1 }).eq('id', spaceId);
  },

  likePost: async (postId) => {
    const post = get().posts.find(p => p.id === postId);
    if (!post) return;
    
    const isLiking = !post.isLikedByMe;

    set((state) => ({
      posts: state.posts.map(p => p.id === postId ? { ...p, isLikedByMe: isLiking, likes: isLiking ? p.likes + 1 : p.likes - 1 } : p)
    }));

    if (isLiking) {
      await supabase.from('likes').insert({ user_id: get().authUserId!, post_id: postId });
      await supabase.from('posts').update({ likes_count: post.likes + 1 }).eq('id', postId);
    } else {
      await supabase.from('likes').delete().eq('user_id', get().authUserId!).eq('post_id', postId);
      await supabase.from('posts').update({ likes_count: post.likes - 1 }).eq('id', postId);
    }
  },

  votePoll: async (postId, optionId) => {
    const post = get().posts.find(p => p.id === postId);
    if (!post || !post.pollOptions || post.votedOptionId) return;

    const newOptions = post.pollOptions.map(opt => 
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );

    set(state => ({
      posts: state.posts.map(p => 
        p.id === postId ? { ...p, votedOptionId: optionId, pollOptions: newOptions } : p
      )
    }));

    await supabase.from('poll_votes').insert({
      user_id: get().authUserId!,
      post_id: postId,
      option_id: optionId
    });
    
    await supabase.from('posts').update({ poll_options: newOptions }).eq('id', postId);
  },

  addPost: async (postData) => {
    const currentUser = get().currentUser!;
    const space = get().spaces.find(s => s.id === postData.spaceId);
    
    // Create DB entry first to get the true UUID
    const { data } = await supabase.from('posts').insert({
      author_id: get().authUserId!,
      space_id: postData.spaceId,
      title: postData.title,
      content: postData.content,
      image: postData.image,
      post_type: postData.postType,
      poll_options: postData.pollOptions
    }).select().single();
    
    if (data) {
      const newPost: Post = {
        id: data.id,
        authorName: currentUser.name,
        authorUsername: currentUser.username,
        authorAvatar: currentUser.avatar,
        timeContext: `in ${space?.title || 'Unknown Space'}`,
        likes: 0,
        comments: 0,
        isLikedByMe: false,
        votedOptionId: null,
        ...postData
      };
      set((state) => ({ posts: [newPost, ...state.posts] }));
    }
  },

  fetchComments: async (postId) => {
    const { data } = await supabase
      .from('comments')
      .select('*, author:users(name, username, avatar)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
      
    if (data) {
      const mappedComments: Comment[] = data.map(c => ({
        id: c.id,
        postId: c.post_id,
        authorName: c.author?.name || 'Unknown',
        authorUsername: c.author?.username || '@unknown',
        authorAvatar: c.author?.avatar,
        content: c.content,
        createdAt: c.created_at,
      }));
      set(state => ({
        comments: { ...state.comments, [postId]: mappedComments }
      }));
    }
  },

  addComment: async (postId, content) => {
    const currentUser = get().currentUser!;
    const post = get().posts.find(p => p.id === postId);
    
    // Insert into DB
    const { data } = await supabase.from('comments').insert({
      post_id: postId,
      author_id: get().authUserId!,
      content
    }).select().single();
    
    if (data && post) {
      const newComment: Comment = {
        id: data.id,
        postId,
        authorName: currentUser.name,
        authorUsername: currentUser.username,
        authorAvatar: currentUser.avatar,
        content,
        createdAt: data.created_at,
      };
      
      // Update local state (both comments array and post comment count)
      set(state => ({
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), newComment]
        },
        posts: state.posts.map(p => p.id === postId ? { ...p, comments: p.comments + 1 } : p)
      }));
      
      // Update post comment count in DB
      await supabase.from('posts').update({ comments_count: post.comments + 1 }).eq('id', postId);
    }
  }
}));
