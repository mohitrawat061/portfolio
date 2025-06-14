// components/shared/Navigation.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Navigation.css";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "stats",
        "contact",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "HOME", link: "#home" },
    { name: "ABOUT", link: "#about" },
    { name: "SKILLS", link: "#skills" },
    { name: "PROJECTS", link: "#projects" },
    { name: "STATS", link: "#stats" },
    { name: "CONTACT", link: "#contact" },
  ];

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <div className="logo glitch" data-text="MSR">
          MSR
        </div>

        <ul className="nav-links">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className={`nav-link ${
                  activeSection === item.name.toLowerCase() ? "active" : ""
                }`}
              >
                <span className="nav-text">{item.name}</span>
                <span className="nav-glitch" aria-hidden="true">
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <button className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
