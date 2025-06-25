import React, { useState } from "react";
import axios from "axios";

const DoctorRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    image: null,
  });

  const [availableSlots, setAvailableSlots] = useState([{ date: "", time: "" }]);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...availableSlots];
    updatedSlots[index][field] = value;
    setAvailableSlots(updatedSlots);
  };

  const handleAddSlot = () => {
    setAvailableSlots([...availableSlots, { date: "", time: "" }]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ Prevent double submissions

    try {
      // Upload doctor image to backend (Cloudinary)
      const imageData = new FormData();
      imageData.append("image", formData.image);

      const imageUploadRes = await axios.post(
        "http://localhost:5050/api/upload/doctor-image",
        imageData
      );

      const imageUrl = imageUploadRes.data.imageUrl;

      // Register doctor with backend
      const registerRes = await axios.post("http://localhost:5050/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "doctor",
        specialization: formData.specialization,
        availableSlots,
        doctorImage: imageUrl,
      });

      console.log("✅ Registration response:", registerRes.data);
      alert("Doctor registered successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        specialization: "",
        image: null,
      });
      setAvailableSlots([{ date: "", time: "" }]);
      setPreview(null);
    } catch (error) {
      console.error("❌ Registration error:", error?.response?.data || error.message);
      alert("Registration failed. See console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#f9f9f9",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🩺 Doctor Registration</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="text"
        name="specialization"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
        style={{ ...inputStyle, padding: "10px", background: "#fff" }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{
            width: "150px",
            margin: "10px auto",
            display: "block",
            borderRadius: "8px",
          }}
        />
      )}

      <h4 style={{ marginTop: "20px" }}>Available Slots:</h4>
      {availableSlots.map((slot, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="date"
            value={slot.date}
            onChange={(e) => handleSlotChange(index, "date", e.target.value)}
            required
            style={slotInputStyle}
          />
          <input
            type="time"
            value={slot.time}
            onChange={(e) => handleSlotChange(index, "time", e.target.value)}
            required
            style={slotInputStyle}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddSlot}
        style={{ ...buttonStyle, backgroundColor: "#6c63ff" }}
      >
        ➕ Add Slot
      </button>

      <button type="submit" style={{ ...buttonStyle, marginTop: "15px" }}>
        ✅ Register Doctor
      </button>
    </form>
  );
};

// Common input styles
const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
  backgroundColor: "#fff",
};

const slotInputStyle = {
  flex: "1",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
};

export default DoctorRegisterForm;
