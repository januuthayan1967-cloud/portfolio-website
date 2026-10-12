import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export default function AdminVisitorAnalyticsChart() {
  const [timeRange, setTimeRange] = useState('7d');
  const [activePointIndex, setActivePointIndex] = useState(4); // Default to Dec 10 peak

  const dataPoints = [
    { date: 'Dec 06', visits: 58, x: 45, y: 190 },
    { date: 'Dec 07', visits: 132, x: 118, y: 145 },
    { date: 'Dec 08', visits: 164, x: 192, y: 130 },
    { date: 'Dec 09', visits: 150, x: 265, y: 138 },
    { date: 'Dec 10', visits: 312, x: 338, y: 55 }, // Peak
    { date: 'Dec 11', visits: 205, x: 412, y: 110 },
    { date: 'Dec 12', visits: 258, x: 485, y: 85 }
  ];

  const activePoint = dataPoints[activePointIndex] || dataPoints[4];

  // SVG Spline Path (Cubic Bezier curve through all points)
  const linePath = `
    M 45,190
    C 80,170 90,148 118,145
    C 148,142 165,132 192,130
    C 222,128 238,142 265,138
    C 295,134 315,62 338,55
    C 362,48 388,118 412,110
    C 442,102 460,88 485,85
  `;

  const areaPath = `
    ${linePath}
    L 485,215
    L 45,215
    Z
  `;

  const yLabels = [400, 300, 200, 100, 0];
  const yCoordinates = [30, 75, 120, 165, 210];

  return (
    <div className="admin-chart-card">
      {/* Header */}
      <div className="admin-chart-header">
        <div className="admin-chart-title-wrap">
          <div className="admin-chart-icon-box">
            <BarChart3 size={18} />
          </div>
          <div>
            <h3 className="admin-chart-heading">Visitor Analytics</h3>
            <p className="admin-chart-sub">Track your portfolio performance over time.</p>
          </div>
        </div>

        <select
          className="admin-dropdown-select"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Interactive Tooltip for Active Point */}
      {activePoint && (
        <div
          className="admin-chart-tooltip"
          style={{
            left: `${(activePoint.x / 530) * 100}%`,
            top: `${Math.max(10, activePoint.y - 45)}px`
          }}
        >
          <div className="admin-chart-tooltip-val">{activePoint.visits} Visits</div>
          <div className="admin-chart-tooltip-date">{activePoint.date}, 2026</div>
        </div>
      )}

      {/* SVG Spline Canvas */}
      <div className="admin-svg-spline-container">
        <svg
          viewBox="0 0 530 240"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          preserveAspectRatio="none"
        >
          <defs>
            {/* Area Fill Gradient */}
            <linearGradient id="visitorAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--adm-chart-line)" stopOpacity="0.32" />
              <stop offset="65%" stopColor="var(--adm-chart-line)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--adm-chart-line)" stopOpacity="0.00" />
            </linearGradient>

            {/* Glowing Peak Halo Filter */}
            <filter id="pointGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal Gridlines & Y-Labels */}
          {yCoordinates.map((y, idx) => (
            <g key={`y-${idx}`}>
              <text
                x="5"
                y={y + 4}
                fill="var(--adm-text-faint)"
                fontSize="11"
                fontFamily="var(--font-mono)"
              >
                {yLabels[idx]}
              </text>
              <line
                x1="35"
                y1={y}
                x2="515"
                y2={y}
                stroke="var(--adm-chart-grid)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </g>
          ))}

          {/* Area Fill under spline */}
          <path d={areaPath} fill="url(#visitorAreaGrad)" />

          {/* Active Point Vertical Guideline */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={210}
              stroke="var(--adm-gold-primary)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              strokeOpacity="0.6"
            />
          )}

          {/* Main Spline Curve */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--adm-chart-line)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {dataPoints.map((pt, idx) => {
            const isActive = activePointIndex === idx;
            return (
              <g
                key={`pt-${idx}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActivePointIndex(idx)}
                onMouseEnter={() => setActivePointIndex(idx)}
              >
                {/* Invisible hover target */}
                <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                {/* Outer halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? '8' : '4'}
                  fill="var(--adm-gold-light)"
                  fillOpacity={isActive ? '0.35' : '0.15'}
                  filter={isActive ? 'url(#pointGlow)' : undefined}
                />

                {/* Inner solid circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isActive ? '4.5' : '3'}
                  fill={isActive ? 'var(--adm-surface)' : 'var(--adm-gold-primary)'}
                  stroke="var(--adm-gold-primary)"
                  strokeWidth="2.5"
                />

                {/* X-axis Date Label */}
                <text
                  x={pt.x}
                  y="232"
                  textAnchor="middle"
                  fill={isActive ? 'var(--adm-gold-primary)' : 'var(--adm-text-faint)'}
                  fontSize="11"
                  fontWeight={isActive ? '700' : '500'}
                  fontFamily="var(--font-mono)"
                >
                  {pt.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
