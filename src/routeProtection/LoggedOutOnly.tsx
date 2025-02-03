import { jwtDecode } from "jwt-decode";
import { ReactComponent } from "./AdminOnly";
import { useNavigate } from "react-router-dom";

const LoggedOutOnly = ({ children }: ReactComponent) => {
  const navigate = useNavigate();
  const bikes_token: string | null = localStorage.getItem("bikes_token");
  if (!bikes_token || !jwtDecode(bikes_token)) {
    return <div>{children}</div>;
  }
  navigate("/");
};

export default LoggedOutOnly;
