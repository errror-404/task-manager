import { Request, Response } from 'express';
import * as columnService from '../services/column.service';
import prisma from '../utils/prisma';
import {
  createColumnSchema,
  updateColumnSchema,
} from '../validators/column.validator';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export const getAllColumns = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const columns = await columnService.getColumns(userId);
  res.json(columns);
};

export const createColumn = async (req: Request, res: Response) => {
  const result = createColumnSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const column = await columnService.createColumn({
    title: result.data.title,
    userId: req.user!.id,
  });

  res.status(201).json(column);
};

export const updateColumn = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const result = updateColumnSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const updated = await columnService.updateColumn(id, userId, result.data);
  if (!updated) {
    return res.status(404).json({ message: 'Column not found or not yours' });
  }

  res.json(updated);
};

export const deleteColumn = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const deleted = await columnService.deleteColumn(id, userId);

  if (!deleted) {
    return res.status(404).json({ message: 'Column not found or not yours' });
  }

  res.json({ message: 'Column deleted successfully' });
};

export const reorderColumns = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const updates = req.body as { id: string; position: number }[];

  const operations = updates.map(({ id, position }) =>
    prisma.column.update({
      where: { id, userId },
      data: { position },
    })
  );

  await Promise.all(operations);

  res.json({ message: 'Columns reordered' });
};
