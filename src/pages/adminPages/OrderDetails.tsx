import { useParams } from "react-router-dom";
import { useGetSpecificOrderQuery } from "../../redux/endpoints/orders.endpoints";
import { ThreeDot } from "react-loading-indicators";
import { Card, Tag } from "antd";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, isLoading } = useGetSpecificOrderQuery(orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  const order = data?.data;
  return (
    <div className="my-4 mx-2">
      <Card
        title={`Order ID: ${order._id}`}
        className="w-full md:w-1/2 mx-auto shadow-lg"
      >
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Total Amount:</strong> ${order.totalAmount}
        </p>
        <p>
          <strong>Shipping Address:</strong> {order.shippingAddress}
        </p>
        <p>
          <strong>Order Status:</strong> {order.orderStatus}
        </p>
        <p>
          <strong>Payment Status:</strong>{" "}
          {order.isPaid ? (
            <Tag className="text-green-500">Paid</Tag>
          ) : (
            <Tag className="text-red-500">Not Paid</Tag>
          )}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.orderDate).toLocaleString()}
        </p>
      </Card>
    </div>
  );
};

export default OrderDetails;
