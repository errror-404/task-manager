import { Navigate } from 'react-router-dom';
import { Card } from '../../../shared/components/Card';
import { RegisterForm } from '../components/RegisterPage';
import { useAuthStore } from '../store/useAuthStore';

export const RegisterPage = () => {
  const isAuthenticated = useAuthStore((state) => !!state.token);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Card variant="shadow">
          <RegisterForm />
        </Card>
      </div>
    </div>
  );
};
