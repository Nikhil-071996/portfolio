// src/components/ContactForm.jsx
import React, { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [token, setToken] = useState("");
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10); // only digits, max 10
    }

    if (name === "message") {
      const words = value.trim().split(/\s+/);
      if (words.length > 250) {
        value = words.slice(0, 250).join(" ");
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    
    if (!formData.email.trim()) newErrors.email = "Required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) newErrors.phone = "Required";
    else if (!/^[0-9]{10}$/.test(formData.phone.trim()))
      newErrors.phone = "Phone number must be 10 digits";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      toast.error("Please complete the captcha first!");
      return;
    }

    try {
      const submitPromise = axios.post(`${import.meta.env.VITE_BASE_URL}send-mail/create`, {
        ...formData,
        token
      });

      toast.promise(submitPromise, {
        pending: "Sending message...",
        success: {
          render({ data }) {
            if (data?.data?.msg) {
              setFormData({ name: "", email: "", phone: "", message: "" });
              setToken("");
              return data.data.msg;
            }
            return "Message sent successfully!";
          }
        },
        error: {
          render({ data }) {
            return data?.response?.data?.msg || "Failed to send message.";
          }
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className="contact-form" autoComplete="off">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          maxLength="10"
          required
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        />

        <div className="captcha-container">
          <Turnstile
            siteKey={`${turnstileSiteKey}`}
            onSuccess={(token) => setToken(token)}
            onError={() => setToken("")}
          />
        </div>
        <button type="submit" className="submit-btn" disabled={!token}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
