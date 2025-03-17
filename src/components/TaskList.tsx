import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  deleteTodoAsync,
  toggleTodoAsync,
  fetchTodos,
} from "../store/todoSlice";
import TaskItem from "./TaskItem";
import { useEffect } from "react";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, status } = useSelector((state: RootState) => state.todos);
  const selectedCategory = useSelector(
    (state: RootState) => state.filters.category,
  );
  const selectedStatus = useSelector(
    (state: RootState) => state.filters.status,
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // ✅ Filter todos by category
  const filteredByCategory = selectedCategory
    ? todos.filter((todo) => todo.category === selectedCategory)
    : todos;

  // ✅ Filter todos by status
  const filteredTodos = selectedStatus
    ? filteredByCategory.filter((todo) => {
        if (selectedStatus === "completed") {
          return todo.completed;
        }
        if (selectedStatus === "pending") {
          return !todo.completed;
        }
        return true; // If "all", no filtering
      })
    : filteredByCategory;

  const handleDelete = (id: string) => {
    dispatch(deleteTodoAsync(id));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTodoAsync(id));
  };

  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "failed") return <p>Error fetching tasks.</p>;

  return (
    <div className="flex flex-col gap-3">
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))
      ) : (
        <p>No tasks found for the selected filters!</p>
      )}
    </div>
  );
};

export default TaskList;
