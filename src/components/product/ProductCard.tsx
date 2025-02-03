import { Button, Card } from "antd";
import { Product } from "../../types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const { Meta } = Card;
  const isAvailable = product?.stock > 0;
  const navigate = useNavigate();
  return (
    <div style={{ height: 400, width: 300 }}>
      <Card
        hoverable={isAvailable}
        className={isAvailable ? "" : "bg-gray-200"}
        loading={product === undefined}
        style={{ width: "98%", maxWidth: 300 }}
        cover={
          <div>
            <img
              className="rounded-lg h-48 w-full object-cover"
              alt={`${product?.name}-${product?.brand}`}
              src={product?.imageUrl}
            />
          </div>
        }
      >
        <Meta title={product.name} />
        <div className="flex justify-between items-center">
          <Button
            onClick={() => {
              navigate(`/products/${product._id}`);
            }}
            className="mt-2"
          >
            See Details
          </Button>
          {!isAvailable && (
            <div className="text-red-500 mt-2">Not Available</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
