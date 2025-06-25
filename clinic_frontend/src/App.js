// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Service from "./pages/Services";
import Page from "./pages/Page";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DoctorRegisterForm from "./DoctorRegisterForm";
import DoctorList from "./DoctorList";
import ViewDoctorList from "./ViewDoctorList";
import PatientView from "./pages/PatientView";
import PatientAuth from "./pages/PatientAuth";

import PatientAppointmentHistory from "./PatientAppointmentHistory";


import { ToastContainer } from "react-toastify"; // ✅ Add this
import "react-toastify/dist/ReactToastify.css";   // ✅ And this

import { AuthProvider, useAuth } from "./authContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  return user?.role === role ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/register"
            element={
              <ProtectedRoute role="admin">
                <DoctorRegisterForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute role="admin">
                <DoctorList isAdmin={true} />
              </ProtectedRoute>
            }
          />
          <Route path="/patient" element={<PatientView />} />
          <Route path="/patient-auth" element={<PatientAuth />} />

          <Route path="/patient/history" element={
              <ProtectedRoute role="patient">
              <PatientAppointmentHistory />
              </ProtectedRoute>
          }
/>

          <Route path="/view-doctors" element={<ViewDoctorList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/service" element={<Service />} />
          <Route path="/page" element={<Page />} />
        </Routes>

        {/* ✅ This makes toasts appear on any page */}
        <ToastContainer position="top-center" />
      </>
    </AuthProvider>
  );
}
