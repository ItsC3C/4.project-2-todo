import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Category = { id: string; name: string; color: string };

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dirt-handsome-muse.glitch.me",
  }),
  tagTypes: ["Categories"],
  endpoints: (b) => ({
    getCategories: b.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    updateCategory: b.mutation<Category, Partial<Category> & { id: string }>({
      query: ({ id, ...u }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: u,
      }),
      async onQueryStarted({ id, ...u }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          categoryApi.util.updateQueryData(
            "getCategories",
            undefined,
            (d: Category[]) => {
              const cat = d.find((c) => c.id === id);
              if (cat) Object.assign(cat, u);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery, useUpdateCategoryMutation } = categoryApi;
export default categoryApi;
