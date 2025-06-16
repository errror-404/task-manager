import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';
import { TextInput } from '../../../shared/components/TextInput';
import { useAuth } from '../hooks/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();

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
          <TextInput
            label="Correo electrónico"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </Card.Body>

      <Card.Footer>
        <div className="flex flex-col gap-3">
          <Button onClick={() => login({ email, password })} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          <p className="text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </Card.Footer>
    </Card>
  );
};
