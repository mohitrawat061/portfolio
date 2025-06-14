// components/CodeStats/CodeStats.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./CodeStats.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CodeStats = () => {
  const [activeTab, setActiveTab] = useState("leetcode");

  const platforms = {
    leetcode: {
      rating: 2109,
      rank: "Knight",
      bestRank: 644,
      solved: 450,
      color: "#FFA116",
      icon: "⚔️",
    },
    codeforces: {
      rating: 1490,
      rank: "Specialist",
      contests: 25,
      solved: 300,
      color: "#1E90FF",
      icon: "🏆",
    },
    codechef: {
      rating: 1796,
      rank: "3★",
      contests: 20,
      solved: 200,
      color: "#5B4638",
      icon: "👨‍🍳",
    },
  };

  const chartData = {
    labels: ["Arrays", "DP", "Graphs", "Trees", "Math", "Strings"],
    datasets: [
      {
        label: "Problem Solving Skills",
        data: [90, 75, 80, 85, 70, 88],
        backgroundColor: "rgba(0, 255, 136, 0.2)",
        borderColor: "#00ff88",
        pointBackgroundColor: "#00ff88",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#00ff88",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: "#666",
          backdropColor: "transparent",
        },
        grid: {
          color: "#333",
        },
        pointLabels: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <section className="code-stats-section" id="stats">
      <motion.h2 className="section-title glitch" data-text="CODING PROWESS">
        CODING PROWESS
      </motion.h2>

      <div className="stats-container">
        <div className="platform-tabs">
          {Object.entries(platforms).map(([platform, data]) => (
            <motion.button
              key={platform}
              className={`platform-tab ${
                activeTab === platform ? "active" : ""
              }`}
              onClick={() => setActiveTab(platform)}
              style={{
                borderColor:
                  activeTab === platform ? data.color : "transparent",
                color: activeTab === platform ? data.color : "#666",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="platform-icon">{data.icon}</span>
              {platform.toUpperCase()}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          className="platform-stats"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-cards">
            <div
              className="stat-card"
              style={{ borderColor: platforms[activeTab].color }}
            >
              <h3>Rating</h3>
              <CountUp
                end={platforms[activeTab].rating}
                duration={2}
                className="stat-number"
                style={{ color: platforms[activeTab].color }}
              />
            </div>
            <div
              className="stat-card"
              style={{ borderColor: platforms[activeTab].color }}
            >
              <h3>Rank</h3>
              <span
                className="rank-badge"
                style={{ backgroundColor: platforms[activeTab].color }}
              >
                {platforms[activeTab].rank}
              </span>
            </div>
            <div
              className="stat-card"
              style={{ borderColor: platforms[activeTab].color }}
            >
              <h3>Problems Solved</h3>
              <CountUp
                end={platforms[activeTab].solved}
                duration={2}
                className="stat-number"
                style={{ color: platforms[activeTab].color }}
              />
            </div>
          </div>

          <div className="chart-container">
            <Radar data={chartData} options={chartOptions} />
          </div>
        </motion.div>

        <ProblemSolvingAnimation />
      </div>
    </section>
  );
};

const ProblemSolvingAnimation = () => {
  const [solving, setSolving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (solving && !completed) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setSolving(false);
            setCompleted(true);
            return 100; // Keep at 100 instead of resetting to 0
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [solving, completed]);

  const handleReset = () => {
    setProgress(0);
    setSolving(false);
    setCompleted(false);
  };

  const handleStart = () => {
    if (!solving && !completed) {
      setSolving(true);
    }
  };

  return (
    <div className="problem-solving-viz">
      <div className="button-group">
        <motion.button
          className="solve-button"
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={solving || completed}
          style={{
            opacity: solving || completed ? 0.6 : 1,
            cursor: solving || completed ? "not-allowed" : "pointer",
          }}
        >
          {solving
            ? "Solving..."
            : completed
            ? "Solved!"
            : "Simulate Problem Solving"}
        </motion.button>

        {completed && (
          <motion.button
            className="reset-button"
            onClick={handleReset}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
        )}
      </div>

      {(solving || completed) && (
        <motion.div
          className="solving-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="code-lines">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="code-line"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: progress > i * 10 ? 1 : 0, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="line-number">{i + 1}</span>
                <span className="code-text">
                  {i === 0 && "function solve(problem) {"}
                  {i === 1 && "  // Analyzing problem..."}
                  {i === 2 && "  const approach = findOptimalApproach();"}
                  {i === 3 && "  "}
                  {i === 4 && "  // Implementing solution"}
                  {i === 5 && "  const result = implement(approach);"}
                  {i === 6 && "  "}
                  {i === 7 && "  // Optimizing time complexity"}
                  {i === 8 && "  return optimize(result);"}
                  {i === 9 && "}"}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progress}%` }}
              style={{ backgroundColor: "#00ff88" }}
            />
          </div>
          {completed && (
            <motion.div
              className="success-message"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              ✅ Problem Solved!
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CodeStats;
