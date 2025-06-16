import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Column } from '../models/column.interface';
import type { NewTask } from '../models/task.interface';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: NewTask) => void;
  columnOrder: string[];
  columnMeta: Record<string, Column>;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  columnOrder,
  columnMeta,
}) => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: '',
    completed: false,
    priority: 'medium',
    dueDate: undefined,
    userId: 'currentUserId',
    columnId: '',
  });

  useEffect(() => {
    if (isOpen && columnOrder.length > 0) {
      setNewTask((prev) => ({ ...prev, columnId: columnOrder[0] }));
    }
  }, [isOpen, columnOrder]);

  const handleSubmit = () => {
    if (!newTask.title.trim() || !newTask.columnId) return;
    onAdd({
      ...newTask,
      title: newTask.title.trim(),
    });

    setNewTask({
      title: '',
      description: '',
      completed: false,
      priority: 'medium',
      dueDate: undefined,
      userId: 'currentUserId',
      columnId: columnOrder[0] || '',
    });
  };

  if (!isOpen) return null;

  const hasColumns = columnOrder.length > 0;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Crear nueva tarea
        </h3>

        {!hasColumns ? (
          <p className="text-red-600 text-sm">
            ⚠️ No hay columnas disponibles. Crea una columna primero.
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="Título de la tarea"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Describe la tarea brevemente"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridad
              </label>
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value as 'low' | 'medium' | 'high',
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de vencimiento
              </label>
              <input
                type="date"
                value={newTask.dueDate?.toISOString().split('T')[0] || ''}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    dueDate: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Columna
              </label>
              <select
                value={newTask.columnId}
                onChange={(e) =>
                  setNewTask({ ...newTask, columnId: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {columnOrder.map((colId) => (
                  <option key={colId} value={colId}>
                    {columnMeta[colId]?.title ?? colId}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!hasColumns || !newTask.title.trim()}
            className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Agregar tarea
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
