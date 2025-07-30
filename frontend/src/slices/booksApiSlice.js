import { apiSlice } from './apiSlice';
const BOOKS_URL = '/api/books';

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: BOOKS_URL,
      }),
      providesTags: ['Book'],
      keepUnusedDataFor: 5,
    }),
    getBookDetails: builder.query({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: BOOKS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookDetailsQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApiSlice;