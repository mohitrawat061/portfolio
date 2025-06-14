// components/shared/Cursor.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Cursor.css";

const Cursor = ({ mousePosition }) => {
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    const interactiveElements = document.querySelectorAll(
      "a, button, .clickable"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  });

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
    },
  };

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <div
        className="cursor-follower"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />
    </>
  );
};

export default Cursor;
