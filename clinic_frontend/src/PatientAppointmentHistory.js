// 📁 frontend/components/PatientAppointmentHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PatientAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://appointment-booking-system-for-clinic.onrender.com/api/appointments/patient", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch appointments:", err);
      toast.error("Failed to load appointment history.");
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm("❌ Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://appointment-booking-system-for-clinic.onrender.com/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("❌ Appointment cancelled");
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      toast.error("Failed to cancel appointment");
      console.error("Cancel error:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>📋 My Appointment History</h2>
      <br />
      {appointments.length === 0 ? (
        <p style={{ textAlign: "center" }}>No appointments yet.</p>
      ) : (
        <div style={gridStyle}>
          {appointments.map((appt, idx) => (
            <div key={idx} style={cardStyle}>
              <h3>Dr. {appt.doctor?.name}</h3>
              <img
                src={appt.doctor?.doctorImage}
                alt="doctor"
                style={{ width: "100%", borderRadius: "10px", height: "200px", objectFit: "cover" }}
              />
              <p><strong>Email:</strong> {appt.doctor?.email}</p>
              <p><strong>Specialization:</strong> {appt.doctor?.specialization}</p>
              <p>📅 <strong>Date:</strong> {appt.date}</p>
              <p>⏰ <strong>Time:</strong> {appt.time}</p>
              <p>📌 <strong>Status:</strong> {appt.status || "Booked"}</p>
              {appt.notes && <p>📝 <strong>Notes:</strong> {appt.notes}</p>}
              <button
                onClick={() => handleCancel(appt._id)}
                style={cancelButtonStyle}
              >
                ❌ Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "1000px",
  margin: "30px auto",
  padding: "20px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#f9f9f9",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const cancelButtonStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default PatientAppointmentHistory;
