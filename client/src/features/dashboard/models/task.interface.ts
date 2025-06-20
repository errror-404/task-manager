export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  userId: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  columnId: string;
}

export interface NewTask {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  userId?: string;
  status?: string;
  columnId?: string;
}
