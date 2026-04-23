import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      return;
    }

    localStorage.removeItem("token");
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, setToken, loading, setLoading, error, setError }}
    >
      {children}
    </AuthContext.Provider>
  );
};
