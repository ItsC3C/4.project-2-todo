import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import todoReducer from "./todoSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    todos: todoReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
