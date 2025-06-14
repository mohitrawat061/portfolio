// components/Projects/Projects.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Projects.css";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true });

  const projects = [
    {
      id: 1,
      title: "Smart Traffic Management System",
      tech: ["React.js", "FastAPI", "YOLOv5", "PyTorch"],
      description:
        "AI-powered traffic control with real-time vehicle detection",
      features: [
        "Real-time vehicle detection & tracking",
        "Dynamic signal control",
        "Violation detection system",
        "Distress detection module",
      ],
      color: "#FF006E",
      icon: "🚦",
      stats: { accuracy: "95%", vehicles: "1000+/hr", violations: "Auto" },
    },
    {
      id: 2,
      title: "AI Drug Discovery Assistant",
      tech: ["React.js", "PyTorch", "DGL", "KPGT"],
      description: "GNN-based drug property prediction platform",
      features: [
        "Molecular property prediction",
        "SMILES processing",
        "Natural language explanations",
        "Graph neural networks",
      ],
      color: "#8338EC",
      icon: "💊",
      stats: { predictions: "3 types", accuracy: "92%", molecules: "10K+" },
    },
    {
      id: 3,
      title: "FileCypher",
      tech: ["Spring Boot", "Angular", "AWS", "RSA/AES"],
      description: "Hybrid encryption-based secure file storage",
      features: [
        "Hybrid encryption (RSA+AES)",
        "Cloud storage integration",
        "10x speed improvement",
        "Secure key exchange",
      ],
      color: "#3A86FF",
      icon: "🔐",
      stats: { encryption: "256-bit", speed: "10x", storage: "AWS" },
    },
  ];

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="section-header">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-title glitch"
          data-text="PROJECTS"
        >
          PROJECTS
        </motion.h2>
        <div className="section-line"></div>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 }}
            onClick={() => setSelectedProject(project)}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="project-card"
      style={{ borderColor: project.color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <div className="project-icon">{project.icon}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      <div className="tech-stack">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="tech-tag"
            style={{ backgroundColor: project.color }}
          >
            {tech}
          </span>
        ))}
      </div>

      <motion.div
        className="project-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        {Object.entries(project.stats).map(([key, value]) => (
          <div key={key} className="stat">
            <span className="stat-label">{key}:</span>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </motion.div>

      <div
        className="hover-effect"
        style={{ backgroundColor: project.color }}
      ></div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ scale: 0.8, rotateY: 90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.8, rotateY: -90 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="modal-header">
          <span className="modal-icon">{project.icon}</span>
          <h2>{project.title}</h2>
        </div>

        <div className="features-grid">
          {project.features.map((feature, i) => (
            <motion.div
              key={i}
              className="feature-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="feature-bullet">▸</span>
              {feature}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
