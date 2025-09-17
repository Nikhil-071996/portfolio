import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import "./ContactSection.css";

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
};

export default ContactSection;
