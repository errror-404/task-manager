import axios from 'axios';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export const useRegister = () => {
  const loginToStore = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/register',
        { name, email, password },
        { withCredentials: true }
      );

      const token = res.data.token;
      loginToStore(token, email);
      window.location.href = '/';
    } catch (err: any) {
      console.error('Error al registrarse:', err);
      setError(err.response?.data?.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
