// components/About/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./About.css";

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const timeline = [
    { year: "2021", event: "Started B.Tech in CSE", icon: "🎓" },
    { year: "2022", event: "Won Hack-o-Holic Hackathon", icon: "🏆" },
    { year: "2023", event: "Deep dive into AI/ML", icon: "🤖" },
    { year: "2024", event: "Built 10+ production projects", icon: "🚀" },
    { year: "2025", event: "Final year & job ready!", icon: "💼" },
  ];

  return (
    <section id="about" className="about-section" ref={ref}>
      <motion.h2
        className="section-title glitch"
        data-text="ABOUT ME"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
      >
        ABOUT ME
      </motion.h2>

      <div className="about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="about-text">
            <p className="highlight-text">
              Final-year B.Tech student with a passion for building
              <span className="gradient-text"> intelligent systems</span> that
              solve real-world problems.
            </p>
            <p>
              I specialize in fullstack development with a focus on AI/ML
              integration and secure system design. My journey from competitive
              programming to building production-ready applications has equipped
              me with a unique blend of problem-solving skills and practical
              development experience.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new tech,
              contributing to open source, or pushing my limits on coding
              platforms.
            </p>
          </div>

          <div className="quick-facts">
            <div className="fact-item">
              <span className="fact-icon">🏫</span>
              <span>Graphic Era Hill University</span>
            </div>
            <div className="fact-item">
              <span className="fact-icon">📍</span>
              <span>Dehradun, India</span>
            </div>
            <div className="fact-item">
              <span className="fact-icon">🎯</span>
              <span>Open to opportunities</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="timeline-container"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>My Journey</h3>
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="timeline-icon">{item.icon}</div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <p className="timeline-event">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
