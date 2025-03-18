import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setStatusFilter } from "@/store/filterSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function StatusFilter() {
  const dispatch = useDispatch();
  const selectedStatus = useSelector(
    (state: RootState) => state.filters.status,
  );

  const handleStatusChange = (status: string) => {
    dispatch(setStatusFilter(status));
  };

  return (
    <Select
      onValueChange={handleStatusChange}
      value={selectedStatus || "all"}
      name="status"
    >
      <SelectTrigger id="status-filter">
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
}
