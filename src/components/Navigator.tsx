import { useState } from "react";
import { useAddTodoMutation } from "../store/todoSlice";
import AddButton from "./AddButton";
import Categorie from "./Categorie"; // ✅ Used for selecting category when adding a todo
import CategorieFilter from "./CategorieFilter"; // ✅ Used for filtering displayed tasks
import InputCreate from "./InputCreate";
import StatusFilter from "./StatusFilter";
import { toast } from "sonner";

export const Navigator = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // ✅ For adding todos
  const [filterCategory, setFilterCategory] = useState<string>("all"); // ✅ For filtering
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleAddTodo = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!todoText.trim() || !selectedCategory) {
      toast.error("Please enter a todo and select a valid category!");
      return;
    }

    const newTodo = {
      text: todoText,
      description: "",
      completed: false,
      category: selectedCategory, // ✅ Saved in DB
    };

    try {
      await addTodo(newTodo).unwrap();
      toast.success("Todo added successfully!");
      setTodoText("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error saving todo:", error);
      toast.error("Failed to add todo. Try again!");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleAddTodo}
        className="flex w-full justify-between gap-2"
      >
        <InputCreate todoText={todoText} setTodoText={setTodoText} />
        <Categorie
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AddButton onClick={handleAddTodo} disabled={isLoading} />
      </form>
      <div className="flex gap-2 pt-2">
        <CategorieFilter
          selectedCategory={filterCategory}
          setSelectedCategory={setFilterCategory}
        />
        <StatusFilter />
      </div>
    </div>
  );
};

export default Navigator;
