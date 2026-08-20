import { CommunityRepository, PostRepository } from '../data/mockRepositories';
import { Community, Post } from '../domain/types';

export const CommunityUseCases = {
  getRecommendedCommunities: async (): Promise<Community[]> => {
    return await CommunityRepository.getRecommended();
  },
  
  getCommunityDetails: async (id: string): Promise<Community | undefined> => {
    return await CommunityRepository.getById(id);
  },
  
  getCommunityFeed: async (communityId: string): Promise<Post[]> => {
    return await PostRepository.getFeed(communityId);
  },

  getPersonalizedFeed: async (): Promise<Post[]> => {
    return await PostRepository.getPersonalizedFeed();
  }
};
