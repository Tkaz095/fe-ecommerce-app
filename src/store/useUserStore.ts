import { create } from 'zustand';
import { User } from '../types/user.types';

interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Called after a successful login / register */
  setUser: (user: User, token: string) => void;
  /** Clear all auth state (logout) */
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
