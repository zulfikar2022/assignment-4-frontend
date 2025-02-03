import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useLoginUserMutation } from "../redux/endpoints/users.endpoints";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThreeDot } from "react-loading-indicators";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const location = useLocation();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: userData, success } = await loginUser({
        email: values.email!,
        password: values.password!,
      }).unwrap();

      if (success) {
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo, { replace: true });
        localStorage.setItem("bikes_token", userData.token);
        window.location.reload();
      }
      if (error) {
        console.log("some error happen");
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
  // flex justify-center items-center w-full md:w-1/2 lg:w-1/3
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#001529" size="medium" text="" textColor="" />
      </div>
    );
  }
  return (
    <div className="my-4  flex justify-center items-center">
      <Form
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
            className="w-1/2  lg:w-full bg-[#001529]"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
          <p className="my-2">
            First time here?{" "}
            <Link to="/register" className="text[#001529] font-bold">
              Register
            </Link>{" "}
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
