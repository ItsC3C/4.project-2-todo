import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Category = {
  id: string;
  name: string;
  color: string;
};

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dirt-handsome-muse.glitch.me",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
export default categoryApi;
