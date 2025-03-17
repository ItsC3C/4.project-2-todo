import { Input } from "@/components/ui/input";

type InputCreateProps = {
  todoText: string;
  setTodoText: (text: string) => void;
};

const InputCreate: React.FC<InputCreateProps> = ({ todoText, setTodoText }) => {
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
};

export default InputCreate;
