import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Calendar, RefreshCw } from 'lucide-react';

/**
 * Computes a smooth monotonic cubic spline (Fritsch-Carlson algorithm)
 * Strictly preserves local monotonicity, eliminating overshooting,
 * ringing oscillations, and any dipping below the baseline (zero).
 */
function computeMonotoneSpline(points, topY = 30, bottomY = 210) {
  if (!points || points.length === 0) return { linePath: '', areaPath: '' };
  if (points.length === 1) {
    return {
      linePath: `M ${points[0].x},${points[0].y}`,
      areaPath: ''
    };
  }
  if (points.length === 2) {
    const l = `M ${points[0].x},${points[0].y} L ${points[1].x},${points[1].y}`;
    const a = `${l} L ${points[1].x},${bottomY} L ${points[0].x},${bottomY} Z`;
    return { linePath: l, areaPath: a };
  }

  const n = points.length;

  // Step 1: Compute secant slopes between adjacent points
  const deltas = new Float64Array(n - 1);
  for (let i = 0; i < n - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    deltas[i] = dx === 0 ? 0 : (points[i + 1].y - points[i].y) / dx;
  }

  // Step 2: Compute tangent slopes at each point (m_i)
  const m = new Float64Array(n);
  m[0] = deltas[0];
  m[n - 1] = deltas[n - 2];
  for (let i = 1; i < n - 1; i++) {
    // If adjacent slopes have opposite signs or either is 0, slope must be 0 (local extrema or flat)
    if (deltas[i - 1] * deltas[i] <= 0) {
      m[i] = 0;
    } else {
      m[i] = (deltas[i - 1] + deltas[i]) / 2;
    }
  }

  // Step 3: Apply Fritsch & Carlson monotonicity constraints
  for (let i = 0; i < n - 1; i++) {
    if (deltas[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const alpha = m[i] / deltas[i];
      const beta = m[i + 1] / deltas[i];
      const dist = alpha * alpha + beta * beta;
      if (dist > 9) {
        const tau = 3 / Math.sqrt(dist);
        m[i] = tau * alpha * deltas[i];
        m[i + 1] = tau * beta * deltas[i];
      }
    }
  }

  // Step 4: Construct SVG Cubic Bezier Commands
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const dx = (p2.x - p1.x) / 3;

    let cp1x = p1.x + dx;
    let cp1y = p1.y + m[i] * dx;
    let cp2x = p2.x - dx;
    let cp2y = p2.y - m[i + 1] * dx;

    // Strict clamping within chart drawing bounds [topY, bottomY]
    cp1y = Math.min(bottomY, Math.max(topY, cp1y));
    cp2y = Math.min(bottomY, Math.max(topY, cp2y));

    // Valid cubic Bezier: C cp1x,cp1y cp2x,cp2y p2.x,p2.y (p2.y ensures correct target height)
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }

  const last = points[points.length - 1];
  const area = `${d} L ${last.x},${bottomY} L ${points[0].x},${bottomY} Z`;

  return { linePath: d, areaPath: area };
}

