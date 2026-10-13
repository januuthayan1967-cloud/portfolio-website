import React from 'react';

// Brand SVG logos for authentic, pixel-perfect rendering matching the reference
const TECH_LIST = [
  {
    name: 'React',
    color: '#61DAFB',
    icon: (
      <svg width="22" height="22" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Next.js',
    color: '#FFFFFF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 180 180" fill="none">
        <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
          <circle cx="90" cy="90" r="90" fill="black"/>
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" r="90" fill="#000" stroke="#FFF" strokeWidth="6"/>
          <path d="M149.508 157.438L69.1055 54H54V125.97H66.1539V69.3787L139.99 164.846C143.333 162.617 146.518 160.134 149.508 157.438Z" fill="#FFF"/>
          <rect x="115" y="54" width="12" height="72" fill="#FFF"/>
        </g>
      </svg>
    )
  },
  {
    name: 'Node.js',
    color: '#68A063',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="#68A063">
        <path d="M16 2.4l12.4 7.2v14.4L16 31.2 3.6 24V9.6L16 2.4zm0 3.3L6.1 11.4v11.2L16 28.3l9.9-5.7V11.4L16 5.7z"/>
        <path d="M16 11.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6z"/>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    icon: (
      <svg width="20" height="20" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="20" fill="#3178C6"/>
        <path d="M74.3 87.2c2.4 4 6.7 6.6 12.3 6.6 6.8 0 11.2-3.8 11.2-9.4 0-6.1-4.7-8.3-12.7-11.8-11.4-5-16.6-10.4-16.6-20.2 0-11.2 8.9-19.4 22.8-19.4 9.6 0 16.5 3.3 21 11.4l-9.1 5.9c-2.4-4.5-5.9-6.3-11.8-6.3-5.9 0-9.9 3.5-9.9 8.2 0 5.4 4 7.4 12.3 11 12.3 5.3 17.2 10.9 17.2 21.3 0 12.7-9.9 20.3-24.8 20.3-13.8 0-22.3-6.5-25.7-14.8l11.2-4.8zM42.2 44.5h16.2v59.7H42.2V44.5zm-17.5 0h51.3V33.3H8.5v11.2h16.2z" fill="#FFF"/>
      </svg>
    )
  },
  {
    name: 'MongoDB',
    color: '#13AA52',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#13AA52">
        <path d="M17.193 9.555c-1.264-5.24-5.193-7.555-5.193-7.555s-3.929 2.315-5.193 7.555c-1.391 5.766 1.833 9.429 4.908 12.274.195.181.285.171.285.171s.09.01.285-.171c3.075-2.845 6.299-6.508 4.908-12.274zm-5.193 10.485c-.328-.313-.865-.851-1.378-1.554-.925-1.269-1.365-2.736-1.365-4.402 0-3.328 1.705-5.834 2.743-7.054 1.038 1.22 2.743 3.726 2.743 7.054 0 1.666-.44 3.133-1.365 4.402-.513.703-1.05 1.241-1.378 1.554z"/>
      </svg>
    )
  },
  {
    name: 'Tailwind',
    color: '#38BDF8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    )
  },
  {
    name: 'Three.js',
    color: '#F5F0E8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F0E8" strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    name: 'Python',
    color: '#3776AB',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#3776AB">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.813v.825H3.844S0 5.789 0 11.906c0 6.117 3.35 5.922 3.35 5.922h2v-2.828s-.11-3.375 3.313-3.375h5.703s3.203.055 3.203-3.117V3.117S18.008 0 11.914 0zm-3.28 1.828a1.047 1.047 0 110 2.094 1.047 1.047 0 010-2.094z" fill="#3776AB"/>
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.75H11.98v-.825h8.176S24 18.211 24 12.094c0-6.117-3.35-5.922-3.35-5.922h-2v2.828s.11 3.375-3.313 3.375H9.634s-3.203-.055-3.203 3.117v5.391S5.992 24 12.086 24zm3.28-1.828a1.047 1.047 0 110-2.094 1.047 1.047 0 010 2.094z" fill="#FFD43B"/>
      </svg>
    )
  },
  {
    name: 'Java',
    color: '#E76F00',
    icon: (
      <svg width="20" height="20" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="20" fill="#5382A1"/>
        <text x="64" y="86" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="50" textAnchor="middle">Java</text>
      </svg>
    )
  },
  {
    name: 'Express.js',
    color: '#CBD5E1',
    icon: (
      <svg width="20" height="20" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="64" fill="#1E293B"/>
        <text x="64" y="78" fill="white" fontFamily="sans-serif" fontWeight="800" fontSize="36" textAnchor="middle">ex</text>
      </svg>
    )
  },
  {
    name: 'Git',
    color: '#F05032',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#F05032">
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.122 0L8.83 2.568l3.16 3.16a2.027 2.027 0 011.897 2.666l3.056 3.055a2.03 2.03 0 11-1.06 1.06l-2.86-2.86v4.618a2.03 2.03 0 11-1.5.01V9.588a2.03 2.03 0 01-1.066-2.656L7.33 3.799.454 10.676a1.5 1.5 0 000 2.121l10.479 10.48a1.5 1.5 0 002.122 0l10.49-10.479a1.5 1.5 0 000-2.122v-.001z"/>
      </svg>
    )
  },
  {
    name: 'Vite',
    color: '#41D1FF',
    icon: (
      <svg width="20" height="20" viewBox="0 0 128 128" fill="none">
        <polygon points="64,12 118,28 64,116 10,28" fill="#BD34FE"/>
        <polygon points="64,16 112,30 64,110 16,30" fill="#41D1FF"/>
        <polygon points="66,24 40,68 62,68 56,104 88,52 66,52" fill="#FFD43B"/>
      </svg>
    )
  }
];

export default function TechStackRibbon() {
  return (
    <div className="tech-ribbon-bar">
      <div className="container-luxury" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        {/* Left Label */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <span
            className="font-mono"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              color: 'var(--gold-primary)',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            Technologies
          </span>
          <span
            className="font-heading"
            style={{
              fontSize: '0.88rem',
              color: 'var(--text-main)',
              letterSpacing: '0.04em',
              fontWeight: 700
            }}
          >
            I WORK WITH
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '36px', background: 'var(--border-gold)', flexShrink: 0, opacity: 0.5 }} />

        {/* Tech Items Horizontal Scroll / Flow */}
        <div className="tech-ribbon-scroll" style={{ flex: 1 }}>
          {TECH_LIST.map((tech) => (
            <div key={tech.name} className="tech-ribbon-item">
              <span style={{ display: 'flex', alignItems: 'center' }}>{tech.icon}</span>
              <span
                className="font-sans"
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  letterSpacing: '0.02em'
                }}
              >
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
