import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../authentication/store/useAuthStore';
import { DashboardLayout } from '../components/DashboardLayout';
import { KanbanBoard } from '../components/KanbanBoard';

export const DashboardPage = () => {
  const isAuthenticated = useAuthStore((state) => !!state.token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <DashboardLayout>
      <div>
        <KanbanBoard />
      </div>
    </DashboardLayout>
  );
};
