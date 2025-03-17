import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Category = {
  id: string;
  name: string;
  color: string;
};

interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "failed";
  error?: string;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: undefined,
};

// ✅ Fetch categories and log the response once
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:3001/categories");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    console.log("✅ API Response:", data); // ✅ Only logs once
    return data;
  } catch (error) {
    return rejectWithValue("Failed to fetch categories from db.json");
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          if (state.status === "loading") {
            // ✅ Prevents re-fetching
            state.status = "idle";
            state.categories = action.payload;
            console.log("✅ Updated Redux State:", state.categories);
          }
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
