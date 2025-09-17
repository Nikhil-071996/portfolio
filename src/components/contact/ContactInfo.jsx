import React from "react";

const ContactInfo = () => {
  return (
    <div className="contact-info-container">
      <h3>Get in Touch</h3>
      <p>your.email@example.com</p>
      <p>+91 9876543210</p>
      <div className="social-icons">
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
      <a href="/path-to-your-cv.pdf" download className="download-cv-btn">
        Download CV
      </a>
    </div>
  );
};

export default ContactInfo;
