import {
  Button,
  notification,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  useDeleteAProductMutation,
  useGetProductsQuery,
} from "../../redux/endpoints/products.endpoints";
import { ThreeDot } from "react-loading-indicators";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface DataType {
  _id: string;
  name: string;
  brand: string;
  price: number;
  productModel: string;
  stock: number;
  imageUrl: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AdminProducts = () => {
  const navigate = useNavigate();
  const [deleteProduct, { isSuccess, isError }] = useDeleteAProductMutation();
  const handleUpdate = (record: DataType) => {
    navigate(`/update-product/${record._id}`);
  };
  const handleDelete = (record: DataType) => {
    Swal.fire({
      title: `Are you sure to delete the product named <b>${record.name}</b> ?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#001529",
      cancelButtonColor: "#ff0205",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(record._id).then((data) => {
          if (isSuccess) {
            notification.success({
              message: "Product deleted successfully",
              description: `Product named ${record.name} has been deleted successfully`,
              duration: 2,
            });
          }
          if (isError) {
            notification.error({
              message: "Product deletion failed",
              description: `Product named ${record.name} deletion failed`,
              duration: 2,
            });
          }
        });
      }
    });
  };
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({ page: currentPage });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Model",
      dataIndex: "productModel",
      key: "productModel",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            className="bg-[#001529]"
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
          <Button
            type="primary"
            className="bg-[#ff0205]"
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Handle table pagination and sorting
  const onChange: TableProps<DataType>["onChange"] = (pagination) => {
    setCurrentPage(pagination.current || 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  // Ensure data is properly extracted
  const productsAndPaginationObject: DataType[] = data?.data || [];
  const productsAndPaginationArray = Object.values(productsAndPaginationObject);
  const pagination = productsAndPaginationArray.pop();

  return (
    <div className="my-4">
      <Table<DataType>
        columns={columns}
        dataSource={productsAndPaginationArray}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={{
          current: currentPage,
          pageSize: pagination?.limit,
          total: pagination?.total,
        }}
        rowKey="_id"
      />
    </div>
  );
};

export default AdminProducts;
