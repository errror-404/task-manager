import type { Task } from "../models/task.interface";

export function reorderTasksInColumn(
  tasks: Task[],
  draggedId: string,
  targetId: string | null
): Task[] {
  const index = tasks.findIndex((t) => t.id === draggedId);
  if (index === -1) return tasks;

  const newTasks = [...tasks];
  const [moved] = newTasks.splice(index, 1);
  const targetIndex = newTasks.findIndex((t) => t.id === targetId);
  const insertIndex = targetIndex === -1 ? newTasks.length : targetIndex;
  newTasks.splice(insertIndex, 0, moved);
  return newTasks;
}
