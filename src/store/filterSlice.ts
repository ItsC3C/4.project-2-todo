import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string | null;
  status: string | null;
}

const initialState: FilterState = {
  category: null,
  status: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string | null>) => {
      state.status = action.payload;
    },
  },
});

export const { setCategoryFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