export default function AdminVisitorAnalyticsChart({
  timeRange = '7d',
  onTimeRangeChange = () => {},
  chartHistory = [],
  activeVisitors = 0,
  loading = false,
  onRefresh = () => {}
}) {
  const [activePointIndex, setActivePointIndex] = useState(null);
  const [metric, setMetric] = useState('visitors'); // 'visitors' | 'pageViews'

  // Chart data points
  const points = useMemo(() => {
    if (Array.isArray(chartHistory) && chartHistory.length > 0) {
      return chartHistory;
    }
    return [];
  }, [chartHistory]);

  // Compute scale and SVG coordinates dynamically
  const { maxVal, yLabels, yCoordinates, svgPoints, linePath, areaPath } = useMemo(() => {
    const rawMax = Math.max(
      ...points.map((p) => (metric === 'visitors' ? (p.visits || 0) : (p.pageViews || 0))),
      4
    );

    // Round up max to nice human-readable interval
    let max = 5;
    if (rawMax <= 10) max = 10;
    else if (rawMax <= 50) max = Math.ceil(rawMax / 10) * 10;
    else if (rawMax <= 200) max = Math.ceil(rawMax / 50) * 50;
    else if (rawMax <= 1000) max = Math.ceil(rawMax / 100) * 100;
    else max = Math.ceil(rawMax / 500) * 500;

    const yVals = [max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0];
    const yCoords = [30, 75, 120, 165, 210];

    const plotWidth = 440;
    const startX = 45;
    const bottomY = 210;
    const topY = 30;
    const heightSpan = bottomY - topY;

    const computed = points.map((pt, idx) => {
      const x = points.length === 1
        ? startX + plotWidth / 2
        : startX + (idx / (points.length - 1)) * plotWidth;
      const val = metric === 'visitors' ? (pt.visits || 0) : (pt.pageViews || 0);
      const y = bottomY - (val / max) * heightSpan;
      return {
        ...pt,
        val,
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10
      };
    });

    if (computed.length === 0) {
      return {
        maxVal: max,
        yLabels: yVals,
        yCoordinates: yCoords,
        svgPoints: [],
        linePath: '',
        areaPath: ''
      };
    }

    const { linePath, areaPath } = computeMonotoneSpline(computed, topY, bottomY);

    return {
      maxVal: max,
      yLabels: yVals,
      yCoordinates: yCoords,
      svgPoints: computed,
      linePath,
      areaPath
    };
  }, [points, metric]);

  // Selected tooltip point
  const activePoint = useMemo(() => {
    if (activePointIndex !== null && svgPoints[activePointIndex]) {
      return svgPoints[activePointIndex];
    }
    // Default to the point with maximum activity or latest active point
    if (svgPoints.length > 0) {
      let maxIdx = 0;
      svgPoints.forEach((p, idx) => {
        const val = p.val || 0;
        const currentMax = svgPoints[maxIdx].val || 0;
        if (val > currentMax) {
          maxIdx = idx;
        }
      });
      const lastIdx = svgPoints.length - 1;
      if ((svgPoints[lastIdx].val || 0) > 0 || (svgPoints[maxIdx].val || 0) === 0) {
        return svgPoints[lastIdx];
      }
      return svgPoints[maxIdx];
    }
    return null;
  }, [activePointIndex, svgPoints]);

  return (
    <div className="admin-chart-card" style={{ position: 'relative' }}>
      {/* Header */}
      <div className="admin-chart-header">
        <div className="admin-chart-title-wrap">
          <div className="admin-chart-icon-box">
            <BarChart3 size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h3 className="admin-chart-heading">Real Visitor Analytics</h3>
              {activeVisitors > 0 ? (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10B981'
                  }}
                  title="Active public visitors within recent 60-second window"
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 6px #10B981'
                    }}
                  />
                  {activeVisitors} Active Now
                </span>
              ) : (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.70rem',
                    color: 'var(--adm-text-muted)'
                  }}
                  title="No active visitors in the last 60 seconds"
                >
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: 'var(--adm-text-faint)'
                    }}
                  />
                  0 Active
                </span>
              )}
              {loading && <RefreshCw size={13} className="spin" color="var(--adm-gold-primary)" />}
            </div>
            <p className="admin-chart-sub">
              Genuine first-party public traffic • MongoDB Atlas
            </p>
          </div>
        </div>

        {/* Controls: Metric Toggle & Time Range Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Segmented Metric Switch */}
          <div
            style={{
              display: 'inline-flex',
              background: 'var(--adm-input-bg)',
              border: '1px solid var(--adm-border-subtle)',
              borderRadius: '8px',
              padding: '2px',
              gap: '2px'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMetric('visitors');
                setActivePointIndex(null);
              }}
              style={{
                border: 'none',
                background: metric === 'visitors' ? 'var(--adm-gold-primary)' : 'transparent',
                color: metric === 'visitors' ? '#0b0f19' : 'var(--adm-text-muted)',
                fontWeight: metric === 'visitors' ? 700 : 500,
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Show unique visitors per day"
            >
              Visitors
            </button>
            <button
              type="button"
              onClick={() => {
                setMetric('pageViews');
                setActivePointIndex(null);
              }}
              style={{
                border: 'none',
                background: metric === 'pageViews' ? 'var(--adm-gold-primary)' : 'transparent',
                color: metric === 'pageViews' ? '#0b0f19' : 'var(--adm-text-muted)',
                fontWeight: metric === 'pageViews' ? 700 : 500,
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Show total page views per day"
            >
              Page Views
            </button>
          </div>

          <select
            className="admin-dropdown-select"
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            disabled={loading}
          >
            <option value="today">Today (24h)</option>
            <option value="yesterday">Yesterday (24h)</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Interactive Tooltip for Active Point */}
      {activePoint && (
        <div
          className="admin-chart-tooltip"
          style={{
            left: `${Math.min(88, Math.max(12, (activePoint.x / 530) * 100))}%`,
            top: `${Math.max(8, activePoint.y - 45)}px`,
            pointerEvents: 'none'
          }}
        >
          <div className="admin-chart-tooltip-val">
            {metric === 'visitors'
              ? `${activePoint.visits || 0} Unique Visitor${activePoint.visits === 1 ? '' : 's'}`
              : `${activePoint.pageViews || 0} Page View${activePoint.pageViews === 1 ? '' : 's'}`}
          </div>
          <div className="admin-chart-tooltip-date">
            {activePoint.date} • {metric === 'visitors'
              ? `${activePoint.pageViews || 0} Page View${activePoint.pageViews === 1 ? '' : 's'}`
              : `${activePoint.visits || 0} Unique Visitor${activePoint.visits === 1 ? '' : 's'}`}
          </div>
        </div>
      )}

      {/* SVG Spline Canvas */}
      <div
        className="admin-svg-spline-container"
        style={{ position: 'relative', minHeight: '240px' }}
        onMouseLeave={() => setActivePointIndex(null)}
      >
        {svgPoints.length === 0 ? (
          <div
            style={{
              height: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--adm-text-muted)',
              fontSize: '0.85rem'
            }}
          >
            <BarChart3 size={28} style={{ opacity: 0.4, marginBottom: '8px' }} />
            <span>No recorded public traffic in this time window yet.</span>
            <span style={{ fontSize: '0.74rem', opacity: 0.7, marginTop: '4px' }}>
              Admin dashboard interactions are automatically excluded.
            </span>
          </div>
        ) : (
          <svg
            viewBox="0 0 530 240"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            <defs>
              {/* Area Fill Gradient */}
              <linearGradient id="visitorAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--adm-chart-line)" stopOpacity="0.35" />
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
            {areaPath && <path d={areaPath} fill="url(#visitorAreaGrad)" />}

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
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="var(--adm-chart-line)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Interactive Data Points */}
            {svgPoints.map((pt, idx) => {
              const isActive = activePoint && activePoint.x === pt.x;
              // Avoid label overlap if many points (e.g. 24 or 30 or 90)
              const showLabel =
                svgPoints.length <= 8 ||
                idx % Math.ceil(svgPoints.length / 7) === 0 ||
                idx === svgPoints.length - 1;

              return (
                <g
                  key={`pt-${idx}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActivePointIndex(idx)}
                  onMouseEnter={() => setActivePointIndex(idx)}
                >
                  {/* Invisible wide hover target */}
                  <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                  {/* Outer halo */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? '7.5' : ((pt.val || 0) > 0 ? '3.5' : '2')}
                    fill="var(--adm-gold-light)"
                    fillOpacity={isActive ? '0.45' : '0.12'}
                    filter={isActive ? 'url(#pointGlow)' : undefined}
                  />

                  {/* Inner solid circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? '4.5' : ((pt.val || 0) > 0 ? '3' : '2')}
                    fill={isActive ? 'var(--adm-surface)' : 'var(--adm-gold-primary)'}
                    stroke="var(--adm-gold-primary)"
                    strokeWidth={isActive ? '2.5' : '1.5'}
                  />

                  {/* X-axis Date Label */}
                  {showLabel && (
                    <text
                      x={pt.x}
                      y="232"
                      textAnchor="middle"
                      fill={isActive ? 'var(--adm-gold-primary)' : 'var(--adm-text-faint)'}
                      fontSize="10.5"
                      fontWeight={isActive ? '700' : '500'}
                      fontFamily="var(--font-mono)"
                    >
                      {pt.date}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
