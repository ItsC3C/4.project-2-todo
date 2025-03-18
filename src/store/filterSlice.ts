import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  category: string;
  status: string;
}

const initialState: FilterState = {
  category: "all",
  status: "all",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { setCategoryFilter, setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;
