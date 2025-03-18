import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Todo = {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  category: string;
};

const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),

    addTodo: builder.mutation<Todo, Pick<Todo, "text" | "category">>({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: { ...newTodo, description: "", completed: false },
      }),
      invalidatesTags: ["Todos"],
    }),

    toggleTodo: builder.mutation<Todo, Pick<Todo, "id" | "completed">>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodo: builder.mutation<Todo, Partial<Todo> & { id: string }>({
      query: ({ id, ...updates }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;

export default todoApi;
