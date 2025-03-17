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

interface TaskItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <div className="flex items-center justify-between gap-5 rounded-lg border px-5 py-1 shadow-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`task-${todo.id}`}>
          <AccordionTrigger className="w-full">
            <div className="flex w-full items-center gap-x-5">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
              />
              <span
                className={`flex-1 text-sm font-medium ${todo.completed ? "text-gray-500 line-through" : ""}`}
              >
                {todo.text}
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
        <Pencil className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700" />
        <X
          className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </div>
  );
};

const getCategoryColor = (category: string) => {
  const categoryColors: { [key: string]: string } = {
    Work: "#f59e0b",
    Personal: "#ef4444",
    Shopping: "#3b82f6",
    Health: "#10b981",
    Learning: "#8b5cf6",
  };
  return categoryColors[category] || "#6b7280"; // Default gray
};

export default TaskItem;
