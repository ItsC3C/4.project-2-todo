import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface AddButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function AddButton({
  onClick,
  disabled = false,
}: AddButtonProps) {
  const buttonClasses = `flex items-center gap-2 rounded-lg px-4 py-2 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`;

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      <Plus size={16} />
      {disabled ? "Adding..." : "Add"}
    </Button>
  );
}
