import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import CodeStats from "./components/CodeStats/CodeStats.jsx";
import Contact from "./components/Contact/Contact";
import Loader from "./components/shared/Loader";
import Cursor from "./components/shared/Cursor";
import Navigation from "./components/shared/Navigation";
import BackgroundMatrix from "./components/shared/BackgroundMatrix";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 3000);

    // Track mouse
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <Loader />
      ) : (
        <div className="app">
          <BackgroundMatrix />
          <Cursor mousePosition={mousePosition} />
          <Navigation />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <CodeStats />
          <Contact />
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
