"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Category = {
  name: string;
  color: string;
};

type CategorieProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const Categorie: React.FC<CategorieProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <Select onValueChange={setSelectedCategory} value={selectedCategory}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select category..." />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.name} value={category.name}>
            <span
              className="mr-2 inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: category.color }}
            ></span>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Categorie;
