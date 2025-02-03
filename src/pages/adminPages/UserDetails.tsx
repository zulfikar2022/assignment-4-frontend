import { useParams } from "react-router-dom";
import {
  useChangeCustomerStatusMutation,
  useGetSpecificCustomerQuery,
} from "../../redux/endpoints/users.endpoints";
import { ThreeDot } from "react-loading-indicators";
import NotFound from "../../routeProtection/NotFound";
import { Card, Tag } from "antd";
import { format } from "date-fns";
import Swal from "sweetalert2";

const UserDetails = () => {
  const { userId }: { userId: string } = useParams();
  const [updateCustomerStatus, { isLoading: isLoadingWhileUpdating }] =
    useChangeCustomerStatusMutation();

  const { data, isLoading, isFetching, isError } =
    useGetSpecificCustomerQuery(userId);

  if (isLoading || isFetching || isLoadingWhileUpdating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }
  if (isError) {
    return <NotFound />;
  }
  const user = data?.data;
  const handleChangeStatus = (customerId: string) => {
    Swal.fire({
      title: "Are you sure change this users status?",
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
            text: "User Status Changed successfully.",
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

  return (
    <div className="flex  justify-center my-3">
      <Card
        className="p-2 max-w-xs  rounded-lg shadow-lg bg-white"
        title={user.name}
        extra={
          <Tag
            color={user.isDeactivated ? "red" : "green"}
            className="font-semibold"
          >
            {user.isDeactivated ? "Deactivated" : "Active"}
          </Tag>
        }
      >
        <div className="text-sm text-gray-700">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> <Tag color="blue">{user.role}</Tag>
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {format(new Date(user.createdAt), "MMM dd, yyyy hh:mm a")}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {format(new Date(user.updatedAt), "MMM dd, yyyy hh:mm a")}
          </p>
        </div>
        <button
          onClick={() => handleChangeStatus(user._id)}
          className="mt-2 bg-[#001529] rounded-md text-white px-2 py-1"
        >
          Change Status
        </button>
      </Card>
    </div>
  );
};

export default UserDetails;
