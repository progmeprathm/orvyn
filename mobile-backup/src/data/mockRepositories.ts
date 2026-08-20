import { Community, Post, Profile, User } from '../domain/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockUsers: Record<string, User> = {
  'user-1': { id: 'user-1', email: 'test@example.com', createdAt: new Date().toISOString() }
};

const mockProfiles: Record<string, Profile> = {
  'user-1': { 
    id: 'profile-1', 
    userId: 'user-1', 
    username: 'orvyn_fan', 
    displayName: 'Orvyn Fan', 
    followersCount: 10, 
    followingCount: 5,
    bio: 'Just exploring communities!'
  }
};

const mockCommunities: Community[] = [
  { id: 'comm-1', name: 'Anime Fans', description: 'Discuss the latest anime!', memberCount: 15420, isPrivate: false, createdAt: new Date().toISOString() },
  { id: 'comm-2', name: 'Tech Enthusiasts', description: 'Everything technology.', memberCount: 8900, isPrivate: false, createdAt: new Date().toISOString() },
];

const mockPosts: Post[] = [
  { id: 'post-1', communityId: 'comm-1', authorId: 'user-1', content: 'Just watched the new episode!', likesCount: 42, commentsCount: 5, createdAt: new Date().toISOString() },
];

export const AuthRepository = {
  async login(email: string, password: string): Promise<{ user: User; profile: Profile }> {
    await delay(1000);
    if (email === 'test@example.com' && password === 'password') {
      return { user: mockUsers['user-1'], profile: mockProfiles['user-1'] };
    }
    throw new Error('Invalid credentials');
  },
  async signup(email: string, password: string, name: string, username: string): Promise<{ user: User; profile: Profile }> {
    await delay(1000);
    const id = `user-${Date.now()}`;
    const newUser: User = { id, email, createdAt: new Date().toISOString() };
    const newProfile: Profile = {
      id: `profile-${Date.now()}`,
      userId: id,
      username,
      displayName: name,
      followersCount: 0,
      followingCount: 0,
    };
    mockUsers[id] = newUser;
    mockProfiles[id] = newProfile;
    return { user: newUser, profile: newProfile };
  },
  async getSession(): Promise<{ user: User; profile: Profile } | null> {
    await delay(500);
    return { user: mockUsers['user-1'], profile: mockProfiles['user-1'] };
  }
};

export const CommunityRepository = {
  async getRecommended(): Promise<Community[]> {
    await delay(800);
    return mockCommunities;
  },
  async getById(id: string): Promise<Community | undefined> {
    await delay(500);
    return mockCommunities.find(c => c.id === id);
  }
};

export const PostRepository = {
  async getFeed(communityId?: string): Promise<Post[]> {
    await delay(1000);
    if (communityId) {
      return mockPosts.filter(p => p.communityId === communityId);
    }
    return mockPosts;
  },
  async getPersonalizedFeed(): Promise<Post[]> {
    await delay(1000);
    return mockPosts;
  },
  async createPost(communityId: string, authorId: string, content: string): Promise<Post> {
    await delay(800);
    const newPost: Post = {
      id: `post-${Date.now()}`,
      communityId,
      authorId,
      content,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };
    mockPosts.unshift(newPost);
    return newPost;
  }
};
