import React, { useState } from 'react';
import { PieChart } from 'lucide-react';

export default function AdminTrafficSourcesChart({ totalVisitors = '2,086' }) {
  const [timeRange, setTimeRange] = useState('7d');

  // Traffic segments matching Reference 1 & 2
  const segments = [
    { label: 'Direct Visits', percentage: 45.2, color: '#D4A23A', strokeColor: '#E6B65B' },
    { label: 'Google Search', percentage: 28.1, color: '#3B82F6', strokeColor: '#60A5FA' },
    { label: 'Social Media', percentage: 15.6, color: '#8B5CF6', strokeColor: '#A78BFA' },
    { label: 'Referral Links', percentage: 8.7, color: '#06B6D4', strokeColor: '#38BDF8' },
    { label: 'Others', percentage: 2.4, color: '#64748B', strokeColor: '#94A3B8' }
  ];

  // Calculate SVG stroke-dasharray and stroke-dashoffset for circular ring
  // Circumference = 2 * PI * r = 2 * 3.14159 * 65 ≈ 408.4
  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const donutArcs = segments.map((seg) => {
    const strokeDasharray = `${(seg.percentage / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += seg.percentage;
    return {
      ...seg,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <div className="admin-chart-card">
      {/* Header */}
      <div className="admin-chart-header">
        <div className="admin-chart-title-wrap">
          <div className="admin-chart-icon-box">
            <PieChart size={18} />
          </div>
          <div>
            <h3 className="admin-chart-heading">Traffic Sources</h3>
            <p className="admin-chart-sub">Channel acquisition breakdown</p>
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

      {/* Donut & Legend Content */}
      <div className="admin-donut-wrapper">
        {/* SVG Donut Graphic */}
        <div className="admin-donut-graphic">
          <svg
            viewBox="0 0 170 170"
            style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
          >
            {/* Background Track */}
            <circle
              cx="85"
              cy="85"
              r={radius}
              fill="transparent"
              stroke="var(--adm-border-subtle)"
              strokeWidth="22"
            />

            {/* Segment Rings */}
            {donutArcs.map((arc, idx) => (
              <circle
                key={`arc-${idx}`}
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke={arc.color}
                strokeWidth="22"
                strokeDasharray={arc.strokeDasharray}
                strokeDashoffset={arc.strokeDashoffset}
                strokeLinecap="butt"
                style={{
                  transition: 'stroke-dasharray 0.8s ease, stroke-dashoffset 0.8s ease'
                }}
              />
            ))}
          </svg>

          {/* Center Info Hole */}
          <div className="admin-donut-center-info">
            <div className="admin-donut-center-num">{totalVisitors}</div>
            <div className="admin-donut-center-label">Total Visitors</div>
          </div>
        </div>

        {/* Legend */}
        <div className="admin-donut-legend">
          {segments.map((seg, idx) => (
            <div key={`leg-${idx}`} className="admin-legend-item">
              <div className="admin-legend-left">
                <span
                  className="admin-legend-dot"
                  style={{ backgroundColor: seg.color }}
                />
                <span>{seg.label}</span>
              </div>
              <span className="admin-legend-pct">{seg.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
