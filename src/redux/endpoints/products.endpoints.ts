import { baseApi } from "../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      providesTags: ["Products"],
      query: (data) => {
        if (data) {
          const { page, limit, search } = data;
          if (page && limit && search) {
            return `/products?page=${page}&limit=${limit}&search=${search}`;
          }
          if (page && limit) {
            return `/products?page=${page}&limit=${limit}`;
          }
          if (page) {
            return `/products?page=${page}/&limit=10`;
          }
          if (search) {
            return `/products?search=${search}`;
          }
        }
        return "/products";
      },
    }),
    getSpecificProduct: builder.query({
      providesTags: ["Products"],
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/admin/create-product",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["Products"],
    }),
    deleteAProduct: builder.mutation({
      query: (id: string) => ({
        url: `/admin/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateAProduct: builder.mutation({
      query: ({ product, _id }) => {
        return {
          url: `/admin/update-product/${_id}`,
          method: "PUT",
          body: product,
        };
      },
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSpecificProductQuery,
  useCreateProductMutation,
  useDeleteAProductMutation,
  useUpdateAProductMutation,
} = productManagementApi;
