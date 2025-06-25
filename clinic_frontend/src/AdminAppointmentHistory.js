// 📁 frontend/AdminAppointmentHistory.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [dismissed, setDismissed] = useState({}); // to track dismissed cancelled messages

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5050/api/appointments/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch admin appointments:", err);
      toast.error("Failed to load appointment data.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5050/api/appointments/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("🗑️ Appointment deleted");
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete appointment:", err);
      toast.error("Error deleting appointment.");
    }
  };

  const dismissMessage = (id) => {
    setDismissed((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🗂️ All Appointments (Admin View)</h2>

      {appointments.length === 0 ? (
        <p style={{ textAlign: "center" }}>No appointments found.</p>
      ) : (
        <div style={gridStyle}>
          {appointments.map((appt) => (
            <div key={appt._id} style={cardStyle}>
              <h3>🧑 Patient: {appt.patient?.name || "N/A"}</h3>
              <p><strong>👨‍⚕️ Doctor:</strong> {appt.doctor?.name || "N/A"}</p>
              <p>📅 <strong>Date:</strong> {appt.date}</p>
              <p>⏰ <strong>Time:</strong> {appt.time}</p>
              <p>
                📌 <strong>Status:</strong>{" "}
                <span style={{ color: appt.status === "Cancelled by Patient" ? "red" : "green" }}>
                  {appt.status}
                </span>
              </p>

              {/* Optional cancel message */}
              {appt.status === "Cancelled by Patient" && !dismissed[appt._id] && (
                <div style={cancelledBoxStyle}>
                  ⚠️ This patient cancelled the booking for this date and time.
                  <button onClick={() => dismissMessage(appt._id)} style={crossButtonStyle}>✖</button>
                </div>
              )}

              <button onClick={() => handleDelete(appt._id)} style={deleteButtonStyle}>
                🗑️ Delete Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 💅 Styles
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
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const cancelledBoxStyle = {
  backgroundColor: "#ffe0e0",
  padding: "10px",
  borderRadius: "6px",
  color: "#b20000",
  margin: "10px 0",
  position: "relative",
};

const crossButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "8px",
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  color: "#b20000",
  cursor: "pointer",
};

const deleteButtonStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#d32f2f",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default AdminAppointmentHistory;
