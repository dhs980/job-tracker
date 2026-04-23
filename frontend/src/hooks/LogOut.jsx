import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const useLogOut = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const LogOut = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };
  return LogOut;
};
