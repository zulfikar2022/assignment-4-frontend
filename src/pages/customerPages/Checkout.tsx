import { useParams } from "react-router-dom";
import { useGetSpecificProductQuery } from "../../redux/endpoints/products.endpoints";
import { ThreeDot } from "react-loading-indicators";
import NotFound from "../../routeProtection/NotFound";
import { Button, InputNumber, Input } from "antd";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  useCheckoutOrderMutation,
  useCreateOrderMutation,
} from "../../redux/endpoints/orders.endpoints";
import { message } from "antd";

const Checkout = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isFetching, isError } =
    useGetSpecificProductQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();
  const [checkoutOrder, { isLoading: isCheckingOut }] =
    useCheckoutOrderMutation();

  if (isLoading || isFetching || isCreatingOrder || isCheckingOut) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }
  if (isError) {
    return <NotFound />;
  }

  const product = data?.data;
  const totalPrice = quantity * product.price;

  // Function to create order object
  const handleCheckout = async () => {
    const token = localStorage.getItem("bikes_token")!;
    const {
      _id,
    }: {
      _id: string;
    } = jwtDecode(token);
    setShippingAddress(shippingAddress.toString().trim());
    setPhone(phone.toString().trim());

    if (!shippingAddress || !phone) {
      return;
    }
    const order = {
      userId: _id,
      productId: product._id,
      quantity: quantity,
      shippingAddress,
      phone,
    };
    try {
      const createdOrder = await createOrder(order).unwrap();
      try {
        // logic to handle update orders isPaid after successful payment

        const checkoutResponse = await checkoutOrder(createdOrder.data);
        if (checkoutResponse.data.success) {
          // logic to handle update orders isPaid after successful payment
          const redirectionUrl = checkoutResponse.data.data.checkout_url;
          window.location.href = redirectionUrl;
          // window.open(redirectionUrl, "_blank");
        }
      } catch (error: unknown) {
        // handling error about updating orders isPaid
        message.error("Error while creating order. Please try again");
      }
      message.success(createdOrder.message);
    } catch (error) {
      // console.error("Error creating order:", error);

      message.error(error?.data?.error?.message);
    }
    // You can now send this `order` object to your backend
  };

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row items-center md:items-start my-5 ">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <img
              style={{ height: "400px", width: "100%", objectFit: "cover" }}
              src={product.imageUrl}
              alt={`${product.name}-${product.brand}`}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-2xl">
              <span className="font-bold text-lg">Brand:</span> {product.brand}
            </p>
            <p className="text-2xl">
              <span className="font-bold text-lg">Price:</span> ${product.price}
            </p>
            <p className="text-2xl">
              <span className="font-bold text-lg">Stock:</span> {product.stock}{" "}
              {product.stock <= 0 && " (Not Available)"}
            </p>
            <p className="text-2xl">
              <span className="font-bold text-lg">Quantity:</span>
              <InputNumber
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(value) => setQuantity(value)}
                className="ml-2"
              />
            </p>
            <p className="text-2xl mt-4">
              <span className="font-bold text-lg">Total Price:</span> $
              {totalPrice.toFixed(2)}
            </p>

            <p className="text-2xl mt-4">
              <span className="font-bold text-lg">Shipping Address:</span>
              <Input.TextArea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your shipping address"
                className="mt-2 w-full"
                rows={4}
              />
            </p>

            <p className="text-2xl mt-4">
              <span className="font-bold text-lg">Phone:</span>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="mt-2 w-full"
              />
            </p>

            <Button
              type="primary"
              className="mt-4 bg-[#001529]"
              onClick={handleCheckout}
            >
              Pay Bill
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
