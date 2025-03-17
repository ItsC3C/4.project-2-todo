import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string;
  status: string; // ✅ Added status filter
}

const initialState: FilterState = {
  category: "all",
  status: "all", // ✅ Default status filter
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      // ✅ Ensure this exists
      state.status = action.payload;
    },
  },
});

export const { setCategoryFilter, setStatusFilter } = filterSlice.actions; // ✅ Export setStatusFilter
export default filterSlice.reducer;
