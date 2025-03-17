import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchCategories, Category } from "@/store/categorySlice";
import { setCategoryFilter } from "@/store/filterSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CategorieFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, status, error } = useSelector(
    (state: RootState) => state.categories,
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.filters.category,
  );

  // ✅ Fetch categories only when necessary
  React.useEffect(() => {
    if (status === "idle" && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, status, categories.length]);

  // ✅ Handle category selection
  const handleCategoryChange = (category: string) => {
    dispatch(setCategoryFilter(category === "all" ? null : category));
  };

  return (
    <Select
      onValueChange={handleCategoryChange}
      value={selectedCategory || "all"}
      name="category"
    >
      <SelectTrigger className="w-[200px]" id="category-filter">
        <SelectValue placeholder="Filter by category..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
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

export default CategorieFilter;
