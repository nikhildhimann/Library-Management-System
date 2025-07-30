import { apiSlice } from './apiSlice';
const LOANS_URL = '/api/loans';

export const loansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoans: builder.query({
      query: () => ({
        url: LOANS_URL,
      }),
      providesTags: ['Loan'],
      keepUnusedDataFor: 5,
    }),
    issueBook: builder.mutation({
      query: (data) => ({
        url: LOANS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Loan', 'Book'],
    }),
    returnBook: builder.mutation({
      query: (loanId) => ({
        url: `${LOANS_URL}/${loanId}/return`,
        method: 'PUT',
      }),
      invalidatesTags: ['Loan', 'Book'],
    }),
    // This is the query for members to get their own loans
    getMyLoans: builder.query({
      query: () => ({
        url: `${LOANS_URL}/myloans`,
      }),
      providesTags: ['Loan'],
      keepUnusedDataFor: 5,
    }),
       // Add this new mutation
    deleteLoan: builder.mutation({
      query: (loanId) => ({
        url: `${LOANS_URL}/${loanId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Loan'],
    }),
  }),
});

// Ensure useGetMyLoansQuery is exported here
export const {
  useGetLoansQuery,
  useIssueBookMutation,
  useReturnBookMutation,
  useGetMyLoansQuery,
  useDeleteLoanMutation,
} = loansApiSlice;