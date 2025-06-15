import { DashboardLayout } from "../components/DashboardLayout";
import { KanbanBoard } from "../components/KanbanBoard";

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div>
        <KanbanBoard />
      </div>
    </DashboardLayout>
  );
};
