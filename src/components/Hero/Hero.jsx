// components/Hero/Hero.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed"; // Fix: Use ReactTyped instead of Typed
import "./Hero.css";

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#00ff88"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const Hero = () => {
  const roles = [
    "Fullstack Developer",
    "AI/ML Engineer",
    "System Designer",
    "Problem Solver",
    "Tech Innovator",
  ];

  return (
    <section className="hero-section">
      <div className="hero-canvas">
        <Canvas>
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-2, 5, 2]} />
          <AnimatedSphere />
        </Canvas>
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <div className="glitch-wrapper">
            <h1 className="glitch" data-text="MOHIT SINGH RAWAT">
              MOHIT SINGH RAWAT
            </h1>
          </div>

          <div className="typed-container">
            <span className="typed-prefix">I am a </span>
            <ReactTyped
              strings={roles}
              typeSpeed={80}
              backSpeed={50}
              loop
              className="typed-text"
            />
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-number">8.0+</span>
              <span className="stat-label">CGPA</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">2109</span>
              <span className="stat-label">LeetCode</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">10+</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
            onClick={() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            <span>Explore My Work</span>
            <div className="button-particles"></div>
          </motion.button>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span>↓</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
