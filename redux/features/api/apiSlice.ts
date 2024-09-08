import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn} from "../auth/authSlice"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL, 
<<<<<<< HEAD
        credentials: "include",
=======
>>>>>>> c925b8e29415a342191b99272c2b08c53233e103
    }),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query: (data)=> ({
                url:"refresh",
                method:"GET",
                
            })
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "me", 
                method: "GET",
             
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
                    console.log("error fetching user:", error);

                }
            }
        })
    }),
})

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice;