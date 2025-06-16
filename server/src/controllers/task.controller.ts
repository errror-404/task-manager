import { Request, Response } from 'express';
import * as taskService from '../services/task.service';
import {
  createTaskSchema,
  updateTaskSchema,
} from '../validators/task.validator';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

export const getAllTasks = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const tasks = await taskService.getTasks(userId);
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const result = createTaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const task = await taskService.createTask({
    ...result.data,
    userId: req.user!.id,
  });

  res.status(201).json(task);
};

export const getTaskById = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const task = await taskService.getTaskById(id, userId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const result = updateTaskSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  const updated = await taskService.updateTask(id, userId, result.data);
  if (!updated) {
    return res.status(404).json({ message: 'Task not found or not yours' });
  }

  res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const deleted = await taskService.deleteTask(id, userId);
  if (!deleted) {
    return res.status(404).json({ message: 'Task not found or not yours' });
  }

  res.json({ message: 'Task deleted successfully' });
};

export const toggleTask = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { id } = req.params;

  const updated = await taskService.toggleTask(id, userId);
  if (!updated) {
    return res.status(404).json({ message: 'Task not found or not yours' });
  }

  res.json(updated);
};
