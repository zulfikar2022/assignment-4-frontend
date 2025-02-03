import { Collapse, CollapseProps } from "antd";
import UpdatePassword from "../components/updatePassword/UpdatePassword";

const items: CollapseProps["items"] = [
  {
    key: "My Self",
    label: "My Self",
    children: <p>My Self</p>,
  },
  {
    key: "Update Password",
    label: "Update Password",
    children: <UpdatePassword />,
  },
];

const AboutMe = () => {
  return <Collapse items={items} />;
};

export default AboutMe;
