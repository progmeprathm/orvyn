export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  bannerUrl?: string;
  memberCount: number;
  isPrivate: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  communityId: string;
  authorId: string;
  content: string;
  mediaUrls?: string[];
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
}
