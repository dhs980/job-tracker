import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";

function NotLoggedIn({ children }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  return token ? children : null;
}
export default NotLoggedIn;
