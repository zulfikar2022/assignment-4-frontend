import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/endpoints/products.endpoints";
import { Product } from "../../types";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { data } = useGetProductsQuery({ page: 1, limit: 6 });
  useEffect(() => {
    if (data) {
      let productsData: Product[] = Object.values(data.data);
      productsData = productsData.slice(0, 6);
      setProducts(productsData);
    }
  }, [data]);
  return (
    <div className="mt-5">
      <div className="grid sm:grid-cols-1 md: gird-cols-2 lg:grid-cols-3 gap-1 justify-items-center">
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
