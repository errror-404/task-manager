import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../features/authentication/store/useAuthStore';

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const isAuthenticated = useAuthStore((state) => !!state.token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
