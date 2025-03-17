import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type AddButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2"
    >
      <Plus size={16} /> Add
    </Button>
  );
};

export default AddButton;
