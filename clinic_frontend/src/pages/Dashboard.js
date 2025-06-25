// ---- src/pages/Dashboard.js ----
import React, { useState } from "react";
import { useAuth } from "../authContext";
import DoctorRegisterForm from "../DoctorRegisterForm";
import DoctorList from "../DoctorList";
import AdminAppointmentHistory from "../AdminAppointmentHistory";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [view, setView] = useState("doctors"); // 'doctors' or 'history'
  const [isHovered, setIsHovered] = useState(false);

  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  return (
    <div style={wrapperStyle}>
      {/* Toggle Button Top Left */}
      <div style={toggleBarStyle}>
        <button
          onClick={() => setView(view === "doctors" ? "history" : "doctors")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            ...toggleButtonStyle,
            ...(isHovered ? toggleButtonHoverStyle : {}),
          }}
        >
          {view === "doctors" ? "📋 View Appointments" : "🛠️ Back to Dashboard"}
        </button>
      </div>

      {/* Doctors View */}
      <div
        style={{
          ...fadeContainerStyle,
          opacity: view === "doctors" ? 1 : 0,
          pointerEvents: view === "doctors" ? "auto" : "none",
        }}
      >
        <h1 style={headingStyle}>🛠️ Admin Dashboard</h1>
        <p style={subtextStyle}>Manage doctors and appointments.</p>

        <section style={sectionStyle}>
          <h1 style={headingStyle}><center>➕ Register New Doctor</center></h1>
          <DoctorRegisterForm />
        </section>

        <section style={sectionStyle}>
          <h1 style={{ marginBottom: "10px" }}><center>🩺 Registered Doctors</center></h1>
          <DoctorList isAdmin={true} />
        </section>
      </div>

      {/* Appointment History View */}
      <div
        style={{
          ...fadeContainerStyle,
          opacity: view === "history" ? 1 : 0,
          pointerEvents: view === "history" ? "auto" : "none",
        }}
      >
        <h1 style={headingStyle}>📋 Appointment History</h1>
        <p style={subtextStyle}>View and manage all patient appointments.</p>
        <AdminAppointmentHistory />
      </div>
    </div>
  );
};

// 💅 Styles
const wrapperStyle = {
  padding: "20px",
  position: "relative",
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #1976d2 0%, #ffffff 60%)",
};

const toggleBarStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  zIndex: 10,
};

const toggleButtonStyle = {
  backgroundColor: "rgba(18, 41, 90, 0.85)",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
};

const toggleButtonHoverStyle = {
  backgroundColor: "#42a5f5",
  boxShadow: "0 0 15px 4px rgba(66, 165, 245, 0.6)",
  transform: "scale(1.05)",
};

const headingStyle = {
  textAlign: "center",
  margin: "60px 0 10px",
  color: "#333",
};

const subtextStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#666",
};

const sectionStyle = {
  marginBottom: "3S0px",
};

const fadeContainerStyle = {
  transition: "opacity 0.5s ease",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  padding: "80px 20px 20px",
};

export default Dashboard;
