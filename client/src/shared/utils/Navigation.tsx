import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../features/authentication/pages/LoginPage';
import { RegisterPage } from '../../features/authentication/pages/RegisterPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { PrivateRoute } from './PrivateRoute';

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
