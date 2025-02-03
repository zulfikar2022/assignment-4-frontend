import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";

const CustomerUserLayout = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default CustomerUserLayout;
