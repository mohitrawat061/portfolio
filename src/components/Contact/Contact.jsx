// components/Contact/Contact.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 2000);
  };

  const socialLinks = [
    { name: "GitHub", icon: "📁", url: "https://github.com/mohitrawat061" },
    {
      name: "LinkedIn",
      icon: "🔗",
      url: "https://linkedin.com/in/mohitrawat061",
    },
    { name: "Email", icon: "📧", url: "mailto:mohitrawat061@gmail.com" },
    { name: "LeetCode", icon: "⚔️", url: "https://leetcode.com/mohitrawat061" },
  ];

  return (
    <section id="contact" className="contact-section">
      <motion.h2
        className="section-title glitch"
        data-text="GET IN TOUCH"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        GET IN TOUCH
      </motion.h2>

      <div className="contact-container">
        <motion.div
          className="contact-form-container"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="form-input"
              />
              <span className="input-border"></span>
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="form-input"
              />
              <span className="input-border"></span>
            </div>

            <div className="form-group">
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows="5"
                className="form-input"
              />
              <span className="input-border"></span>
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={sending || sent}
            >
              {sending ? "SENDING..." : sent ? "SENT!" : "SEND MESSAGE"}
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="contact-info"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Let's build something amazing together!</h3>
          <p>
            I'm always open to discussing new opportunities, innovative
            projects, or just having a tech chat.
          </p>

          <div className="social-links">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-name">{link.name}</span>
              </motion.a>
            ))}
          </div>

          <div className="availability-status">
            <span className="status-dot"></span>
            Available for freelance work
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
