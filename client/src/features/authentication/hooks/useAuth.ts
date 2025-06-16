import axios from 'axios';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

interface LoginPayload {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loginToStore = useAuthStore((state) => state.login);

  const login = async ({ email, password }: LoginPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const token = res.data.token;
      loginToStore(token, email);

      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
