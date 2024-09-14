import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data, // Send the data object directly
        credentials: "include" as const, // Ensures cookies are included in the request
      }),
    }),
  }),
});

export const { useCreateCourseMutation } = courseApi;
