import { Form, Input, Button, message } from "antd";
import { useUpdatePasswordMutation } from "../../redux/endpoints/users.endpoints";
import { ThreeDot } from "react-loading-indicators";

const UpdatePassword = () => {
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  const onFinish = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    console.log("Received values: ", values);
    try {
      const data = await updatePassword(values);
      console.log(data);
      if (data.data.success) {
        message.success("Password updated successfully");
      } else {
        message.error("Failed to update password");
      }
    } catch (error) {
      message.error("Failed to update password");
    }
  };

  if (isUpdatingPassword) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Update Password</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[
            { required: true, message: "Please enter your old password" },
          ]}
        >
          <Input.Password placeholder="Enter old password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please enter your new password" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePassword;
