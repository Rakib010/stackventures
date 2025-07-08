import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const quizApi = createApi({
    reducerPath: "quizApp",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["quiz"],
    endpoints: (builder) => ({
        // add quiz
        addQuiz: builder.mutation({
            query: (body) => ({
                url: '/quizzes',
                method: "POST",
                body
            }),
            invalidatesTags: ["quiz"]
        }),
        // get quiz
        getQuiz: builder.query({
            query: () => "/quizzes",
            providesTags: ["quiz"]
        })
    })
})

export const { useAddQuizMutation, useGetQuizQuery } = quizApi