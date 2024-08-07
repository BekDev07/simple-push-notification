import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (subscription) => ({
        url: "/subscribe",
        method: "POST",
        body: subscription,
      }),
    }),
    sendNotification: builder.mutation({
      query: (notification) => ({
        url: "/sendNotification",
        method: "POST",
        body: notification,
      }),
    }),
  }),
});

export const { useSubscribeMutation, useSendNotificationMutation } = apiSlice;
