import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
};

// ✅ Async thunk for adding a todo to `json-server`
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (newTodo: Todo) => {
    const response = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error("Failed to save todo in database");
    }

    return newTodo;
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload); // ✅ No page refresh
      })
      .addCase(addTodoAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
