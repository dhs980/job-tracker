import { useSearchParams, useNavigate } from "react-router";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function OauthSuccess() {
  const { setToken } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    setToken(token);
    navigate("/app", { replace: true });
  }, [searchParams, setToken, navigate]);
  return <div></div>;
}

export default OauthSuccess;
