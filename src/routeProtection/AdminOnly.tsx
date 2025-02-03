import { jwtDecode } from "jwt-decode";
import React from "react";
import NotFound from "./NotFound";

export type ReactComponent = {
  children: React.ReactElement;
};

const AdminOnly = ({ children }: ReactComponent) => {
  const bikes_token: string | null = localStorage.getItem("bikes_token");
  if (bikes_token) {
    const { role }: { role: string } = jwtDecode(bikes_token);
    if (role === "admin") {
      return <div>{children}</div>;
    }
  }

  return <NotFound />;
};

export default AdminOnly;
