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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface TaskItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

export default function TaskItem({
  todo,
  onDelete,
  onToggle,
  onEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.text);
  const [description, setDescription] = useState(todo.description);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: categories = [] } = useGetCategoriesQuery();

  const saveTitle = () => {
    if (title.trim()) {
      onEdit(todo.id, { text: title });
      setIsEditing(false);
    }
  };

  const saveDescription = () => {
    onEdit(todo.id, { description });
    setIsDialogOpen(false);
  };

  const categoryColor =
    categories.find((cat) => cat.name === todo.category)?.color || "#6b7280";

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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={saveTitle}
                  autoFocus
                />
              ) : (
                <div>
                  <span
                    className={`text-sm font-medium ${
                      todo.completed ? "text-gray-500 line-through" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
              )}
            </div>
            <Badge style={{ backgroundColor: categoryColor }}>
              {todo.category}
            </Badge>
            {!todo.completed && (
              <Pencil
                className="h-5 w-5 cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
              />
            )}
            <X
              className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => onDelete(todo.id)}
            />
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Description:</span>
              <span className="text-gray-700">{description}</span>
              <button
                className="ml-2 text-blue-500 underline"
                onClick={() => setIsDialogOpen(true)}
              >
                Edit
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Description</DialogTitle>
            <DialogDescription>
              Edit the description of your task
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-4 flex justify-end space-x-2">
            <button
              className="mr-2 rounded bg-gray-300 px-4 py-2"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={saveDescription}
            >
              Save
            </button>
          </div>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </div>
  );
}
