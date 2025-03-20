import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  category: string;
};

const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dirt-handsome-muse.glitch.me",
  }),
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
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const tempId = nanoid();
        const patchResult = dispatch(
          todoApi.util.updateQueryData("getTodos", undefined, (draft) => {
            draft.push({
              id: tempId,
              text: newTodo.text,
              category: newTodo.category,
              description: "",
              completed: false,
            });
          }),
        );
        try {
          const { data } = await queryFulfilled;
          dispatch(
            todoApi.util.updateQueryData("getTodos", undefined, (draft) => {
              const index = draft.findIndex((todo) => todo.id === tempId);
              if (index !== -1) draft[index] = data;
            }),
          );
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Todos"],
    }),
    toggleTodo: builder.mutation<Todo, Pick<Todo, "id" | "completed">>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      async onQueryStarted({ id, completed }, { dispatch, queryFulfilled }) {
        return optimisticUpdate(
          dispatch,
          (draft) => {
            const todo = draft.find((t) => t.id === id);
            if (todo) todo.completed = completed;
          },
          queryFulfilled,
        );
      },
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation<Todo, Partial<Todo> & { id: string }>({
      query: ({ id, ...updates }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: updates,
      }),
      async onQueryStarted({ id, ...updates }, { dispatch, queryFulfilled }) {
        return optimisticUpdate(
          dispatch,
          (draft) => {
            const todo = draft.find((t) => t.id === id);
            if (todo) Object.assign(todo, updates);
          },
          queryFulfilled,
        );
      },
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({ url: `/todos/${id}`, method: "DELETE" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        return optimisticUpdate(
          dispatch,
          (draft) => draft.filter((todo) => todo.id !== id),
          queryFulfilled,
        );
      },
      invalidatesTags: ["Todos"],
    }),
  }),
});

async function optimisticUpdate(
  dispatch: any,
  updateFn: (draft: Todo[]) => void,
  queryFulfilled: Promise<any>,
) {
  const patchResult = dispatch(
    todoApi.util.updateQueryData("getTodos", undefined, updateFn),
  );
  try {
    await queryFulfilled;
  } catch {
    patchResult.undo();
  }
}

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
export default todoApi;
