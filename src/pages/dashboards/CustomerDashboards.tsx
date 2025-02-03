import { useState } from "react";
import { Card } from "antd";
import MyOrders from "../customerPages/MyOrders";
import AboutMe from "../AboutMe";

const tabListNoTitle = [
  {
    key: "aboutMe",
    label: "About Me",
  },
  {
    key: "myOrders",
    label: "My Orders",
  },
];

const CustomerDashboards = () => {
  const [activeTabKey2, setActiveTabKey2] = useState<string>("aboutMe");
  const contentListNoTitle: Record<string, React.ReactNode> = {
    aboutMe: <AboutMe />,
    myOrders: <MyOrders />,
  };

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
    console.log("onTAB2Change", key);
  };

  return (
    <div className="mx-4 my-4">
      <br />
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </div>
  );
};

export default CustomerDashboards;
