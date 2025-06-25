import React from "react";
import "./PageStyles.css";

export default function About() {
  return (
    <div className="page-container">
      <h2 className="page-header">About Us</h2>
      {/* <div className="page-graphic"> */}
        {/* <img src="your-about-image.jpg" alt="About MyClinic" /> */}
      {/* </div> */}
      <div className="page-content">
        <p>
          Welcome to <strong>MyClinic</strong>, your trusted partner in hassle-free healthcare access. 
          We are a modern, user-friendly <em>appointment booking system</em> built to bridge the gap 
          between patients and doctors — making your medical journey smoother, quicker, and more convenient.
        </p>

        <p>
          <strong>Our Mission:</strong><br />
          To simplify healthcare access by providing a secure and intuitive platform for booking doctor 
          appointments anytime, anywhere.
        </p>

        <p>
          <strong>For Patients:</strong><br />
          - Instantly browse and book appointments with <em>verified doctors</em><br />
          - Filter by specialization to find the right doctor for your needs<br />
          - Enjoy a simple and intuitive booking experience<br />
          - Maintain a secure record of your bookings
        </p>

        <p>
          <strong>For Clinics and Doctors:</strong><br />
          - Easy-to-use Doctor Registration and Schedule Management<br />
          - View and manage appointment lists in real-time<br />
          - Stay organized with a clear and updated appointment list<br />
          - Improve clinic efficiency with digital workflows
        </p>

        <p>
          <strong>Secure & User-Friendly:</strong><br />
          We prioritize <em>data privacy</em> and <em>ease of use</em>. Whether you're a first-time user or 
          a regular visitor, MyClinic ensures a smooth experience — from login to confirmation.
        </p>

        <p>
          <strong>Our Vision:</strong><br />
          We envision a connected healthcare system where <em>technology empowers care</em>. MyClinic is more than a 
          booking tool; it's a step toward smarter, more accessible healthcare for everyone.
        </p>

        <p>
          <strong>✨ Join thousands who trust MyClinic to take control of their healthcare journey. Because at 
          MyClinic, your health is just a click away.</strong>
        </p>
      </div>
    </div>
  );
}
