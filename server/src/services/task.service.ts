import prisma from "../utils/prisma";

interface CreateTaskInput {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  userId: string;
}

export async function getTasks(userId: string) {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(data: CreateTaskInput) {
  return await prisma.task.create({
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
  });
}

export async function getTaskById(id: string, userId: string) {
  return await prisma.task.findFirst({
    where: { id, userId },
  });
}

export async function updateTask(id: string, userId: string, data: any) {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) return null;

  return await prisma.task.update({
    where: { id },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });
}

export async function deleteTask(id: string, userId: string) {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) return null;

  await prisma.task.delete({ where: { id } });
  return task;
}

export async function toggleTask(id: string, userId: string) {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) return null;

  return await prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });
}
