import { ThreeDot } from "react-loading-indicators";
import { useGetProductsQuery } from "../redux/endpoints/products.endpoints";
import { Pagination, Input, Button } from "antd";
import { useState } from "react";
import { Product } from "../types";
import ProductCard from "../components/product/ProductCard";
import Footer from "../components/Footer/Footer";

const Products = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const { isLoading, isFetching, isError, data } = useGetProductsQuery({
    page: pageNumber,
    limit: 9,
    search: query,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          An error occurred while fetching products.
        </p>
      </div>
    );
  }

  const products: Product[] = Object.values(data?.data).slice(
    0,
    -1
  ) as Product[];
  const paginationData = Object.values(data?.data).slice(-1)[0] as {
    total: number;
  };

  return (
    <div className="my-5">
      <div className="flex sm: mx-3 justify-center gap-4 mb-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            setQuery(searchTerm);
            setPageNumber(1);
          }}
        >
          Search
        </Button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>

      <div className="flex justify-center items-center my-4">
        <Pagination
          current={pageNumber}
          onChange={(page) => setPageNumber(page)}
          total={paginationData?.total || 0}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
