import { Card } from "../../../shared/components/Card";
import { TextInput } from "../../../shared/components/TextInput";
import { Button } from "../../../shared/components/Button";

export const RegisterForm = () => {
  return (
    <>
      <Card.Header>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Crear cuenta</h1>
          <p className="text-sm text-gray-500">Regístrate para comenzar</p>
        </div>
      </Card.Header>

      <Card.Body>
        <div className="space-y-4">
          <TextInput label="Nombre completo" name="name" type="text" />
          <TextInput label="Correo electrónico" name="email" type="email" />
          <TextInput label="Contraseña" name="password" type="password" />
          <TextInput
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
          />
        </div>
      </Card.Body>

      <Card.Footer>
        <div className="flex flex-col gap-3">
          <Button onClick={() => console.log("Registrarse")}>
            Registrarse
          </Button>
          <p className="text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Iniciar sesión
            </a>
          </p>
        </div>
      </Card.Footer>
    </>
  );
};
