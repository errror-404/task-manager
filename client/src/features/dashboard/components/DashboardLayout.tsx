import React from "react";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader
        user={{
          email: "",
        }}
        onLogout={() => "Logout"}
      />
      <div className="flex flex-1">
        <main className="flex-1  p-6">{children}</main>
      </div>
    </div>
  );
};
