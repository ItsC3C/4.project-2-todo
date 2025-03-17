import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "./ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Pencil, X } from "lucide-react";
import { Todo } from "../store/todoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface TaskItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  onDelete,
  onToggle,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleEditClick = () => {
    if (todo.completed) {
      return;
    }
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (newText.trim() !== "") {
      onEdit(todo.id, newText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find((cat) => cat.name === category);
    return categoryObj ? categoryObj.color : "#6b7280";
  };

  return (
    <div className="flex items-center justify-between gap-5 rounded-lg border px-5 py-1 shadow-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`task-${todo.id}`}>
          <AccordionTrigger className="w-full">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
            />
            <div className="flex w-full items-center gap-x-5">
              <span
                className={`flex-1 text-sm font-medium ${
                  todo.completed ? "text-gray-500 line-through" : ""
                }`}
              >
                {isEditing ? (
                  <Input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  todo.text
                )}
              </span>
              <Badge
                style={{ backgroundColor: getCategoryColor(todo.category) }}
              >
                {todo.category}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <Input
              type="text"
              placeholder="Describe your task..."
              value={todo.description}
              readOnly
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex items-center gap-x-3">
        <Pencil
          className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={handleEditClick}
        />
        <X
          className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </div>
  );
};

export default TaskItem;
