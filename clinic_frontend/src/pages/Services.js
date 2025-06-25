import React from "react";
import "./PageStyles.css";
export default function Services() {
  const services = [
    { icon: "🩺", title: "General Consultation", desc: "Comprehensive health check-ups" },
    { icon: "🌡️", title: "24/7 Emergency", desc: "Always ready in critical times" },
    { icon: "🧬", title: "Specialist Care", desc: "Best-in-class specialized treatments" },
    { icon: "💉", title: "Lab Testing", desc: "On-site diagnostics and results" },
  ];
  return (
    <div className="page-container">
      <h2 className="page-header">Our Services</h2>
      <div className="page-cards">
        {services.map((s, i) => (
          <div key={i} className="page-card">
            <div style={{ fontSize: "2rem" }}>{s.icon}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
