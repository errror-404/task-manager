import { PlusCircle } from 'lucide-react';
import React from 'react';
import { useKanbanBoard } from '../hooks/useKanbanBoard';
import { KanbanColumn } from './KanbanColumn';
import { SearchBar } from './SearchBar';
import { TaskDetailModal } from './TaskDetailModal';
import { TaskModal } from './TaskModal';

export const KanbanBoard: React.FC = () => {
  const {
    columns,
    columnOrder,
    columnMeta,
    selectedTask,
    setSelectedTask,
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
  } = useKanbanBoard();

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Nueva tarea
          </button>
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {columnOrder.map((colId) => (
          <KanbanColumn
            key={colId}
            id={colId}
            name={columnMeta[colId]?.title ?? colId}
            tasks={columns[colId]}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            search={search}
            onRenameColumn={handleRenameColumn}
            onDeleteColumn={deleteColumn}
            onMoveColumn={handleMoveColumn}
            onTaskClick={(col, task) => setSelectedTask({ col, task })}
            onToggleComplete={(col, taskId, completed) =>
              handleToggleComplete(col, taskId, completed)
            }
          />
        ))}

        <div className="flex flex-col items-center justify-center bg-gray-100 min-w-[250px] rounded p-4 border border-dashed border-gray-400 h-fit">
          {isAddingColumn ? (
            <>
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddColumn();
                  if (e.key === 'Escape') {
                    setNewColumnName('');
                    setIsAddingColumn(false);
                  }
                }}
                placeholder="Nombre de columna"
                className="border border-gray-300 px-2 py-1 w-full rounded text-sm"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleAddColumn}
                  className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                >
                  Crear
                </button>
                <button
                  onClick={() => {
                    setNewColumnName('');
                    setIsAddingColumn(false);
                  }}
                  className="text-gray-600 hover:underline text-sm"
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsAddingColumn(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              + Añadir columna
            </button>
          )}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
        columnOrder={columnOrder}
        columnMeta={columnMeta}
      />

      {selectedTask && (
        <TaskDetailModal
          isOpen={!!selectedTask}
          task={selectedTask.task}
          onClose={() => setSelectedTask(null)}
          onSave={(updatedTask) => {
            setColumns((prev) => ({
              ...prev,
              [selectedTask.col]: prev[selectedTask.col].map((t) =>
                t.id === updatedTask.id
                  ? { ...updatedTask, updatedAt: new Date() }
                  : t
              ),
            }));
          }}
          onDelete={() => {
            setColumns((prev) => ({
              ...prev,
              [selectedTask.col]: prev[selectedTask.col].filter(
                (t) => t.id !== selectedTask.task.id
              ),
            }));
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};
