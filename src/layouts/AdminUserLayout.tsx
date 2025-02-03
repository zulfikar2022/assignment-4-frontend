import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";

const AdminUserLayout = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }} className="mt-5">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AdminUserLayout;
