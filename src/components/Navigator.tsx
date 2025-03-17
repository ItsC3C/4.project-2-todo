import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../store/todoSlice";
import AddButton from "./AddButton";
import Categorie from "./Categorie";
import InputCreate from "./InputCreate";
import { toast } from "sonner";
import { AppDispatch } from "../store/store";

export const Navigator = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = (event?: React.FormEvent) => {
    if (event) event.preventDefault();

    if (!todoText.trim() || !selectedCategory) {
      toast.error("Please enter a todo and select a category!");
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      text: todoText,
      completed: false,
      category: selectedCategory,
    };

    dispatch(addTodoAsync(newTodo))
      .unwrap()
      .then(() => {
        toast.success("Todo added successfully!");
        setTodoText("");
        setSelectedCategory("");
      })
      .catch((error) => {
        console.error("Error saving todo:", error);
        toast.error("Failed to add todo. Try again!");
      });
  };

  return (
    <form
      onSubmit={handleAddTodo}
      className="flex w-full justify-between gap-2"
    >
      <InputCreate todoText={todoText} setTodoText={setTodoText} />
      <Categorie
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <AddButton onClick={handleAddTodo} />
    </form>
  );
};

export default Navigator;
