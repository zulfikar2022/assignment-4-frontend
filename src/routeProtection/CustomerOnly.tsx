import { jwtDecode } from "jwt-decode";
import { ReactComponent } from "./AdminOnly";
import NotFound from "./NotFound";

const CustomerOnly = ({ children }: ReactComponent) => {
  const bikes_token: string | null = localStorage.getItem("bikes_token");
  if (bikes_token) {
    const { role }: { role: string } = jwtDecode(bikes_token);

    if (role === "customer") {
      return <div>{children}</div>;
    }
  }
  return <NotFound />;
};

export default CustomerOnly;
