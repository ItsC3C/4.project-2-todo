import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  text: string;
  description: string;
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

// ✅ Fetch todos from `json-server`
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch("http://localhost:3001/todos");
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
});

// ✅ Add a todo to `json-server`
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (newTodo: Omit<Todo, "id">) => {
    const response = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) throw new Error("Failed to save todo in database");

    return response.json(); // ✅ Return the newly created todo (with ID)
  },
);

// ✅ Delete a todo from `json-server`
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id: string) => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete todo");

    return id; // ✅ Return the deleted todo's ID
  },
);

// ✅ Toggle todo's `completed` state in `json-server`
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async (id: string, { getState }) => {
    const state = getState() as { todos: TodoState };
    const todo = state.todos.todos.find((t) => t.id === id);
    if (!todo) throw new Error("Todo not found");

    const updatedTodo = { ...todo, completed: !todo.completed };

    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) throw new Error("Failed to update todo");

    return response.json(); // ✅ Return updated todo
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      })

      // ✅ Add Todo
      .addCase(addTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state) => {
        state.status = "failed";
      })

      // ✅ Delete Todo
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })

      // ✅ Toggle Todo Completed State
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id,
        );
        if (index !== -1) state.todos[index] = action.payload;
      });
  },
});

export default todoSlice.reducer;
