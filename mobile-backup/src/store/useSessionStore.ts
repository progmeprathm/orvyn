import { create } from 'zustand';
import { User, Profile } from '../domain/types';

interface SessionState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  setSession: (user: User, profile: Profile) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  
  setSession: (user, profile) => set({ user, profile, isAuthenticated: true }),
  clearSession: () => set({ user: null, profile: null, isAuthenticated: false }),
}));
