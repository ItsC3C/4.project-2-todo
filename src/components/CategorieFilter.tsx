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

interface CategorieFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategorieFilter({
  selectedCategory,
  setSelectedCategory,
}: CategorieFilterProps) {
  const dispatch = useDispatch();
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">Error loading categories</p>;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    dispatch(setCategoryFilter(category));
  };

  const getCategoryColor = (category: string): string => {
    const found = categories.find((cat) => cat.name === category);
    return found ? found.color : "#6b7280";
  };

  return (
    <Select onValueChange={handleCategoryChange} value={selectedCategory}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by category..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          <span style={{ color: "#6b7280" }}>All Categories</span>
        </SelectItem>
        {categories.length === 0 ? (
          <SelectItem disabled value="empty">
            No categories found
          </SelectItem>
        ) : (
          categories.map(({ id, name }) => (
            <SelectItem key={id} value={name}>
              <span style={{ color: getCategoryColor(name) }}>{name}</span>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
