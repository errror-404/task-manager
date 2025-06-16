import type { Columns } from '../models/column.interface';

export const initialData: Columns = {
  todo: [
    {
      id: '1',
      title: 'Escribir propuesta',
      completed: false,
      priority: 'medium',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Revisar diseño',
      completed: false,
      priority: 'medium',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  inProgress: [
    {
      id: '3',
      title: 'Desarrollar login',
      completed: false,
      priority: 'medium',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  done: [
    {
      id: '4',
      title: 'Configurar Vite',
      completed: true,
      priority: 'medium',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
