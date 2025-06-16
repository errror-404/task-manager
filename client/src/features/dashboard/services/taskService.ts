import { api } from '../../../shared/api/axios';
import type { NewTask, Task } from '../models/task.interface';

export const taskService = {
  async getAll(): Promise<Task[]> {
    const res = await api.get('/tasks');
    return res.data;
  },

  async createTask(task: NewTask): Promise<Task> {
    const res = await api.post('/tasks', task);
    return res.data;
  },

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const res = await api.patch(`/tasks/${id}`, updates);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
