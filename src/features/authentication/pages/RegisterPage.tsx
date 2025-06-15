import { Card } from "../../../shared/components/Card";
import { RegisterForm } from "../components/RegisterPage";

export const RegisterPage = () => {
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
