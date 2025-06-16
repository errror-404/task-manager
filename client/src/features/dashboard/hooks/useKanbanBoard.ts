/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import type { Column } from '../models/column.interface';
import type { NewTask, Task } from '../models/task.interface';
import { columnService } from '../services/columnService';
import { taskService } from '../services/taskService';
import { moveArrayItem } from '../utils';
import { useDragAndDrop } from './useDragAndDrop';

export type Columns = Record<string, Task[]>;

export const useKanbanBoard = () => {
  const [columns, setColumns] = useState<Columns>({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnMeta, setColumnMeta] = useState<Record<string, Column>>({});

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const [selectedTask, setSelectedTask] = useState<{
    col: string;
    task: Task;
  } | null>(null);

  const { handleDragStart, handleDragEnter, handleDrop } = useDragAndDrop(
    columns,
    setColumns
  );

  const handleAddTask = async (newTask: NewTask) => {
    try {
      const taskFromServer = await taskService.createTask(newTask);
      const colId = taskFromServer.columnId;

      setColumns((prev) => ({
        ...prev,
        [colId]: [taskFromServer, ...(prev[colId] || [])],
      }));

      setIsModalOpen(false);
    } catch (err) {
      console.error('Error al crear tarea:', err);
    }
  };

  const handleEditTask = async (
    colId: string,
    taskId: string,
    newTitle: string
  ) => {
    try {
      const updated = await taskService.update(taskId, {
        title: newTitle,
        updatedAt: new Date(),
      });

      setColumns((prev) => ({
        ...prev,
        [colId]: prev[colId].map((task) =>
          task.id === taskId ? { ...updated } : task
        ),
      }));
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  };

  const handleDeleteTask = async (colId: string, taskId: string) => {
    try {
      await taskService.remove(taskId);
      setColumns((prev) => ({
        ...prev,
        [colId]: prev[colId].filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  };

  const handleRenameColumn = async (colId: string, newTitle: string) => {
    try {
      const updated = await columnService.update(colId, { title: newTitle });
      setColumnMeta((prev) => ({ ...prev, [colId]: updated }));
    } catch (err) {
      console.error('Error renombrando columna:', err);
    }
  };

  const deleteColumn = async (colId: string) => {
    try {
      await columnService.remove(colId);
      setColumns((prev) => {
        const { [colId]: _, ...rest } = prev;
        return rest;
      });
      setColumnMeta((prev) => {
        const { [colId]: _, ...rest } = prev;
        return rest;
      });
      setColumnOrder((prev) => prev.filter((id) => id !== colId));
    } catch (err) {
      console.error('Error eliminando columna:', err);
    }
  };

  const handleAddColumn = async () => {
    if (!newColumnName.trim()) return;

    try {
      const created = await columnService.create(newColumnName);

      setColumns((prev) => ({
        ...prev,
        [created.id]: [],
      }));
      setColumnOrder((prev) => [...prev, created.id]);
      setColumnMeta((prev) => ({ ...prev, [created.id]: created }));

      setNewColumnName('');
      setIsAddingColumn(false);
    } catch (err) {
      console.error('Error agregando columna:', err);
    }
  };

  const handleMoveColumn = async (
    colId: string,
    direction: 'left' | 'right'
  ) => {
    setColumnOrder((prev) => {
      const index = prev.indexOf(colId);
      const target = direction === 'left' ? index - 1 : index + 1;
      if (index < 0 || target < 0 || target >= prev.length) return prev;

      const newOrder = moveArrayItem(prev, index, target);
      columnService.reorder(newOrder);
      return newOrder;
    });
  };

  const handleToggleComplete = async (
    colId: string,
    taskId: string,
    checked: boolean
  ) => {
    try {
      await taskService.update(taskId, { completed: checked });

      setColumns((prev) => ({
        ...prev,
        [colId]: prev[colId].map((task) =>
          task.id === taskId ? { ...task, completed: checked } : task
        ),
      }));
    } catch (err) {
      console.error('Error actualizando estado completado:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasks, cols] = await Promise.all([
          taskService.getAll(),
          columnService.getAll(),
        ]);

        const grouped: Columns = {};
        const meta: Record<string, Column> = {};
        const order = [...cols].sort((a, b) => a.position - b.position);

        for (const col of order) {
          grouped[col.id] = [];
          meta[col.id] = col;
        }

        for (const task of tasks) {
          if (grouped[task.columnId]) {
            grouped[task.columnId].push(task);
          }
        }

        setColumns(grouped);
        setColumnOrder(order.map((c) => c.id));
        setColumnMeta(meta);
      } catch (error) {
        console.error('Error al cargar columnas y tareas:', error);
      }
    };

    fetchData();
  }, []);

  return {
    columns,
    columnOrder,
    columnMeta,
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
    handleToggleComplete,
  };
};
