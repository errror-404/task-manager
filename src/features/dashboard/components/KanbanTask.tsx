import { GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Task } from "../models/task.interface";

export const KanbanTask = ({
  task,
  onDragStart,
  onEdit,
  onDelete,
  onDragEnter,
  onClick,
}: {
  task: Task;
  onDragStart: () => void;
  onDragEnter: () => void;
  onEdit: (title: string) => void;
  onDelete: () => void;
  onClick?: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(task.title);

  const handleSave = () => {
    onEdit(input.trim() || task.title);
    setIsEditing(false);
  };

  return (
    <div
      draggable
      onClick={onClick}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      className="bg-white rounded p-3 mb-3 cursor-grab flex items-center gap-2"
    >
      <GripVertical className="w-4 h-4 text-gray-400" />
      {isEditing ? (
        <input
          className="flex-1 border rounded px-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <div className="flex-1 flex flex-col">
          <span
            className="flex-1 text-sm"
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title}
          </span>
          <div className="text-xs text-gray-500">
            {task.description || "Sin descripción"}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Prioridad: {task.priority || "Media"}
          </div>
          {task.dueDate && (
            <div className="text-xs text-gray-500 mt-1">
              Fecha de entrega: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
      )}
      <Trash2
        onClick={onDelete}
        className="w-4 h-4 text-gray-400 hover:text-red-600 cursor-pointer"
      />
    </div>
  );
};
