import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Calendar, RefreshCw } from 'lucide-react';

export default function AdminVisitorAnalyticsChart({
  timeRange = '7d',
  onTimeRangeChange = () => {},
  chartHistory = [],
  activeVisitors = 0,
  loading = false,
  onRefresh = () => {}
}) {
  const [activePointIndex, setActivePointIndex] = useState(null);

  // Fallback points if none provided
  const points = useMemo(() => {
    if (Array.isArray(chartHistory) && chartHistory.length > 0) {
      return chartHistory;
    }
    return [];
  }, [chartHistory]);

  // Compute scale and SVG coordinates dynamically
  const { maxVal, yLabels, yCoordinates, svgPoints, linePath, areaPath } = useMemo(() => {
    const rawMax = Math.max(
      ...points.map((p) => Math.max(p.visits || 0, p.pageViews || 0)),
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
      const val = pt.visits || 0;
      const y = bottomY - (val / max) * heightSpan;
      return {
        ...pt,
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

    // Build smooth cubic bezier curve
    let d = `M ${computed[0].x},${computed[0].y}`;
    for (let i = 0; i < computed.length - 1; i++) {
      const p0 = i > 0 ? computed[i - 1] : computed[0];
      const p1 = computed[i];
      const p2 = computed[i + 1];
      const p3 = i < computed.length - 2 ? computed[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.x.toFixed(1)}`;
    }

    const last = computed[computed.length - 1];
    const area = `${d} L ${last.x},${bottomY} L ${computed[0].x},${bottomY} Z`;

    return {
      maxVal: max,
      yLabels: yVals,
      yCoordinates: yCoords,
      svgPoints: computed,
      linePath: d,
      areaPath: area
    };
  }, [points]);

  // Selected tooltip point
  const activePoint = useMemo(() => {
    if (activePointIndex !== null && svgPoints[activePointIndex]) {
      return svgPoints[activePointIndex];
    }
    // Default to the last recorded point or peak
    if (svgPoints.length > 0) {
      let maxIdx = 0;
      svgPoints.forEach((p, idx) => {
        if ((p.visits || 0) > (svgPoints[maxIdx].visits || 0)) {
          maxIdx = idx;
        }
      });
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            {activePoint.visits} Unique Visitor{activePoint.visits === 1 ? '' : 's'}
          </div>
          <div className="admin-chart-tooltip-date">
            {activePoint.date} • {activePoint.pageViews || 0} Page View{activePoint.pageViews === 1 ? '' : 's'}
          </div>
        </div>
      )}

      {/* SVG Spline Canvas */}
      <div className="admin-svg-spline-container" style={{ position: 'relative', minHeight: '240px' }}>
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
                    r={isActive ? '7.5' : (pt.visits > 0 ? '3.5' : '2')}
                    fill="var(--adm-gold-light)"
                    fillOpacity={isActive ? '0.45' : '0.12'}
                    filter={isActive ? 'url(#pointGlow)' : undefined}
                  />

                  {/* Inner solid circle */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isActive ? '4.5' : (pt.visits > 0 ? '3' : '2')}
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
