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

  // ✅ Fetch tasks on initial load
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // ✅ Filter todos based on the selected category
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category === selectedCategory)
    : todos;

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
        <p>No tasks found for the selected category!</p>
      )}
    </div>
  );
};

export default TaskList;
