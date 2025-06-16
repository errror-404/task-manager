import prisma from '../utils/prisma';

export async function getColumns(userId: string) {
  return await prisma.column.findMany({
    where: { userId },
    orderBy: { position: 'asc' },
  });
}

export async function createColumn(data: { title: string; userId: string }) {
  const last = await prisma.column.findFirst({
    where: { userId: data.userId },
    orderBy: { position: 'desc' },
  });

  const nextPosition = last ? last.position + 1 : 0;

  return await prisma.column.create({
    data: {
      title: data.title,
      userId: data.userId,
      position: nextPosition,
    },
  });
}

export async function updateColumn(
  id: string,
  userId: string,
  data: { title?: string; position?: number }
) {
  const column = await prisma.column.findFirst({
    where: { id, userId },
  });

  if (!column) return null;

  return await prisma.column.update({
    where: { id },
    data,
  });
}

export async function deleteColumn(id: string, userId: string) {
  const column = await prisma.column.findFirst({
    where: { id, userId },
  });

  if (!column) return null;

  await prisma.task.deleteMany({ where: { columnId: id } });

  await prisma.column.delete({ where: { id } });

  return true;
}
