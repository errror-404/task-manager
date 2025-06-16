import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Task } from '../models/task.interface';

interface Props {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: () => void;
}

export const TaskDetailModal: React.FC<Props> = ({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
}) => {
  const [edited, setEdited] = useState<Task>(task);

  useEffect(() => {
    const parsedDueDate =
      typeof task.dueDate === 'string' || typeof task.dueDate === 'number'
        ? new Date(task.dueDate)
        : task.dueDate instanceof Date
          ? task.dueDate
          : undefined;

    setEdited({
      ...task,
      dueDate: parsedDueDate,
    });
  }, [task]);

  const handleSave = () => {
    onSave(edited);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Detalles de la tarea
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={edited.title}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              rows={3}
              value={edited.description}
              onChange={(e) =>
                setEdited({ ...edited, description: e.target.value })
              }
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prioridad
            </label>
            <select
              value={edited.priority}
              onChange={(e) =>
                setEdited({
                  ...edited,
                  priority: e.target.value as 'low' | 'medium' | 'high',
                })
              }
              className="w-full rounded border px-3 py-2 text-sm"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de entrega
            </label>
            <input
              type="date"
              value={
                edited.dueDate instanceof Date &&
                !isNaN(edited.dueDate.getTime())
                  ? edited.dueDate.toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) =>
                setEdited({
                  ...edited,
                  dueDate: e.target.value
                    ? new Date(e.target.value)
                    : undefined,
                })
              }
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onDelete}
            className="text-red-600 hover:underline text-sm"
          >
            Eliminar tarea
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
