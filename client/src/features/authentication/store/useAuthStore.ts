import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { email: string } | null;
  token: string | null;

  login: (token: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (token, email) =>
        set({
          token,
          user: { email },
        }),

      logout: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
