import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { registerSchema, loginSchema } from "../validators/auth.validator";

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const user = await authService.register(result.data);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const token = await authService.login(result.data);
  if (!token)
    return res.status(401).json({ message: "Credenciales inválidas" });

  res.json({ token });
};
