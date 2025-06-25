import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorList = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [newSlots, setNewSlots] = useState({});
  const [editSlot, setEditSlot] = useState({}); // { doctorId, slotIndex, date, time }

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("https://appointment-booking-system-for-clinic.onrender.com/api/doctors");
      setAllDoctors(res.data);
      setDoctors(res.data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`https://appointment-booking-system-for-clinic.onrender.com/api/doctors/${id}`);
        fetchDoctors();
      } catch (err) {
        console.error("Failed to delete doctor:", err);
        alert("Error deleting doctor");
      }
    }
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setSpecializationFilter(selected);
    if (selected === "") {
      setDoctors(allDoctors);
    } else {
      const filtered = allDoctors.filter((doc) => doc.specialization === selected);
      setDoctors(filtered);
    }
  };

  const getUniqueSpecializations = () => {
    const specs = allDoctors.map((doc) => doc.specialization);
    return Array.from(new Set(specs));
  };

  const handleSlotInput = (doctorId, field, value) => {
    setNewSlots((prev) => ({
      ...prev,
      [doctorId]: {
        ...prev[doctorId],
        [field]: value,
      },
    }));
  };

  const handleAddSlot = async (doctorId) => {
    const { date, time } = newSlots[doctorId] || {};
    if (!date || !time) return alert("Please enter both date and time");

    try {
      await axios.put(`https://appointment-booking-system-for-clinic.onrender.com/api/doctors/${doctorId}/add-slot`, {
        date,
        time,
      });
      setNewSlots((prev) => ({ ...prev, [doctorId]: { date: "", time: "" } }));
      fetchDoctors();
    } catch (err) {
      console.error("Failed to add slot:", err);
    }
  };

  const handleDeleteSlot = async (doctorId, slotIndex) => {
    try {
      await axios.put(`https://appointment-booking-system-for-clinic.onrender.com/api/doctors/${doctorId}/delete-slot`, {
        slotIndex,
      });
      fetchDoctors();
    } catch (err) {
      console.error("Failed to delete slot:", err);
    }
  };

  const handleEditSlot = async (doctorId, index) => {
    const slot = doctors.find((doc) => doc._id === doctorId)?.availableSlots[index];
    if (!slot) return;
    setEditSlot({ doctorId, slotIndex: index, date: slot.date, time: slot.time });
  };

  const handleUpdateSlot = async () => {
    const { doctorId, slotIndex, date, time } = editSlot;
    try {
      await axios.put(`https://appointment-booking-system-for-clinic.onrender.com/api/doctors/${doctorId}/update-slot`, {
        slotIndex,
        date,
        time,
      });
      setEditSlot({});
      fetchDoctors();
    } catch (err) {
      console.error("Failed to update slot:", err);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🧾 Available Doctors</h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <select value={specializationFilter} onChange={handleFilterChange}>
          <option value="">All Specializations</option>
          {getUniqueSpecializations().map((spec, idx) => (
            <option key={idx} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {doctors.length === 0 ? (
        <p style={{ textAlign: "center" }}>No doctors found.</p>
      ) : (
        <div style={gridStyle}>
          {doctors.map((doc, index) => (
            <div key={index} style={cardStyle}>
              <img
                src={doc.doctorImage}
                alt={doc.name}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <h3>{doc.name}</h3>
              <p><strong>Email:</strong> {doc.email}</p>
              <p><strong>Specialization:</strong> {doc.specialization}</p>

              <p><strong>Slots:</strong></p>
              <ul>
                {doc.availableSlots.map((slot, i) => (
                  <li key={i}>
                    📅 {slot.date} ⏰ {slot.time}
                    <br />
                    <button onClick={() => handleEditSlot(doc._id, i)}>✏️ Edit</button>{" "}
                    <button onClick={() => handleDeleteSlot(doc._id, i)}>❌ Delete</button>
                  </li>
                ))}
              </ul>

              {/* Add Slot */}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="date"
                  value={newSlots[doc._id]?.date || ""}
                  onChange={(e) => handleSlotInput(doc._id, "date", e.target.value)}
                  style={{ marginRight: "8px" }}
                />
                <input
                  type="time"
                  value={newSlots[doc._id]?.time || ""}
                  onChange={(e) => handleSlotInput(doc._id, "time", e.target.value)}
                  style={{ marginRight: "8px" }}
                />
                <button onClick={() => handleAddSlot(doc._id)}>➕ Add Slot</button>
              </div>

              {/* Update Slot */}
              {editSlot.doctorId === doc._id && (
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="date"
                    value={editSlot.date}
                    onChange={(e) => setEditSlot((prev) => ({ ...prev, date: e.target.value }))}
                    style={{ marginRight: "8px" }}
                  />
                  <input
                    type="time"
                    value={editSlot.time}
                    onChange={(e) => setEditSlot((prev) => ({ ...prev, time: e.target.value }))}
                    style={{ marginRight: "8px" }}
                  />
                  <button onClick={handleUpdateSlot}>✅ Save</button>
                </div>
              )}

              <button onClick={() => handleDelete(doc._id)} style={deleteButtonStyle}>
                🗑️ Delete Doctor
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
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const deleteButtonStyle = {
  marginTop: "10px",
  padding: "8px 12px",
  backgroundColor: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default DoctorList;
