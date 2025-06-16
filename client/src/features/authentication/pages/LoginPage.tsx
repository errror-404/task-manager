import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { useAuthStore } from '../store/useAuthStore';

export const LoginPage = () => {
  const isAuthenticated = useAuthStore((state) => !!state.token);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};
