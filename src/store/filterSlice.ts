import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string | null;
}

const initialState: FilterState = {
  category: null, // Default: No filter applied
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategoryFilter } = filterSlice.actions;
export default filterSlice.reducer;
