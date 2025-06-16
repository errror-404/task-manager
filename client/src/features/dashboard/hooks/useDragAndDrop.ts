import { useState } from "react";
import type { Columns } from "../models/columns";
import { reorderTasksInColumn } from "../utils";

export const useDragAndDrop = (
  columns: Columns,
  setColumns: React.Dispatch<React.SetStateAction<Columns>>
) => {
  const [dragged, setDragged] = useState<{
    fromCol: string;
    taskId: string;
  } | null>(null);
  const [dragOverTaskId, setDragOverTaskId] = useState<string | null>(null);

  const handleDragStart = (fromCol: string, taskId: string) => {
    setDragged({ fromCol, taskId });
  };

  const handleDragEnter = (col: string, taskId: string) => {
    setDragOverTaskId(taskId);
  };

  const handleDrop = (toCol: string) => {
    if (!dragged) return;
    const { fromCol, taskId } = dragged;

    const sourceTasks = [...columns[fromCol]];
    const taskIndex = sourceTasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const [movedTask] = sourceTasks.splice(taskIndex, 1);

    if (fromCol === toCol) {
      const updated = reorderTasksInColumn(
        columns[fromCol],
        taskId,
        dragOverTaskId
      );
      setColumns((prev) => ({ ...prev, [fromCol]: updated }));
    } else {
      const targetTasks = [...columns[toCol], movedTask];
      setColumns((prev) => ({
        ...prev,
        [fromCol]: sourceTasks,
        [toCol]: targetTasks,
      }));
    }

    setDragged(null);
    setDragOverTaskId(null);
  };

  return {
    handleDragStart,
    handleDragEnter,
    handleDrop,
  };
};
