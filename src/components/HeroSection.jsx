import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Github, Linkedin, Mail, Play, MapPin, GraduationCap, Clock, Layers, Award, X } from 'lucide-react';
import { ArchitecturalPortraitFrame, OrbitalEnergyBackground, HolographicGlobeHUD, CapabilitySelector, PortraitGallery } from './hero';

const defaultMetrics = [
  { value: 'BSc (Hons)', label: 'Degree Programme' },
  { value: 'Results Pending', label: 'Academic Status' },
  { value: '9 Projects', label: 'Featured Systems' },
  { value: 'HND Graduate', label: 'Higher Diploma' }
];
const metricIcons = [GraduationCap, Clock, Layers, Award];

export default function HeroSection({ profile }) {
  const name = profile?.name || 'Uthayagunasingam Vanojan';
  const portrait = profile?.heroImage || '/hero/image2.jpeg';
  const [selectedImage, setSelectedImage] = useState(portrait);
  const [activeMode, setActiveMode] = useState('Develop');
  const introDialog = useRef(null);
  useEffect(() => { setSelectedImage(portrait); }, [portrait]);
  const images = [
    { id: 'portrait', src: portrait, alt: (profile?.heroIdentityName || name) + ' — executive portrait' },
    { id: 'workstation', src: profile?.heroGalleryWorkstation || '/hero/project-analytics.jpg', alt: 'Software engineering workstation' },
    { id: 'studio', src: profile?.heroGalleryStudio || '/hero/studio-setup.jpg', alt: 'Engineering studio' }
  ];
  const metrics = (profile?.metrics && profile.metrics.length > 0) ? profile.metrics : defaultMetrics;
  const badgeLines = (profile?.heroBadgeText || 'Graduate\nSoftware engineer\n& Full-stack developer').split('\n');
  const actionNoteLines = (profile?.heroActionNote || 'See my work\nin action').split('\n');
  const watermarkLines = (profile?.heroWatermarkText || 'Dev\nDesign\nInnovate').split('\n');

  return (
    <section id="hero" className="cinematic-hero">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-blue-beam" />
        {Array.from({ length: 26 }, (_, i) => (
          <i key={i} className={i % 5 === 0 ? 'spark spark-blue' : 'spark'} style={{
            left: ((i * 37 + 1) % 100) + '%', top: ((i * 23 + 17) % 94) + '%',
            width: i % 4 === 0 ? 5 : 3, height: i % 4 === 0 ? 5 : 3
          }} />
        ))}
      </div>
      <div className="cinematic-layout">
        <div className="cinematic-copy">
          <a className="engagement-status" href={profile?.heroStatusLink || "#contact"}>
            <i /><span>{profile?.statusText || 'Open for Graduate Software Engineer & Full-Stack Opportunities'}</span>
            <svg viewBox="0 0 86 12" aria-hidden="true"><path d="M0 6H82M77 1l6 5-6 5" /></svg>
          </a>
          <div className="hero-byline">
            <span>{name}</span><i aria-hidden="true">│ │ │</i>
            <span className="hero-location"><MapPin size={17} /> {profile?.location || 'Jaffna, Sri Lanka'}</span>
          </div>
          <h1 className="cinematic-headline">
            <span>{profile?.heroTitlePrefix || 'Architectural'}</span>
            <span className="precision-line"><span className="precision-word">{profile?.heroTitleHighlight || 'Precision.'}</span>
              <span className="engineering-badge"><i /><span>
                {badgeLines.map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < badgeLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span></span>
            </span>
            <span className="depth-line">{profile?.heroTitleSuffix || 'Cinematic Depth.'}</span>
          </h1>
          <p className="cinematic-tagline">{profile?.tagline || 'Motivated Software Engineering graduate candidate skilled in React.js, Node.js, Java, Python, and SQL, engineering high-performance applications.'}</p>
          <div className="cinematic-actions">
            <a className="reference-primary" href={profile?.heroPrimaryCtaLink || "#projects"}>
              {profile?.heroPrimaryCtaText || 'Explore Selected Works'} <ArrowUpRight size={19} />
            </a>
            <button className="reference-intro" onClick={() => introDialog.current?.showModal()}>
              <span><Play size={13} fill="currentColor" /></span>
              {profile?.heroSecondaryCtaText || 'Watch Intro'}
            </button>
            <div className="work-note" aria-hidden="true">
              {actionNoteLines.map((l, i) => (
                <React.Fragment key={i}>
                  {l}{i < actionNoteLines.length - 1 && <br />}
                </React.Fragment>
              ))}
              <svg viewBox="0 0 64 26"><path d="M58 2Q42 30 12 15m0 0 8-1m-8 1 5 7" /></svg>
            </div>
          </div>
          <div className="cinematic-socials">
            <span>Connect</span><i />
            <a href={profile?.github || 'https://github.com/januuthayan1967-cloud'} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
            <a href={profile?.linkedin || 'https://www.linkedin.com/in/uthayagunasingam-vanojan-1b75a2327/'} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
            <a href={'mailto:' + (profile?.email || 'uthayanvanojan5@gmail.com')} aria-label="Email"><Mail size={19} /></a>
            {profile?.twitter ? (
              <a href={profile.twitter} target="_blank" rel="noreferrer" aria-label="X"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 3h4l12 18h-4L4 3Zm0 18 7-8m2-2 7-8" /></svg></a>
            ) : null}
          </div>
          <div className="cinematic-metrics">
            {metrics.map((metric, index) => {
              const Icon = metricIcons[index] || metricIcons[0];
              return (
                <div className="cinematic-metric" key={metric.label} title={`${metric.value} — ${metric.label}`}>
                  <div>
                    <Icon size={18} />
                    <strong>{metric.value}</strong>
                  </div>
                  <span>{metric.label}</span>
                </div>
              );
            })}
          </div>
          <a className="cinematic-scroll" href="#about"><span className="scroll-mouse"><i /></span><span>Scroll to explore</span><i className="scroll-rule" /></a>
        </div>
        <div className="cinematic-stage">
          <div className="cinematic-portrait">
            <OrbitalEnergyBackground />
            <ArchitecturalPortraitFrame imageSrc={selectedImage} altText={images.find(image => image.src === selectedImage)?.alt || name}
              imagePosition={selectedImage === portrait ? 'center 43%' : 'center'} imageScale={1.03}>
              <a className="cinematic-identity" href={profile?.heroIdentityLink || "#contact"}>
                <div>
                  <strong>{profile?.heroIdentityName || name}</strong>
                  <span>{profile?.heroIdentityTitle || 'Graduate Software Engineer · Full-Stack Developer'}</span>
                  <small><i /> {profile?.heroIdentityStatus || 'Available for Opportunities'}</small>
                </div>
                <span className="identity-arrow"><ArrowRight size={20} /></span>
              </a>
            </ArchitecturalPortraitFrame>
            <PortraitGallery images={images} activeImageSrc={selectedImage} onSelectImage={setSelectedImage} />
          </div>
          <aside className="cinematic-hud" aria-label="Engineering capabilities">
            <HolographicGlobeHUD
              line1={profile?.heroGlobeLine1}
              line2={profile?.heroGlobeLine2}
              line3={profile?.heroGlobeLine3}
              tooltip={profile?.heroGlobeTooltip}
            />
            <CapabilitySelector
              activeMode={activeMode}
              onSelectMode={setActiveMode}
              customCapabilities={profile?.heroCapabilities}
            />
            <div className="cinematic-watermark" aria-hidden="true">
              <span>{profile?.heroWatermarkNumber || '01'}</span>
              <small>
                {watermarkLines.map((l, i) => (
                  <React.Fragment key={i}>
                    {l}{i < watermarkLines.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </small>
            </div>
          </aside>
        </div>
      </div>
      <div className="cinematic-ground" aria-hidden="true">
        <svg viewBox="0 0 1536 100" preserveAspectRatio="none"><path d="M0 100V92l75-8 48 9 62-15 120 13 89-23 74 12 86-27 48 17 49-34 41 15 33-5 44 20 61-11 63 27 64-12 69 16 69-27 72 17 76-7 81 17 71-7 76 12V100Z" /></svg>
      </div>
      <dialog ref={introDialog} className="cinematic-dialog" onClick={event => { if (event.target === event.currentTarget) introDialog.current.close(); }}>
        <button className="intro-close" aria-label="Close intro" onClick={() => introDialog.current.close()}><X size={22} /></button>
        <span className="intro-label">Meet the developer</span><h2>{name}</h2>
        {profile?.introVideo ? <video src={profile.introVideo} controls autoPlay playsInline /> : <><p>{profile?.bio || 'Motivated Software Engineering graduate candidate skilled in React.js, Node.js, Java, Python, and SQL, engineering high-performance applications.'}</p><a className="reference-primary" href="#projects" onClick={() => introDialog.current.close()}>Explore Selected Works <ArrowUpRight size={19} /></a></>}
      </dialog>
    </section>
  );
}