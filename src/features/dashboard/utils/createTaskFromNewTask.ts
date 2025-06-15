import type { NewTask, Task } from "../models/task.interface";

export const createTaskFromNewTask = (newTask: NewTask): Task => ({
  ...newTask,
  id: crypto.randomUUID(),
  completed: newTask.completed ?? false,
  priority: newTask.priority ?? "medium",
  userId: newTask.userId ?? "user1",
  createdAt: new Date(),
  updatedAt: new Date(),
});
