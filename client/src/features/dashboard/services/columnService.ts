import { api } from '../../../shared/api/axios';
import type { Column } from '../models/column.interface';

export const columnService = {
  async getAll(): Promise<Column[]> {
    const res = await api.get('/columns');
    return res.data;
  },

  async create(title: string): Promise<Column> {
    const res = await api.post('/columns', { title });
    return res.data;
  },

  async update(id: string, updates: Partial<Column>): Promise<Column> {
    const res = await api.patch(`/columns/${id}`, updates);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/columns/${id}`);
  },

  async reorder(columnIds: string[]): Promise<void> {
    await api.patch('/columns/reorder', {
      idPositionPairs: columnIds.map((id, index) => ({
        id,
        position: index,
      })),
    });
  },
};
