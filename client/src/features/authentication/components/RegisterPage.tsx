import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { TextInput } from '../../../shared/components/TextInput';
import { useRegister } from '../hooks/useRegister';

export const RegisterForm = () => {
  const { register, loading, error } = useRegister();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = () => {
    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    register({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

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
          <TextInput
            label="Nombre completo"
            name="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextInput
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextInput
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextInput
            label="Confirmar contraseña"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </Card.Body>

      <Card.Footer>
        <div className="flex flex-col gap-3">
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
          <p className="text-center text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Iniciar sesión
            </a>
          </p>
        </div>
      </Card.Footer>
    </>
  );
};
