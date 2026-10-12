import React from 'react';
import { PieChart, RefreshCw } from 'lucide-react';

export default function AdminTrafficSourcesChart({
  trafficSources = [],
  totalVisitors = 0,
  timeRange = '7d',
  onTimeRangeChange = () => {},
  loading = false
}) {
  const defaultSegments = [
    { label: 'Direct Visits', percentage: 0, count: 0, color: '#D4A23A', strokeColor: '#E6B65B' },
    { label: 'Google Search', percentage: 0, count: 0, color: '#3B82F6', strokeColor: '#60A5FA' },
    { label: 'Social Media', percentage: 0, count: 0, color: '#8B5CF6', strokeColor: '#A78BFA' },
    { label: 'Referral Links', percentage: 0, count: 0, color: '#06B6D4', strokeColor: '#38BDF8' },
    { label: 'Others', percentage: 0, count: 0, color: '#64748B', strokeColor: '#94A3B8' }
  ];

  const segments = Array.isArray(trafficSources) && trafficSources.length > 0
    ? trafficSources
    : defaultSegments;

  const total = Number(totalVisitors) || segments.reduce((sum, s) => sum + (s.count || 0), 0);

  // Circumference = 2 * PI * r = 2 * 3.14159 * 65 ≈ 408.4
  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;
  const donutArcs = segments.map((seg) => {
    // If total is 0, percentage is 0
    const pct = total > 0 ? (typeof seg.percentage === 'number' ? seg.percentage : (seg.count / total) * 100) : 0;
    const strokeDasharray = `${(pct / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativePercent / 100) * circumference);
    cumulativePercent += pct;
    return {
      ...seg,
      computedPct: Math.round(pct * 10) / 10,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="admin-chart-heading">Traffic Sources</h3>
              {loading && <RefreshCw size={13} className="spin" color="var(--adm-gold-primary)" />}
            </div>
            <p className="admin-chart-sub">Channel acquisition breakdown</p>
          </div>
        </div>

        <select
          className="admin-dropdown-select"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          disabled={loading}
        >
          <option value="today">Today</option>
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
            {total > 0 &&
              donutArcs.map((arc, idx) => (
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
            <div className="admin-donut-center-num">
              {total.toLocaleString()}
            </div>
            <div className="admin-donut-center-label">
              {total === 1 ? 'Total Visitor' : 'Total Visitors'}
            </div>
          </div>
        </div>

        {/* Legend with Genuine Calculated Percentages */}
        <div className="admin-donut-legend">
          {donutArcs.map((seg, idx) => (
            <div key={`leg-${idx}`} className="admin-legend-item">
              <div className="admin-legend-left">
                <span
                  className="admin-legend-dot"
                  style={{ backgroundColor: seg.color }}
                />
                <span>{seg.label}</span>
                {seg.count > 0 && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--adm-text-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    ({seg.count})
                  </span>
                )}
              </div>
              <span className="admin-legend-pct">
                {seg.computedPct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
