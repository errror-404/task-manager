import { Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Task } from "../models/task.interface";
import { KanbanTask } from "./KanbanTask";

export const KanbanColumn = ({
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
}: {
  name: string;
  tasks: Task[];
  onDrop: (col: string) => void;
  onDragStart: (col: string, id: string) => void;
  onEdit: (col: string, id: string, title: string) => void;
  onDelete: (col: string, id: string) => void;
  search: string;
  onRenameColumn: (col: string, newTitle: string) => void;
  onDeleteColumn: (col: string) => void;
  onMoveColumn: (col: string, direction: "left" | "right") => void;
  onDragEnter: (col: string, overTaskId: string) => void;
  onTaskClick: (col: string, task: Task) => void;
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [colNameInput, setColNameInput] = useState(name);

  const handleRename = () => {
    setIsRenaming(false);
    if (colNameInput.trim() && colNameInput !== name) {
      onRenameColumn(name, colNameInput.trim());
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(name)}
      className="flex-shrink-0 w-72 bg-gray-100 rounded p-4 min-h-[300px] shadow"
    >
      <div className="flex items-center justify-between mb-4">
        {isRenaming ? (
          <input
            value={colNameInput}
            onChange={(e) => setColNameInput(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
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
            onClick={() => onMoveColumn(name, "left")}
            className="text-gray-400 hover:text-gray-600"
            title="Mover a la izquierda"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMoveColumn(name, "right")}
            className="text-gray-400 hover:text-gray-600"
            title="Mover a la derecha"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDeleteColumn(name)}
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
            onDragEnter={() => onDragEnter(name, task.id)}
            onDragStart={() => onDragStart(name, task.id)}
            onEdit={(newTitle) => onEdit(name, task.id, newTitle)}
            onDelete={() => onDelete(name, task.id)}
            onClick={() => onTaskClick(name, task)}
          />
        ))}
    </div>
  );
};
