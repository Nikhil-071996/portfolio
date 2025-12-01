import React from "react";
import email from '../../assets/img/icons/mail.png'
import phone from '../../assets/img/icons/telephone.png'
import gitHub from '../../assets/img/icons/github.png'
import linkedIn from '../../assets/img/icons/linkedin.png'

const ContactInfo = () => {
  return (
    <div className="contact-info-container">
      <div className="my-info">
        <div className="my-contact">
          <a href="mailto:nikhilkachi68@gmail.com" className="info-content">
            <img src={email} alt="email" />
            <p>nikhilkachi68@gmail.com</p>
          </a>
          <a href="tel:918805084119" className="info-content">
            <img src={phone} alt="call" />
            <p >+91 88050 84119</p>
          </a>
        </div>
        <a href="/cv.pdf" download className="download-cv-btn">
          Download CV
        </a>

      </div>

      <div className="social-icons">
        <a href="https://github.com/Nikhil-071996" className="github-icon" target="_blank" rel="noreferrer">
          <img src={gitHub} alt="github" />
        </a>
        <a href="https://www.linkedin.com/in/nikhil-kachi" target="_blank" rel="noreferrer">
          <img src={linkedIn} alt="linkedIn" />
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
