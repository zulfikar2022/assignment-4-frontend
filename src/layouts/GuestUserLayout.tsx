import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";

const GuestUserLayout = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default GuestUserLayout;
