import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://assignment-4-backend-beige.vercel.app/api/v1",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("bikes_token");
    if (token) {
      headers.set("token", token);
    }

    return headers;
  },
});

export const baseApi = createApi({
  tagTypes: ["Products", "Customers", "Orders"],
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
});
