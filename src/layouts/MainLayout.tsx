import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CustomerUserLayout from "./CustomerUserLayout";
import AdminUserLayout from "./AdminUserLayout";
import NavBar from "../components/navbar/NavBar";

const MainLayout = () => {
  const bikes_token: string | null = localStorage.getItem("bikes_token");

  if (bikes_token) {
    const { role }: { role: string } = jwtDecode(bikes_token);

    if (role === "customer") {
      return <CustomerUserLayout />;
    } else if (role === "admin") {
      return <AdminUserLayout />;
    }
  }
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="mt-5">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
