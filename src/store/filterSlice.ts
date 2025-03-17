import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string | null;
  status: string | null; // Added status filter
}

const initialState: FilterState = {
  category: null, // Default: No category filter applied
  status: null, // Default: No status filter applied
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.status = action.payload; // Update status filter
    },
  },
});

export const { setCategoryFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
