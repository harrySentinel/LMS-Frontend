import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn} from "../auth/authSlice"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
<<<<<<< HEAD
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL, 
=======
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
>>>>>>> aaab15da751de7f2ef1bcb4d7c04e53a5c1bfe60
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data)=> ({
                url:"refresh",
                method:"GET",
                credentials:"include" as const,
            })
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "me", 
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg,{queryFulfilled, dispatch}){
                try{
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.activationToken,
                            user: result.data.user,
                        })
                    );
                } catch (error:any){
                    console.log(error);

                }
            }
        })
    }),
})

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice;