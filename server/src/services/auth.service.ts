import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";

interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function register(data: RegisterInput) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  return user;
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) return null;

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) return null;

  return signToken({ id: user.id, email: user.email });
}
