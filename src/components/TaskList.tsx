import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  deleteTodoAsync,
  toggleTodoAsync,
  fetchTodos,
  updateTodoAsync,
} from "../store/todoSlice";
import TaskItem from "./TaskItem";
import { useEffect, useMemo } from "react";

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
    if (status === "idle") {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const categoryMatch = selectedCategory
        ? todo.category === selectedCategory
        : true;
      const statusMatch =
        selectedStatus === "completed"
          ? todo.completed
          : selectedStatus === "pending"
            ? !todo.completed
            : true;

      return categoryMatch && statusMatch;
    });
  }, [todos, selectedCategory, selectedStatus]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodoAsync(id));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleTodoAsync(id));
  };

  const handleEdit = (id: string, newText: string) => {
    dispatch(updateTodoAsync({ id, text: newText }));
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
            onEdit={handleEdit}
          />
        ))
      ) : (
        <p>No tasks found for the selected filters!</p>
      )}
    </div>
  );
};

export default TaskList;
