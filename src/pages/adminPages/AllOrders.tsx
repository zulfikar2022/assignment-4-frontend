import { ThreeDot } from "react-loading-indicators";
import {
  useCancelOrderMutation,
  useGetAllOrdersQuery,
} from "../../redux/endpoints/orders.endpoints";
import { Button, message, Table, Tag } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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

const AllOrders = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetAllOrdersQuery({ page: currentPage });

  const [cancelOrder, { isLoading: isCancelingOrder }] =
    useCancelOrderMutation();
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
        } catch (error: any) {
          message.error("Failed to cancel order");
        }
      }
    });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      responsive: ["md", "lg"],
    },
    {
      title: "Customer Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md", "lg"],
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Payment Status",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid: boolean) => {
        return isPaid ? (
          <Tag className="text-green-500"> Paid</Tag>
        ) : (
          <Tag className="text-red-500">Not Paid</Tag>
        );
      },
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus: string) => {
        return orderStatus;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: TOrder) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => cancelOrderHandling(record._id)}
            disabled={record.isPaid}
            className="bg-[#001529] text-white"
          >
            Cancel Order
          </Button>
          <Button
            onClick={() => {
              navigate(`/orders/${record._id}`);
            }}
            type="primary"
          >
            See Details
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading || isCancelingOrder) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  const orders: TOrder[] = Object.values(data?.data || []).slice(
    0,
    -1
  ) as TOrder[];
  const pagination: {
    page: number;
    limit: number;
    total: number;
  } = Object.values(data?.data || []).slice(-1)[0] as {
    page: number;
    limit: number;
    total: number;
  };

  return (
    <div className="my-4">
      <Table
        columns={columns}
        dataSource={orders}
        loading={isLoading}
        pagination={{
          current: pagination?.page,
          pageSize: pagination?.limit,
          total: pagination?.total,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="_id"
      />
    </div>
  );
};

export default AllOrders;
