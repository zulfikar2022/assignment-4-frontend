import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useLoginUserMutation } from "../redux/endpoints/users.endpoints";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThreeDot } from "react-loading-indicators";
import { useState } from "react";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [activeUserType, setActiveUserType] = useState<
    "admin" | "customer" | null
  >(null);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const { data: userData, success } = await loginUser({
        email: values.email!,
        password: values.password!,
      }).unwrap();

      if (success) {
        const redirectTo = location.state?.from?.pathname || "/";
        localStorage.setItem("bikes_token", userData.token);
        navigate(redirectTo, { replace: true });
        window.location.reload();
      }
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

  const fillCredentials = (type: "admin" | "customer") => {
    setActiveUserType(type);
    const credentials =
      type === "admin"
        ? { email: "sayedzulfikar_admin@gmail.com", password: "password" }
        : { email: "zulfikar.2202004@std.hstu.ac.bd", password: "password" };
    form.setFieldsValue(credentials);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex mt-2 flex-col justify-center items-center">
        <p className="mb-2">Get credentials from here</p>
        <div className="flex justify-center items-center mx-10 gap-2">
          <Button
            id="admin"
            onClick={() => fillCredentials("admin")}
            className={
              activeUserType === "admin" ? "bg-[#001529] text-white" : ""
            }
          >
            Admin
          </Button>
          <Button
            id="customer"
            onClick={() => fillCredentials("customer")}
            className={
              activeUserType === "customer" ? "bg-[#001529] text-white" : ""
            }
          >
            Customer
          </Button>
        </div>
      </div>

      <div className="my-4 flex justify-center items-center">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="w-1/2"
        >
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

          <Form.Item label={null}>
            <Button
              className="w-1/2 lg:w-full bg-[#001529]"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
            <p className="my-2">
              First time here?{" "}
              <Link to="/register" className="text-[#001529] font-bold">
                Register
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
