import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const customerNavItems: MenuItem[] = [
  {
    label: "Dashboard",
    key: "/customer-dashboard",
  },
  {
    label: "Logout",
    key: "logout",
  },
];
