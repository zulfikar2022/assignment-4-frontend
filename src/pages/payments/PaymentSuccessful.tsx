import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccessful() {
  const navigate = useNavigate();

  return (
    <div className="my-3">
      <div className="flex items-center justify-center h-screen rounded-lg bg-gray-100">
        <Card className="p-6 text-center shadow-xl rounded-2xl bg-white">
          <CheckCircleOutlined className="text-green-500 text-6xl" />
          <h1 className="text-2xl font-semibold mt-4">Payment Successful</h1>
          <p className="text-gray-600 mt-2">Thank you for your purchase!</p>
          <Button type="primary" className="mt-4" onClick={() => navigate("/")}>
            Go to Homepage
          </Button>
        </Card>
      </div>
    </div>
  );
}
