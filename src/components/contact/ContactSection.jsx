import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import "./ContactSection.css";

const ContactSection = () => {
  return (
    <section className="contact-section">
        <h2>Contact Me</h2>
      <div className="contact-container">

        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;
