"use client";

import React from "react";
import { useGetCategoriesQuery } from "@/store/categorySlice";
import { useDispatch } from "react-redux";
import { setCategoryFilter } from "@/store/filterSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "./ui/badge";

type CategorieFilterProps = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategorieFilter: React.FC<CategorieFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const dispatch = useDispatch();
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">Error loading categories</p>;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    dispatch(setCategoryFilter(category));
  };

  const getCategoryColor = (category: string) => {
    return categories.find((cat) => cat.name === category)?.color || "#6b7280";
  };

  return (
    <Select onValueChange={handleCategoryChange} value={selectedCategory}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by category..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <Badge style={{ backgroundColor: "#6b7280" }}>All Categories</Badge>
        </SelectItem>
        {categories.length === 0 ? (
          <SelectItem disabled value="empty">
            No categories found
          </SelectItem>
        ) : (
          categories.map(({ id, name }) => (
            <SelectItem key={id} value={name}>
              <Badge style={{ backgroundColor: getCategoryColor(name) }}>
                {name}
              </Badge>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default CategorieFilter;
