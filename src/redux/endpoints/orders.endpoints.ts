import { baseApi } from "../api/baseApi";

const orderManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      providesTags: ["Orders"],
      query: (data) => {
        if (data) {
          const { page, limit, search } = data;
          if (page && limit && search) {
            return `/orders?page=${page}&limit=${limit}&search=${search}`;
          }
          if (page && limit) {
            return `/orders?page=${page}&limit=${limit}`;
          }
          if (page) {
            return `/orders?page=${page}/&limit=10`;
          }
          if (search) {
            return `/orders?search=${search}`;
          }
        }
        return "/orders";
      },
    }),
    getSpecificOrder: builder.query({
      providesTags: ["Orders"],
      query: (id) => `/orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: (order) => {
        return {
          url: "/orders",
          method: "POST",
          body: order,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    deleteAnOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    checkoutOrder: builder.mutation({
      query: (order) => {
        return {
          url: "/payments/checkout",
          method: "POST",
          body: order,
        };
      },
      invalidatesTags: ["Orders"],
    }),
    getCustomerSpecificOrders: builder.query({
      providesTags: ["Orders"],
      query: () => {
        return "orders/customer-order/specific-orders";
      },
    }),
    cancelOrder: builder.mutation({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      providesTags: ["Orders"],
      query: (data) => {
        if (data) {
          const { page, limit, search } = data;
          if (page && limit && search) {
            return `/orders?page=${page}&limit=${limit}&search=${search}`;
          }
          if (page && limit) {
            return `/orders?page=${page}&limit=${limit}`;
          }
          if (page) {
            return `/orders?page=${page}/&limit=10`;
          }
          if (search) {
            return `/orders?search=${search}`;
          }
        }
        return "/orders";
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetSpecificOrderQuery,
  useCreateOrderMutation,
  useDeleteAnOrderMutation,
  useCheckoutOrderMutation,
  useGetCustomerSpecificOrdersQuery,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
} = orderManagementApi;
