import { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import "../components/navbar/NavBar.css";
type MenuItem = Required<MenuProps>["items"][number];

export const adminNavItems: MenuItem[] = [
  {
    label: "Dashboard",
    key: "/admin-dashboard",
  },
  {
    label: (
      <span style={{ color: "white" }}>
        Products Management <DownOutlined />
      </span>
    ),
    key: "admin-actions",
    children: [
      {
        label: "Add Product",
        key: "/create-product",
      },
      {
        label: "See All Products",
        key: "/admin-products",
      },
    ],
  },
  {
    label: (
      <span style={{ color: "white" }}>
        Customer Management <DownOutlined />
      </span>
    ),
    key: "user-management",
    children: [
      {
        label: "All Customers",
        key: "/users",
      },
    ],
  },
  {
    label: (
      <span style={{ color: "white" }}>
        Order Management <DownOutlined />
      </span>
    ),
    key: "order-management",
    children: [
      {
        label: "All Orders",
        key: "/orders",
      },
    ],
  },
  {
    label: <button className="">Logout</button>,
    key: "logout",
  },
];
