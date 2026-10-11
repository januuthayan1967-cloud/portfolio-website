import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * PortraitGallery: Recreates the thumbnail gallery situated directly below
 * the main architectural portrait chassis from the reference image.
 * Features:
 * - Previous Arrow -> Thumbnail Gallery -> Next Arrow
 * - Uses authentic images: image2.jpeg (portrait), project-analytics.jpg (workstation), image1.jpeg (studio)
 * - Initial active image is image2.jpeg
 * - Active thumbnail highlighted with illuminated gold border & bloom
 * - Fully keyboard accessible
 */
export default function PortraitGallery({
  images = [
    { id: 'img-main', src: '/hero/image2.jpeg', alt: 'Uthayagunasingam Vanojan — Solutions Architect' },
    { id: 'img-lab', src: '/hero/project-analytics.jpg', alt: 'Analytics Systems & Workstation' },
    { id: 'img-studio', src: '/hero/image1.jpeg', alt: 'Engineering Studio Setup' }
  ],
  activeImageSrc = '/hero/image2.jpeg',
  onSelectImage,
  style = {}
}) {
  const currentIndex = images.findIndex((img) => img.src === activeImageSrc);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const handlePrev = () => {
    const prevIndex = (safeIndex - 1 + images.length) % images.length;
    onSelectImage && onSelectImage(images[prevIndex].src);
  };

  const handleNext = () => {
    const nextIndex = (safeIndex + 1) % images.length;
    onSelectImage && onSelectImage(images[nextIndex].src);
  };

  return (
    <div
      className="portrait-gallery-container"
      role="region"
      aria-label="Portrait and Perspective Gallery"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginTop: '16px',
        zIndex: 25,
        userSelect: 'none',
        ...style
      }}
    >
      {/* Previous Arrow Button */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Perspective"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(11, 18, 30, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(217, 169, 104, 0.28)',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          outline: 'none'
        }}
        className="gallery-nav-btn"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Thumbnails Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        {images.map((img, idx) => {
          const isActive = idx === safeIndex;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => onSelectImage && onSelectImage(img.src)}
              aria-label={`Select Perspective ${idx + 1}`}
              aria-current={isActive ? 'true' : 'false'}
              style={{
                position: 'relative',
                width: '78px',
                height: '48px',
                borderRadius: '8px',
                overflow: 'hidden',
                padding: 0,
                border: isActive
                  ? '2px solid #F2C77C'
                  : '1px solid rgba(217, 169, 104, 0.22)',
                background: '#0B1018',
                boxShadow: isActive
                  ? '0 0 18px rgba(242, 199, 124, 0.6), 0 4px 12px rgba(0, 0, 0, 0.7)'
                  : '0 2px 8px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                opacity: isActive ? 1 : 0.65,
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                outline: 'none'
              }}
              className="gallery-thumb-btn"
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: img.src.includes('analytics')
                    ? 'center center'
                    : img.src.includes('image2')
                    ? 'center 15%'
                    : 'center 22%',
                  display: 'block'
                }}
              />

              {/* Active Golden Corner Ticks */}
              {isActive && (
                <>
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      left: '2px',
                      width: '4px',
                      height: '4px',
                      borderTop: '1.5px solid #FFFFFF',
                      borderLeft: '1.5px solid #FFFFFF'
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '4px',
                      height: '4px',
                      borderBottom: '1.5px solid #FFFFFF',
                      borderRight: '1.5px solid #FFFFFF'
                    }}
                  />
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Next Arrow Button */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Perspective"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'rgba(11, 18, 30, 0.82)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(217, 169, 104, 0.28)',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          outline: 'none'
        }}
        className="gallery-nav-btn"
      >
        <ChevronRight size={16} />
      </button>

      <style>{`
        .gallery-nav-btn:hover {
          border-color: var(--gold-light) !important;
          color: var(--gold-light) !important;
          background: rgba(20, 32, 52, 0.95) !important;
          transform: scale(1.08);
          box-shadow: 0 0 12px rgba(217, 169, 104, 0.3);
        }
        .gallery-thumb-btn:hover:not([aria-current="true"]) {
          opacity: 0.95 !important;
          border-color: rgba(217, 169, 104, 0.6) !important;
          transform: translateY(-2px) scale(1.02);
        }
        .gallery-thumb-btn:focus-visible,
        .gallery-nav-btn:focus-visible {
          box-shadow: 0 0 0 2px #F2C77C !important;
        }
      `}</style>
    </div>
  );
}
