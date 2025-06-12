import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import { LoginPage } from "../../features/authentication/pages/LoginPage";
import { RegisterPage } from "../../features/authentication/pages/RegisterPage";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};
