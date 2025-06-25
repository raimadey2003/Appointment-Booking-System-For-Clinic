// src/pages/PatientView.js
import React, { useState } from "react";
import PatientDoctorList from "../PatientDoctorList";
import PatientAppointments from "../PatientAppointmentHistory";

const PatientView = () => {
  const [view, setView] = useState("doctors"); // 'doctors' or 'history'
  const [isHovered, setIsHovered] = useState(false); // Track hover state

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
          {view === "doctors" ? "📋 Appointment History" : "🩺 Back to Doctors"}
        </button>
      </div>

      {/* Animated Doctor Section */}
      <div
        style={{
          ...fadeContainerStyle,
          opacity: view === "doctors" ? 1 : 0,
          pointerEvents: view === "doctors" ? "auto" : "none",
        }}
      >
        <h1 style={headingStyle}>👤 Patient Portal</h1>
        <p style={subtextStyle}>Browse and book appointments with doctors.</p>
        <PatientDoctorList isAdmin={false} />
      </div>

      {/* Animated History Section */}
      <div
        style={{
          ...fadeContainerStyle,
          opacity: view === "history" ? 1 : 0,
          pointerEvents: view === "history" ? "auto" : "none",
        }}
      >
        <h1 style={headingStyle}>📋 Appointment History</h1>
        <p style={subtextStyle}>Here are all your past and upcoming appointments.</p>
        <PatientAppointments />
      </div>
    </div>
  );
};

// 💅 Styles
const wrapperStyle = {
  padding: "20px",
  position: "relative",
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #1976d2 0%, #ffffff 60%)", // Blue top → white bottom
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

const fadeContainerStyle = {
  transition: "opacity 0.5s ease",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  padding: "80px 20px 20px",
};

export default PatientView;
