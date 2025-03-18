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
  const selectedStatus = useSelector(
    (state: RootState) => state.filters.status,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const generatePaginationOptions = (totalItems: number) => {
    const options = [5];
    for (let i = 10; i <= Math.min(50, totalItems); i += 5) {
      options.push(i);
    }
    return options;
  };

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch =
      selectedCategory === "all" || todo.category === selectedCategory;
    const statuxlatch =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && todo.completed) ||
      (selectedStatus === "pending" && !todo.completed);
    return categoryMatch && statuxlatch;
  });

  const sortedTodos = [...filteredTodos].reverse();

  const totalPages = Math.max(1, Math.ceil(sortedTodos.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [sortedTodos.length, itemsPerPage, totalPages]);

  const paginatedTodos = sortedTodos.slice(
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
            onEdit={(id, updates) => updateTodo({ id, ...updates })}
          />
        ))
      ) : (
        <p>No tasks found for the selected category and status!</p>
      )}
      <Pagination
        totalItems={sortedTodos.length}
        itemsPerPageOptions={generatePaginationOptions(sortedTodos.length)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default TaskList;
