import React from "react";
import "./PageStyles.css";
export default function Page() {
  return (
    <div className="page-container">
      <h2 className="page-header">Page Title</h2>
      <div className="page-graphic">
        <img src="/* page-image.jpg */" alt="Service Description" />
      </div>
      <div className="page-content">
        <p>
          Welcome to our informational section! Insert your core mission or data here...
        </p>
        <p>
          Feel free to add graphs, charts, or testimonials to enhance trust and engagement.
        </p>
      </div>
    </div>
  );
}
