// 📁 frontend/components/PatientDoctorList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientDoctorList = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [specializationFilter, setSpecializationFilter] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/doctors");
        setAllDoctors(res.data);
        setDoctors(res.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        toast.error("❌ Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, []);

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

  const handleBook = async (doctorId, date, time, doctorName) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("⚠️ Please login first!");
      return;
    }

    const confirmBooking = window.confirm(
      `Book appointment with ${doctorName} on ${date} at ${time}?`
    );
    if (!confirmBooking) return;

    try {
      await axios.post(
        "http://localhost:5050/api/appointments",
        {
          doctor: doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Appointment booked successfully!");
    } catch (err) {
      console.error("❌ Booking failed:", err.response?.data || err);
      toast.error(err.response?.data?.error || "❌ Booking failed.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🩺 Available Doctors
      </h1>

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
                  <li key={i} style={{ marginBottom: "10px" }}>
                    📅 {slot.date} ⏰ {slot.time}
                    <button
                      style={bookBtnStyle}
                      onClick={() =>
                        handleBook(doc._id, slot.date, slot.time, doc.name)
                      }
                    >
                      Book
                    </button>
                  </li>
                ))}
              </ul>
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

const bookBtnStyle = {
  marginLeft: "10px",
  padding: "5px 10px",
  fontSize: "12px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "rgb(11, 63, 234)",
  color: "white",
  cursor: "pointer",
};

export default PatientDoctorList;
