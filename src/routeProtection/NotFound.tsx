import React from "react";
import { Button } from "antd";

const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button
          type="primary"
          size="large"
          className="mt-6"
          onClick={() => (window.location.href = "/")}
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
