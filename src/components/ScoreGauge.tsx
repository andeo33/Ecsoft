import React from "react";
import { motion } from "motion/react";

interface ScoreGaugeProps {
  score: number;
  label: string;
  description: string;
  color: "emerald" | "amber" | "rose" | "blue";
}

export default function ScoreGauge({ score, label, description, color }: ScoreGaugeProps) {
  // Determine color scheme classes
  const colorMaps = {
    emerald: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      border: "border-emerald-100 dark:border-emerald-900/30",
      stroke: "#10b981",
      trail: "#ecfdf5",
    },
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-100 dark:border-blue-900/30",
      stroke: "#3b82f6",
      trail: "#eff6ff",
    },
    amber: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/20",
      border: "border-amber-100 dark:border-amber-900/30",
      stroke: "#f59e0b",
      trail: "#fffbeb",
    },
    rose: {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-950/20",
      border: "border-rose-100 dark:border-rose-900/30",
      stroke: "#f43f5e",
      trail: "#fff1f2",
    },
  };

  const scheme = colorMaps[color] || colorMaps.blue;

  // Arc math: circumference of radius 36 is ~226.2
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`p-5 rounded-2xl border ${scheme.border} ${scheme.bg} flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-md`}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={scheme.trail}
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke={scheme.stroke}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-sans text-gray-800">{score}</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">/ 100</span>
        </div>
      </div>
      <h4 className="mt-3 font-semibold text-gray-800 text-sm tracking-tight">{label}</h4>
      <p className="mt-1 text-xs text-gray-500 max-w-[140px] leading-tight">{description}</p>
    </div>
  );
}
