import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000', // Your backend URL
  credentials: 'include',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Book', 'User', 'Loan'],
  endpoints: (builder) => ({}),
});