// ---- src/pages/Home.js ----
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import "./Home.css";
import heroImage from "./assets/clinic-hero.jpg"; // ✅ updated import

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="home">
      <header className="top-banner">
        <div className="clinic-brand">
          <span className="my">My</span><span className="clinic">Clinic</span> 🩺
        </div>
        <div className="emergency-info">
          📞 Emergency: 123-456-7890 | ✉️ contact@myclinic.com
        </div>
        <div className="auth-buttons">
          <Link to="/patient-auth" className="btn">Login/Register</Link>
          <Link to="/dashboard" className="btn admin-btn">Admin Sign-up</Link>
        </div>
      </header>

      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/service">Service</Link>
        {/* <Link to="/page">Page</Link> */}
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/view-doctors" className="find-doctor-btn">Find a Doctor</Link>
      </nav>

      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         
          
        }}
      >
        <div className="hero-content">
          <br/>
          
          <h1 className="hero-title">Book Your Doctor Appointment Easily & Quickly!</h1>
          <p className="hero-subtitle">Find top-rated doctors and schedule your appointment with just a few clicks.</p>
          <div className="hero-buttons">
            <Link to={user ? "/patient" : "/patient-auth"} className="hero-btn">Book an Appointment</Link>
            <Link to="/view-doctors" className="hero-btn outline">Find a Doctor</Link>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content"> <center> © 2025 MyClinic Healthcare Systems. All rights reserved.</center></div>
        </footer>
    </div>
  );
};

export default Home;