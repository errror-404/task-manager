import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = verifyToken(token) as JwtPayload;
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
