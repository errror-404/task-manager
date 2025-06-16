import { useState } from 'react';
import type { Columns } from '../models/column.interface';
import { taskService } from '../services/taskService';
import { reorderTasksInColumn } from '../utils';

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

  const handleDrop = async (toCol: string) => {
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
      const updatedTask = { ...movedTask, columnId: toCol };
      const targetTasks = [...(columns[toCol] || []), updatedTask];

      setColumns((prev) => ({
        ...prev,
        [fromCol]: sourceTasks,
        [toCol]: targetTasks,
      }));
      console.log(toCol, 'toCol');
      try {
        await taskService.update(taskId, { columnId: toCol });
      } catch (err) {
        console.error('Error actualizando columnId en backend:', err);
      }
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
