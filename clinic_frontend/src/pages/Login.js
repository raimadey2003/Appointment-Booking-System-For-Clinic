import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../authContext";
import "./login.css"; // 💡 Add a new CSS file for styles

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://appointment-booking-system-for-clinic.onrender.com/api/auth/admin-login", {
        email,
        password,
      });
      login(res.data);
    } catch (err) {
      setError("Login failed. Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🔐 Admin Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="📧 Email"
          required
        />
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒 Password"
          required
        />
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
