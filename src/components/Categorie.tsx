import { useGetCategoriesQuery } from "@/store/categorySlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CategorieProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Categorie({
  selectedCategory,
  setSelectedCategory,
}: CategorieProps) {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500">Error loading categories</p>;

  const getCategoryColor = (category: string): string => {
    const found = categories.find((cat) => cat.name === category);
    return found ? found.color : "#6b7280";
  };

  return (
    <Select onValueChange={setSelectedCategory} value={selectedCategory}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select category..." />
      </SelectTrigger>
      <SelectContent>
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
