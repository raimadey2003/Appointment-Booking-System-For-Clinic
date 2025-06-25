import React from "react";
import "./PageStyles.css";

export default function Contact() {
  return (
    <div className="page-container">
      <h2 className="page-header">📬 Contact Us – MyClinic</h2>

      {/* <div className="page-graphic">
        <img src="contact-map.jpg" alt="Contact MyClinic" />
      </div> */}

      <div className="page-content">
        <p>
          We’re here to help you with your healthcare needs, technical questions, or feedback. Whether
          you’re a patient looking to book an appointment or a clinic representative needing assistance,
          feel free to reach out.
        </p>

        <h3>📞 Emergency Contact</h3>
        <p>
          <strong>Phone:</strong> 123-456-7890<br />
          Our emergency line is available <strong>24/7</strong>. For urgent medical inquiries, please call us immediately.
        </p>

        <h3>📧 Email Support</h3>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:contact@myclinic.com">contact@myclinic.com</a><br />
          Send us your questions, suggestions, or concerns. We typically respond within <strong>24 hours</strong> during working days.
        </p>

        <h3>🕒 Support Hours</h3>
        <p>
          <strong>Monday – Saturday:</strong> 9:00 AM – 6:00 PM<br />
          <strong>Sunday:</strong> Closed
        </p>

        <h3>🗺️ Visit Us</h3>
        <p>
          <strong>Address:</strong><br />
          MyClinic Health Center,<br />
          123 Wellness Avenue,<br />
          New Delhi, India
        </p>

        <h3>💬 Feedback & Queries</h3>
        <p>
          Have suggestions to improve our system? Facing any issues while booking an appointment?<br />
          <strong>Please email us directly — we value your input.</strong>
        </p>
      </div>
    </div>
  );
}
