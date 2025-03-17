import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Footer = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  const total = todos.length;
  const active = todos.filter((todo) => !todo.completed).length;
  const completed = total - active;

  const completedPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <footer className="flex w-full justify-between pt-2 text-xs">
      <span>Total: {total} todos</span>
      <span>Active: {active} todos</span>
      <span>Completed: {completed} todos</span>
      <span>{completedPercentage}% completed</span>
    </footer>
  );
};

export default Footer;
