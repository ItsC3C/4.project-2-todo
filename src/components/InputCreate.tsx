import { Input } from "@/components/ui/input";

interface InputCreateProps {
  todoText: string;
  setTodoText: (text: string) => void;
}

export default function InputCreate({
  todoText,
  setTodoText,
}: InputCreateProps) {
  return (
    <div className="w-full">
      <Input
        type="text"
        placeholder="Add new todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
    </div>
  );
}
