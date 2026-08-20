import { AuthRepository } from '../data/mockRepositories';
import { User, Profile } from '../domain/types';

export const AuthUseCases = {
  login: async (email: string, password: string): Promise<{ user: User; profile: Profile }> => {
    // Application logic: validate, check permissions, etc.
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const session = await AuthRepository.login(email, password);
    return session;
  },
  
  signup: async (email: string, password: string, name: string, username: string): Promise<{ user: User; profile: Profile }> => {
    if (!email || !password || !name || !username) {
      throw new Error("All fields are required");
    }
    const session = await AuthRepository.signup(email, password, name, username);
    return session;
  },

  getSession: async (): Promise<{ user: User; profile: Profile } | null> => {
    return await AuthRepository.getSession();
  }
};
