"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchCategories, Category } from "@/store/categorySlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

type CategorieProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const Categorie: React.FC<CategorieProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector(
    (state: RootState) => state.categories,
  );

  // ✅ Fetch categories only when necessary
  React.useEffect(() => {
    if (status === "idle" && categories.length === 0) {
      console.log("📌 Dispatching fetchCategories...");
      dispatch(fetchCategories());
    }
  }, [dispatch, status, categories.length]); // ✅ No infinite loop

  // ✅ Log Redux state only when it changes
  React.useEffect(() => {
    console.log("📌 Redux State Updated:", { status, categories, error });
    if (error) {
      toast.error(error);
    }
  }, [status, categories, error]);

  return (
    <Select
      onValueChange={setSelectedCategory}
      value={selectedCategory}
      name="category"
    >
      <SelectTrigger className="w-[200px]" id="category-select">
        <SelectValue placeholder="Select category..." />
      </SelectTrigger>
      <SelectContent>
        {status === "loading" ? (
          <SelectItem disabled value="loading">
            Loading...
          </SelectItem>
        ) : error ? (
          <SelectItem disabled value="error">
            Error loading categories
          </SelectItem>
        ) : categories.length === 0 ? (
          <SelectItem disabled value="empty">
            No categories found
          </SelectItem>
        ) : (
          categories.map((category: Category) => (
            <SelectItem key={category.id} value={category.name}>
              <span
                className="mr-2 inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></span>
              {category.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default Categorie;
