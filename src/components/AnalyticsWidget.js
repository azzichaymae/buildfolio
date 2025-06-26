import React, { useEffect } from "react";
import "../styles/Dashboard.css";

const AnalyticsWidget = ({ skills }) => {
  useEffect(() => {
    const tooltip = document.getElementById("tooltip");
    const bars = document.querySelectorAll("rect.bar");

    const handleMouseMove = (e) => {
      const label = e.target.getAttribute("data-label");
      tooltip.textContent = label;
      tooltip.style.opacity = "1";

      const containerRect = e.target.ownerSVGElement.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      let left = mouseX + 10;
      if (left + tooltip.offsetWidth > containerRect.width) {
        left = mouseX - tooltip.offsetWidth - 10;
      }

      let top = mouseY - tooltip.offsetHeight - 10;
      if (top < 0) {
        top = mouseY + 10;
      }

      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
    };

    const handleMouseLeave = () => {
      tooltip.style.opacity = "0";
    };

    bars.forEach((bar) => {
      bar.addEventListener("mousemove", handleMouseMove);
      bar.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event listeners on component unmount
    return () => {
      bars.forEach((bar) => {
        bar.removeEventListener("mousemove", handleMouseMove);
        bar.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [skills]); // Re-run when skills change

  // Constants for SVG dimensions
  const barWidth = 60;
  const barSpacing = 40;
  const svgWidth = skills.length * (barWidth + barSpacing) + barSpacing;
  const svgHeight = 200;
  const maxHeight = 180; // Maximum height for bars (0-100 proficiency)

  // Map proficiency to bar height (0-100 maps to 0-180px)
  const getBarHeight = (proficiency) => {
    return (proficiency / 100) * maxHeight;
  };

  return (
    <div className="analytics-widget">
      <div className="w-xl mx-auto bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-slate-900 font-semibold text-lg mb-6">Skills Overview</h2>
        {skills.length > 0 ? (
          <div className="relative w-full h-48">
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Grid lines */}
              <line x1="0" y1="20" x2={svgWidth} y2="20" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="60" x2={svgWidth} y2="60" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="100" x2={svgWidth} y2="100" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2={svgWidth} y2="140" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="180" x2={svgWidth} y2="180" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />

              {/* Y-axis labels */}
              <text x="10" y="190" fill="#6b7280" fontSize="12" fontFamily="ui-sans-serif, system-ui">0</text>
              <text x="10" y="150" fill="#6b7280" fontSize="12" fontFamily="ui-sans-serif, system-ui">25</text>
              <text x="10" y="110" fill="#6b7280" fontSize="12" fontFamily="ui-sans-serif, system-ui">50</text>
              <text x="10" y="70" fill="#6b7280" fontSize="12" fontFamily="ui-sans-serif, system-ui">75</text>
              <text x="10" y="30" fill="#6b7280" fontSize="12" fontFamily="ui-sans-serif, system-ui">100</text>

              {/* Dynamically render bars and labels */}
              {skills.map((skill, index) => {
                const x = barSpacing + index * (barWidth + barSpacing);
                const height = getBarHeight(skill.proficiency);
                const y = maxHeight - height + 20; // Adjust y-position based on height

                return (
                  <g key={skill.id}>
                  <rect
                    className="bar"
                    x={x}
                    y={y}
                    width={barWidth}
                    height={height}
                    fill="#7c3aed"
                    rx="4"
                    ry="4"
                    data-label={`${skill.name} (${skill.proficiency}%)`}
                  />
                  <text
                    x={x + barWidth / 2}
                    y="195"
                    fill="#fff"
                    fontSize="12"
                    fontFamily="ui-sans-serif, system-ui"
                    textAnchor="middle"
                  >
                    {skill.name}
                  </text>
                  </g>
                );
              })}
            </svg>
            <div
              id="tooltip"
              className="absolute bg-gray-800 text-white text-xs rounded px-2 py-1 pointer-events-none opacity-0 transition-opacity"
            ></div>
          </div>
        ) : (
          <p className="text-gray-500">No skills available. Add some skills to see the chart.</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsWidget;