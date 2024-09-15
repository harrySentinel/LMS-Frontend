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
    getAllCourse: builder.query({
        query: () => ({
          url: "get-courses",
          method: "GET",
          
          credentials: "include" as const, // Ensures cookies are included in the request
        }),
      }),
      deleteCourse: builder.mutation({
        query: ( id ) => ({
          url: `delete-course/${id}`,
          method: "DELETE",
          body: {
            id
           
          },
          credentials: "include" as const,
        }),
      }),
  }),
});

export const { useCreateCourseMutation , useGetAllCourseQuery,useDeleteCourseMutation } = courseApi;
