import React from "react";
import { Cpu, Server, Database, Layers, BarChart, CircleDot } from "lucide-react";

interface TechStackBadgesProps {
  technologies: string[];
}

export default function TechStackBadges({ technologies }: TechStackBadgesProps) {
  // Simple helper to associate colors and icons based on tech name
  function getTechMeta(tech: string) {
    const lower = tech.toLowerCase();
    
    if (lower.includes("php") || lower.includes("laravel") || lower.includes("node") || lower.includes("rails")) {
      return {
        color: "bg-indigo-50 border-indigo-100 text-indigo-700",
        icon: <Server className="w-3.5 h-3.5 mr-1" />,
        category: "Backend Runtime"
      };
    }
    if (lower.includes("mysql") || lower.includes("postgres") || lower.includes("sql") || lower.includes("database") || lower.includes("mongo")) {
      return {
        color: "bg-cyan-50 border-cyan-100 text-cyan-700",
        icon: <Database className="w-3.5 h-3.5 mr-1" />,
        category: "Data Store"
      };
    }
    if (lower.includes("react") || lower.includes("vue") || lower.includes("jquery") || lower.includes("angular") || lower.includes("alpine")) {
      return {
        color: "bg-sky-50 border-sky-100 text-sky-700",
        icon: <Layers className="w-3.5 h-3.5 mr-1" />,
        category: "JS Library"
      };
    }
    if (lower.includes("analytics") || lower.includes("gtm") || lower.includes("pixel") || lower.includes("hotjar")) {
      return {
        color: "bg-rose-50 border-rose-100 text-rose-700",
        icon: <BarChart className="w-3.5 h-3.5 mr-1" />,
        category: "Telemetry"
      };
    }
    if (lower.includes("bootstrap") || lower.includes("tailwind") || lower.includes("sass") || lower.includes("fontawesome")) {
      return {
        color: "bg-emerald-50 border-emerald-100 text-emerald-700",
        icon: <Cpu className="w-3.5 h-3.5 mr-1" />,
        category: "UX/Styles"
      };
    }
    
    return {
      color: "bg-gray-50 border-gray-100 text-gray-700",
      icon: <CircleDot className="w-3.5 h-3.5 mr-1" />,
      category: "Platform Infrastructure"
    };
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {technologies.map((tech) => {
        const meta = getTechMeta(tech);
        return (
          <div
            key={tech}
            className={`px-3 py-1.5 rounded-xl border flex items-center text-xs font-medium transition-transform hover:-translate-y-0.5 ${meta.color}`}
          >
            {meta.icon}
            <div>
              <span>{tech}</span>
              <span className="block text-[8px] uppercase tracking-wider text-gray-400 font-bold leading-none mt-0.5">
                {meta.category}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
