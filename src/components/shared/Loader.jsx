// components/shared/Loader.jsx
import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loader">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
      </div>
      <motion.div
        className="loader-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="loading-text">INITIALIZING</span>
        <span className="loading-dots">...</span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
