// ---- src/authContext.js ----
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // const login = (userData) => {
  //   setUser(userData);
  //   localStorage.setItem("user", JSON.stringify(userData));
  //   navigate("/dashboard");
  // };


  const login = (userData) => {
  setUser(userData.user); // Save user info in state
  localStorage.setItem("user", JSON.stringify(userData.user));
  localStorage.setItem("token", userData.token); // ✅ Save the JWT token
  navigate("/dashboard");
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
