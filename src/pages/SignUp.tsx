import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRegisterUserMutation } from "../redux/endpoints/users.endpoints";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThreeDot } from "react-loading-indicators";

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.password !== values.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        confirmButtonColor: "#001529",
      });
      return;
    }

    try {
      await registerUser({
        name: values.name!,
        email: values.email!,
        password: values.password!,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Registration successful!",
        confirmButtonColor: "#001529",
      });

      navigate("/login");
    } catch (err) {
      const error = err as { data?: { error?: { message?: string } } };
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data?.error?.message || "Something went wrong!",
        confirmButtonColor: "#001529",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="my-4 flex justify-center items-center">
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        className="w-1/2"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            className="w-1/2 lg:w-full bg-[#001529]"
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
          <p className="my-2">
            Already have an account?{" "}
            <Link to="/login" className="text[#001529] font-bold">
              Login
            </Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
