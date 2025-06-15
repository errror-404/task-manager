import { useState } from "react";
import type { Task, NewTask } from "../models/task.interface";
import type { Columns } from "../models/columns";
import { initialData } from "../constants/InitialData";
import {
  createTaskFromNewTask,
  moveArrayItem,
  normalizeColumnKey,
} from "../utils";
import { useDragAndDrop } from "./useDragAndDrop";

export const useKanbanBoard = () => {
  const [columns, setColumns] = useState<Columns>(initialData);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    Object.keys(initialData)
  );

  const [selectedTask, setSelectedTask] = useState<{
    col: string;
    task: Task;
  } | null>(null);

  const { handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(
    columns,
    setColumns
  );

  const handleAddTask = (newTask: NewTask) => {
    const fullTask = createTaskFromNewTask(newTask);
    setColumns((prev) => ({
      ...prev,
      todo: [fullTask, ...prev.todo],
    }));
    setIsModalOpen(false);
  };

  const handleEditTask = (col: string, id: string, newTitle: string) => {
    setColumns((prev) => ({
      ...prev,
      [col]: prev[col].map((task) =>
        task.id === id
          ? { ...task, title: newTitle, updatedAt: new Date() }
          : task
      ),
    }));
  };

  const handleDeleteTask = (col: string, id: string) => {
    setColumns((prev) => ({
      ...prev,
      [col]: prev[col].filter((task) => task.id !== id),
    }));
  };

  const handleRenameColumn = (oldKey: string, newName: string) => {
    const newKey = normalizeColumnKey(newName);
    if (!newKey || oldKey === newKey || columns[newKey]) return;

    setColumns((prev) => {
      const { [oldKey]: oldTasks, ...rest } = prev;
      return { ...rest, [newKey]: oldTasks };
    });

    setColumnOrder((prev) => prev.map((k) => (k === oldKey ? newKey : k)));
  };

  const deleteColumn = (key: string) => {
    setColumns((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _, ...rest } = prev;
      return rest;
    });

    setColumnOrder((prev) => prev.filter((k) => k !== key));
  };

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;
    const key = normalizeColumnKey(newColumnName);
    if (columns[key]) return;

    setColumns((prev) => ({
      ...prev,
      [key]: [],
    }));

    setColumnOrder((prev) => [...prev, key]);
    setNewColumnName("");
    setIsAddingColumn(false);
  };

  const handleMoveColumn = (colName: string, direction: "left" | "right") => {
    setColumnOrder((prev) => {
      const index = prev.indexOf(colName);
      const target = direction === "left" ? index - 1 : index + 1;
      if (index < 0 || target < 0 || target >= prev.length) return prev;
      return moveArrayItem(prev, index, target);
    });
  };

  return {
    columns,
    columnOrder,
    selectedTask,
    setSelectedTask,
    uiState: {
      search,
      isModalOpen,
      newColumnName,
      isAddingColumn,
      setSearch,
      setIsModalOpen,
      setNewColumnName,
      setIsAddingColumn,
    },
    handleDragStart,
    handleDragEnter,
    handleDrop,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleRenameColumn,
    deleteColumn,
    handleAddColumn,
    handleMoveColumn,
    setColumns,
  };
};
