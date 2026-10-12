import React from 'react';

/**
 * AdminConstellationNetwork
 * Renders the geometric star & line network seen in Reference 1 (Dark) & Reference 2 (Light).
 * Uses lightweight responsive SVG with coordinates and subtle node glow points.
 */
export default function AdminConstellationNetwork() {
  // Constellation coordinate nodes across the screen (percentages)
  const nodes = [
    { x: 5, y: 12 }, { x: 18, y: 8 }, { x: 32, y: 15 }, { x: 45, y: 6 }, { x: 60, y: 14 },
    { x: 74, y: 8 }, { x: 88, y: 18 }, { x: 96, y: 10 },
    { x: 12, y: 34 }, { x: 26, y: 28 }, { x: 40, y: 38 }, { x: 55, y: 30 }, { x: 68, y: 40 },
    { x: 82, y: 32 }, { x: 94, y: 42 },
    { x: 6, y: 58 }, { x: 22, y: 52 }, { x: 36, y: 64 }, { x: 52, y: 56 }, { x: 66, y: 68 },
    { x: 80, y: 60 }, { x: 92, y: 70 },
    { x: 14, y: 82 }, { x: 28, y: 78 }, { x: 44, y: 88 }, { x: 58, y: 80 }, { x: 72, y: 92 },
    { x: 86, y: 84 }, { x: 97, y: 94 }
  ];

  // Interconnected line links between nodes
  const links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
    [0, 8], [1, 9], [2, 10], [3, 11], [4, 12], [5, 13], [6, 14],
    [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
    [8, 15], [9, 16], [10, 17], [11, 18], [12, 19], [13, 20], [14, 21],
    [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21],
    [15, 22], [16, 23], [17, 24], [18, 25], [19, 26], [20, 27], [21, 28],
    [22, 23], [23, 24], [24, 25], [25, 26], [26, 27], [27, 28],
    // Cross diagonals for geometric luxury aesthetic
    [1, 8], [2, 9], [3, 10], [4, 11], [5, 12], [6, 13],
    [9, 15], [10, 16], [11, 17], [12, 18], [13, 19], [14, 20],
    [16, 22], [17, 23], [18, 24], [19, 25], [20, 26], [21, 27]
  ];

  return (
    <svg
      className="admin-constellation-overlay"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--adm-gold-light)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="var(--adm-gold-primary)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--adm-gold-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Network Lines */}
      {links.map(([i, j], idx) => {
        const n1 = nodes[i];
        const n2 = nodes[j];
        if (!n1 || !n2) return null;
        return (
          <line
            key={`l-${idx}`}
            x1={`${n1.x}%`}
            y1={`${n1.y}%`}
            x2={`${n2.x}%`}
            y2={`${n2.y}%`}
            stroke="var(--adm-constellation-color)"
            strokeWidth="0.12"
            strokeDasharray="none"
          />
        );
      })}

      {/* Star Nodes */}
      {nodes.map((node, idx) => {
        const isHighlight = idx % 4 === 0;
        return (
          <g key={`n-${idx}`}>
            {isHighlight && (
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="1.2"
                fill="url(#nodeGlow)"
              />
            )}
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={isHighlight ? '0.45' : '0.28'}
              fill="var(--adm-constellation-dot)"
            />
          </g>
        );
      })}
    </svg>
  );
}
