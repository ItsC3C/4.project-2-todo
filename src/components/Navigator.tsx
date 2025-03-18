import { useState } from "react";
import { useAddTodoMutation } from "../store/todoSlice";
import AddButton from "./AddButton";
import Categorie from "./Categorie";
import CategorieFilter from "./CategorieFilter";
import InputCreate from "./InputCreate";
import StatusFilter from "./StatusFilter";
import { toast } from "sonner";

export const Navigator = () => {
  const [todoText, setTodoText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [addTodo, { isLoading }] = useAddTodoMutation();

  const handleAddTodo = async (event?: any) => {
    event?.preventDefault();
    if (!todoText.trim() || !selectedCategory) {
      toast.error("Please enter a todo and select a valid category!");
      return;
    }
    const newTodo = {
      text: todoText,
      description: "",
      completed: false,
      category: selectedCategory,
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
    <div className="w-full">
      <form
        onSubmit={handleAddTodo}
        className="flex w-full flex-col justify-between gap-2 xl:flex-row"
      >
        <InputCreate todoText={todoText} setTodoText={setTodoText} />
        <Categorie
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AddButton onClick={handleAddTodo} disabled={isLoading} />
      </form>
      <div className="flex w-full flex-row gap-2 pt-2 pb-2">
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
