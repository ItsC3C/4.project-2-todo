import { Button } from "./ui/button";
import { Plus } from "lucide-react";

type AddButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled} // ✅ Ensure button can be disabled
      className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <Plus size={16} />
      {disabled ? "Adding..." : "Add"}
    </Button>
  );
};

export default AddButton;
