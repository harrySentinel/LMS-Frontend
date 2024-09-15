import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name, email }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { name, email },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-all-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: "get-user",
        method: "PUT",
        body: {
          id,
          role,
        },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: ( id ) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        body: {
          id
         
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} = userApi;
