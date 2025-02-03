import { Menu, MenuProps } from "antd";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { adminNavItems } from "../../navbarItems/adminNavItems";
import { customerNavItems } from "../../navbarItems/customerNavbar";
import Swal from "sweetalert2";

type MenuItem = Required<MenuProps>["items"][number];
interface DecodedToken {
  role: string;
}
const token = localStorage.getItem("bikes_token");

const items: MenuItem[] = [
  {
    label: "Home",
    key: "/",
  },
  {
    label: "Products",
    key: "/products",
  },
  {
    label: "About Us",
    key: "/about-us",
  },
  {
    label: "Login",
    key: "/login",
  },
  {
    label: "Register",
    key: "/register",
  },
];
if (token) {
  const decodedToken: DecodedToken = jwtDecode(token);
  if (decodedToken) {
    if (decodedToken.role === "admin" || decodedToken.role === "customer") {
      items.splice(-2);
    }
  }
}

if (token) {
  const decodedToken: DecodedToken = jwtDecode(token);
  if (decodedToken.role === "admin") {
    items.push(...adminNavItems);
  } else if (decodedToken.role === "customer") {
    items.push(...customerNavItems);
  }
}

const NavBar = () => {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.startsWith("/products/")) {
      setCurrent("/products");
    } else if (location.pathname.startsWith("/update-product/")) {
      setCurrent("admin-actions");
    } else if (location.pathname.startsWith("/users")) {
      setCurrent("/users");
    } else if (location.pathname.startsWith("/checkout/")) {
      setCurrent("/customer-dashboard");
    } else if (location.pathname.startsWith("/orders/")) {
      setCurrent("/orders");
    } else {
      setCurrent(location.pathname);
    }
  }, [location.pathname]);

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      Swal.fire({
        title: "Are you sure to Logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#001529",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
          localStorage.removeItem("bikes_token");
          window.location.reload();
          Swal.fire({
            title: "Logged Out!",
            text: "You are logged Out Now!",
            icon: "success",
          });
        }
      });
    } else {
      setCurrent(e.key);
      navigate(e.key);
    }
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
      items={items}
      className="custom-nav-menu mt-0 lg:mt-3 sticky top-1 z-50 sm:mx-3"
      style={{ borderRadius: "5px" }}
    />
  );
};

export default NavBar;
