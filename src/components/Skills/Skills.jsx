// components/Skills/Skills.jsx
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Box } from "@react-three/drei";
import { motion } from "framer-motion";
import "./Skills.css";

const SkillBox = ({ skill, position, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
    if (hovered) {
      meshRef.current.scale.x =
        meshRef.current.scale.y =
        meshRef.current.scale.z =
          1.2;
    } else {
      meshRef.current.scale.x =
        meshRef.current.scale.y =
        meshRef.current.scale.z =
          1;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={color} />
      </Box>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
    </group>
  );
};

const Skills = () => {
  const skillCategories = {
    languages: ["Java", "Python", "C++", "JavaScript", "TypeScript"],
    frontend: ["React.js", "Angular", "HTML/CSS", "Three.js"],
    backend: ["FastAPI", "Flask", "Spring Boot", "Node.js"],
    ai_ml: ["PyTorch", "YOLOv5", "DGL", "KPGT"],
    databases: ["MySQL", "PostgreSQL", "AWS"],
    security: ["RSA", "AES", "JWT", "OAuth"],
  };

  const [selectedCategory, setSelectedCategory] = useState("languages");

  return (
    <section className="skills-section">
      <motion.h2 className="section-title glitch" data-text="TECH ARSENAL">
        TECH ARSENAL
      </motion.h2>

      <div className="skills-container">
        <div className="category-selector">
          {Object.keys(skillCategories).map((category) => (
            <motion.button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.replace("_", "/").toUpperCase()}
            </motion.button>
          ))}
        </div>

        <div className="skills-3d-container">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {skillCategories[selectedCategory].map((skill, index) => {
              const angle =
                (index / skillCategories[selectedCategory].length) *
                Math.PI *
                2;
              const radius = 2;
              return (
                <SkillBox
                  key={skill}
                  skill={skill}
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    0,
                  ]}
                  color={`hsl(${
                    (index * 360) / skillCategories[selectedCategory].length
                  }, 70%, 50%)`}
                />
              );
            })}
          </Canvas>
        </div>
      </div>

      <SkillsRadar />
    </section>
  );
};

const SkillsRadar = () => {
  const [activeSkill, setActiveSkill] = useState(null);

  const skills = [
    { name: "Frontend", level: 90, color: "#00ff88" },
    { name: "Backend", level: 85, color: "#ff006e" },
    { name: "AI/ML", level: 80, color: "#8338ec" },
    { name: "Security", level: 75, color: "#3a86ff" },
    { name: "DevOps", level: 70, color: "#ffbe0b" },
  ];

  return (
    <div className="skills-radar">
      <svg viewBox="0 0 400 400" className="radar-svg">
        {/* Background circles */}
        {[20, 40, 60, 80, 100].map((radius, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={radius * 1.5}
            fill="none"
            stroke="#333"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}

        {/* Skill polygons */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + Math.cos(angle) * skill.level * 1.5;
          const y = 200 + Math.sin(angle) * skill.level * 1.5;

          return (
            <g key={skill.name}>
              <line
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke={skill.color}
                strokeWidth="2"
                opacity="0.6"
              />
              <motion.circle
                cx={x}
                cy={y}
                r="8"
                fill={skill.color}
                whileHover={{ r: 12 }}
                onHoverStart={() => setActiveSkill(skill)}
                onHoverEnd={() => setActiveSkill(null)}
                style={{ cursor: "pointer" }}
              />
              <text
                x={x}
                y={y - 20}
                textAnchor="middle"
                fill="white"
                fontSize="14"
              >
                {skill.name}
              </text>
            </g>
          );
        })}
      </svg>

      {activeSkill && (
        <motion.div
          className="skill-tooltip"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h4>{activeSkill.name}</h4>
          <div className="skill-bar">
            <motion.div
              className="skill-progress"
              initial={{ width: 0 }}
              animate={{ width: `${activeSkill.level}%` }}
              style={{ backgroundColor: activeSkill.color }}
            />
          </div>
          <span>{activeSkill.level}%</span>
        </motion.div>
      )}
    </div>
  );
};

export default Skills;
