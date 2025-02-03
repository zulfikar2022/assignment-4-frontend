import { baseApi } from "../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/users/login/",
        method: "POST",
        body: data,
      }),
    }),
    getAllCustomers: builder.query({
      providesTags: ["Customers"],
      query: (data) => {
        if (data) {
          const { page, limit, search } = data;
          if (page && limit && search) {
            return `/admin/get-all-customers/?page=${page}&limit=${limit}&search=${search}`;
          }
          if (page && limit) {
            return `/admin/get-all-customers/?page=${page}&limit=${limit}`;
          }
          if (page) {
            return `/admin/get-all-customers/?page=${page}/&limit=10`;
          }
          if (search) {
            return `/admin/get-all-customers/?search=${search}`;
          }
        }
        return "/admin/get-all-customers/";
      },
    }),
    getSpecificCustomer: builder.query({
      providesTags: ["Customers"],
      query: (userId: string) => ({
        url: `/admin/get-customer/${userId}`,
        method: "GET",
      }),
    }),
    changeCustomerStatus: builder.mutation({
      query: (customerId: string) => ({
        url: `/admin/deactivate-or-activate-user/${customerId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Customers"],
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register/",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/users/update-password/",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetAllCustomersQuery,
  useGetSpecificCustomerQuery,
  useChangeCustomerStatusMutation,
  useRegisterUserMutation,
  useUpdatePasswordMutation,
} = userManagementApi;
