import { Button } from "../../../shared/components/Button";
import { Card } from "../../../shared/components/Card";
import { TextInput } from "../../../shared/components/TextInput";

export const LoginForm = () => {
  const handleLogin = () => {
    console.log("Navigating to dashboard");

    window.location.href = "/";
  };

  return (
    <Card variant="shadow">
      <Card.Header>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-sm text-gray-500">Inicia sesión para continuar</p>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="space-y-4">
          <TextInput label="Correo electrónico" type="email" name="email" />
          <TextInput label="Contraseña" type="password" name="password" />
        </div>
      </Card.Body>

      <Card.Footer>
        <div className="flex flex-col gap-3">
          <Button onClick={() => handleLogin()}>Entrarr</Button>
          <p className="text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Registrate
            </a>
          </p>
        </div>
      </Card.Footer>
    </Card>
  );
};
