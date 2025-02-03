import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import {
  useChangeCustomerStatusMutation,
  useGetAllCustomersQuery,
} from "../../redux/endpoints/users.endpoints";
import NotFound from "../../routeProtection/NotFound";
import { Button, Divider, Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Customer {
  _id: string;
  name: string;
  email: string;
  role: string;
  isDeactivated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Default page size

  const { data, isLoading, isFetching, isError } = useGetAllCustomersQuery({
    page: currentPage,
    limit: pageSize,
  });

  const [updateCustomerStatus, { isLoading: isLoadingWhileUpdating }] =
    useChangeCustomerStatusMutation();
  const navigate = useNavigate();

  const handleChangeStatus = (customerId: string) => {
    Swal.fire({
      title: "Are you sure you want to change this user's status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#001529",
      cancelButtonColor: "#1677ff",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateCustomerStatus(customerId);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Changed",
            text: "User status changed successfully.",
            showConfirmButton: false,
            timer: 700,
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while changing user status.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (isError) {
    return <NotFound />;
  }

  // const customers: Customer[] = data?.data?.customers || [];
  const customers: Customer[] = Object.values(data?.data).slice(
    0,
    -1
  ) as Customer[];
  const pagination = data?.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPage: 1,
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "isDeactivated",
      key: "Status",
      render: (isDeactivated: boolean) => (
        <Tag className="font-bold" color={isDeactivated ? "red" : "green"}>
          {isDeactivated ? "Deactivated" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Customer) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => handleChangeStatus(record._id)}
            className="bg-[#001529]"
            type="primary"
          >
            Change Status
          </Button>

          <Button
            className="text-white px-1 rounded-md transition-all duration-300 bg-[#1677ff] hover:bg-[#001529]"
            onClick={() => navigate(`/users/${record._id}`)}
          >
            See Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Divider style={{ borderColor: "#001529" }}>All Customers Here</Divider>
      <Table
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
        className="my-5"
        dataSource={customers}
        columns={columns}
        rowKey="_id"
      />
    </div>
  );
};

export default AllUsers;
