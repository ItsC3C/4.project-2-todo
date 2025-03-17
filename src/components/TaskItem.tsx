import { useState } from "react";
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
import { useGetCategoriesQuery } from "../store/categorySlice";

interface TaskItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
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

  const { data: categories = [] } = useGetCategoriesQuery();

  const handleEditClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (!todo.completed) setIsEditing(true);
  };

  const handleSaveEdit = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (newText.trim()) {
      onEdit(todo.id, newText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSaveEdit();
  };

  const getCategoryColor = (category: string) => {
    return categories.find((cat) => cat.name === category)?.color || "#6b7280";
  };

  return (
    <div className="flex items-center justify-between gap-5 rounded-lg border px-5 py-1 shadow-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`task-${todo.id}`}>
          <AccordionTrigger className="flex w-full items-center gap-x-3">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id, !todo.completed)}
            />
            <div className="flex-1">
              {isEditing ? (
                <Input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onBlur={handleSaveEdit}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <span
                  className={`text-sm font-medium ${todo.completed ? "text-gray-500 line-through" : ""}`}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <Badge style={{ backgroundColor: getCategoryColor(todo.category) }}>
              {todo.category}
            </Badge>
            {!todo.completed && (
              <Pencil
                className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={handleEditClick}
              />
            )}
            <X
              className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => onDelete(todo.id)}
            />
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
    </div>
  );
};

export default TaskItem;
