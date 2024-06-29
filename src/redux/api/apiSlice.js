import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.accessToken;
      if (token) {
          headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
  },
  }),
  tagTypes: ["Category", "Products", "Discount", "Coupon", "Product","RelatedProducts"],
  endpoints: (builder) => ({}),
});
