import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Task } from '../models/task.interface';
import { KanbanTask } from './KanbanTask';

export const KanbanColumn = ({
  id,
  name,
  tasks,
  onDrop,
  onDragStart,
  onEdit,
  onDelete,
  search,
  onRenameColumn,
  onDeleteColumn,
  onMoveColumn,
  onDragEnter,
  onTaskClick,
  onToggleComplete,
}: {
  id: string;
  name: string;
  tasks: Task[];
  onDrop: (colId: string) => void;
  onDragStart: (colId: string, taskId: string) => void;
  onEdit: (colId: string, taskId: string, title: string) => void;
  onDelete: (colId: string, taskId: string) => void;
  search: string;
  onRenameColumn: (colId: string, newTitle: string) => void;
  onDeleteColumn: (colId: string) => void;
  onMoveColumn: (colId: string, direction: 'left' | 'right') => void;
  onDragEnter: (colId: string, overTaskId: string) => void;
  onTaskClick: (colId: string, task: Task) => void;
  onToggleComplete: (colId: string, taskId: string, completed: boolean) => void;
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [colNameInput, setColNameInput] = useState(name);

  const handleRename = () => {
    setIsRenaming(false);
    if (colNameInput.trim() && colNameInput !== name) {
      onRenameColumn(id, colNameInput.trim());
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(id)}
      className="flex-shrink-0 w-[350px] bg-gray-100 rounded p-4 min-h-[300px] shadow"
    >
      <div className="flex items-center justify-between mb-4">
        {isRenaming ? (
          <input
            value={colNameInput}
            onChange={(e) => setColNameInput(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === 'Enter' && handleRename()}
            autoFocus
            className="border rounded px-2 py-1 text-sm w-full mr-2"
          />
        ) : (
          <h3
            onClick={() => setIsRenaming(true)}
            className="text-md font-bold uppercase text-gray-700 cursor-pointer flex-1"
          >
            {name}
          </h3>
        )}

        <div className="flex gap-1 items-center ml-2">
          <button
            onClick={() => onMoveColumn(id, 'left')}
            className="text-gray-400 hover:text-gray-600"
            title="Mover a la izquierda"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMoveColumn(id, 'right')}
            className="text-gray-400 hover:text-gray-600"
            title="Mover a la derecha"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteColumn(id)}
            className="text-gray-500 hover:text-red-600"
            title="Eliminar columna"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {tasks
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
        .map((task) => (
          <KanbanTask
            key={task.id}
            task={task}
            onDragEnter={() => onDragEnter(id, task.id)}
            onDragStart={() => onDragStart(id, task.id)}
            onEdit={(newTitle) => onEdit(id, task.id, newTitle)}
            onDelete={() => onDelete(id, task.id)}
            onClick={() => onTaskClick(id, task)}
            onToggleComplete={(checked) =>
              onToggleComplete(id, task.id, checked)
            }
          />
        ))}
    </div>
  );
};
