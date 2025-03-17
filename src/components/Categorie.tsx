"use client";

import React from "react";
import { useGetCategoriesQuery } from "@/store/categorySlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type CategorieProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Categorie: React.FC<CategorieProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">Error loading categories</p>;

  return (
    <Select
      onValueChange={(value) => setSelectedCategory(value)}
      value={selectedCategory}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a category..." />
      </SelectTrigger>
      <SelectContent>
        {categories.length === 0 ? (
          <SelectItem disabled value="empty">
            No categories found
          </SelectItem>
        ) : (
          categories.map(({ id, name }) => (
            <SelectItem key={id} value={name}>
              {name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default Categorie;
