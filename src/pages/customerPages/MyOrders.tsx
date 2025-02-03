import { jwtDecode } from "jwt-decode";
import NotFound from "../../routeProtection/NotFound";
import { Button, message, Table, TableProps, Tag } from "antd";
import {
  useCancelOrderMutation,
  useCheckoutOrderMutation,
  useGetCustomerSpecificOrdersQuery,
} from "../../redux/endpoints/orders.endpoints";
import { ThreeDot } from "react-loading-indicators";
import Swal from "sweetalert2";

interface TOrder {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalAmount: number;
  shippingAddress: string;
  orderStatus: string;
  email: string;
  phone: string;
  isPaid: boolean;
  isCanceled: boolean;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MyOrders = () => {
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetCustomerSpecificOrdersQuery(undefined);

  const [cancelOrder, { isLoading: isCancelingOrder }] =
    useCancelOrderMutation();

  const [checkoutOrder, { isLoading: isCheckingOutOrder }] =
    useCheckoutOrderMutation();

  const cancelOrderHandling = async (_id: string) => {
    Swal.fire({
      title: "Are you sure to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#001529",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await cancelOrder(_id);

          if (data?.data?.success) {
            message.success("Order cancelled successfully");
          } else {
            message.error("Failed to cancel order");
          }
        } catch (error: unknown) {
          message.error("Failed to cancel order");
        }
      }
    });
  };

  const handleBillPayment = async (order: TOrder) => {
    try {
      const data = await checkoutOrder(order).unwrap();
      const url = data?.data?.checkout_url;

      if (data?.success) {
        window.location.href = url;
        // window.open(url, "_blank");
      } else {
        message.error("Failed to check out order");
      }
    } catch (error) {
      message.error("Failed to check out order");
    }
  };

  const columns: TableProps<TOrder>["columns"] = [
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "amount",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Payment Status",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => {
        return isPaid ? (
          <Tag className="text-green-500">Paid</Tag>
        ) : (
          <Tag className="text-red-500">Not Paid</Tag>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: ["isPaid"],
      key: "isPaid",
      render: (rowData: boolean, record: TOrder) => {
        return (
          <div className="flex space-x-2">
            <Button
              disabled={rowData}
              onClick={() => cancelOrderHandling(record._id)}
              className="bg-[#f01] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel Order
            </Button>
            <Button
              disabled={rowData}
              onClick={() => handleBillPayment(record)}
              className="bg-[#001529] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Pay Bill
            </Button>
          </div>
        );
      },
    },
  ];

  const token = localStorage.getItem("bikes_token");
  if (token) {
    const decodedToken = jwtDecode(token);
  } else if (!token) {
    return <NotFound />;
  }

  if (isCancelingOrder || isCheckingOutOrder || isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }
  const products: TOrder[] = productsData?.data;

  return (
    <div>
      <Table<TOrder> columns={columns} dataSource={products} />
    </div>
  );
};

export default MyOrders;
