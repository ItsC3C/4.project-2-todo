import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useToggleTodoMutation,
  useUpdateTodoMutation,
} from "../store/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TaskItem from "./TaskItem";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

const TaskList = () => {
  const { data: todos = [], isLoading, isError } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const selectedCategory = useSelector(
    (state: RootState) => state.filters.category,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredTodos = todos.filter(
    (todo) => selectedCategory === "all" || todo.category === selectedCategory,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTodos.length / itemsPerPage),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredTodos.length, itemsPerPage, totalPages]);

  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p className="text-red-500">Error fetching tasks.</p>;

  return (
    <div className="flex flex-col gap-3">
      {paginatedTodos.length > 0 ? (
        paginatedTodos.map((todo) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id)}
            onToggle={() =>
              toggleTodo({ id: todo.id, completed: !todo.completed })
            }
            onEdit={(id, text) => updateTodo({ id, text })}
          />
        ))
      ) : (
        <p>No tasks found for the selected category!</p>
      )}
      <Pagination
        totalItems={filteredTodos.length}
        itemsPerPageOptions={[5, 10, 15, 20, 25]}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default TaskList;
