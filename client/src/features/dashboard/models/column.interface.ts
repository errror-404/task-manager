import type { Task } from './task.interface';

export interface Column {
  id: string;
  title: string;
  position: number;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export type Columns = Record<string, Task[]>;
