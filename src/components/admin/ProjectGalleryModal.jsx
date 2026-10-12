import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  Trash2,
  Star,
  ChevronUp,
  ChevronDown,
  Save,
  Check,
  Image as ImageIcon,
  ExternalLink,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export default function ProjectGalleryModal({
  project,
  token,
  onClose,
  onProjectUpdated,
  showToast
}) {
  const [gallery, setGallery] = useState(() => Array.isArray(project.gallery) ? project.gallery : []);
  const [uploading, setUploading] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [itemForms, setItemForms] = useState(() => {
    const map = {};
    (project.gallery || []).forEach(item => {
      map[item.id] = { caption: item.caption || '', description: item.description || '' };
    });
    return map;
  });

  // 1. Upload screenshot
  const handleUploadScreenshot = async (file) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      showToast?.('File size exceeds 10MB limit', 'error');
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('tag', 'project_gallery');
    fd.append('caption', file.name.replace(/\.[^/.]+$/, ''));

    try {
      const res = await fetch(`/api/admin/projects/${project.id}/gallery`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload screenshot');

      const updatedGallery = data.project?.gallery || [...gallery, data.item];
      setGallery(updatedGallery);
      setItemForms(prev => ({
        ...prev,
        [data.item.id]: { caption: data.item.caption || '', description: '' }
      }));
      onProjectUpdated?.(data.project);
      showToast?.('Screenshot added to project gallery');
    } catch (err) {
      showToast?.(err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  // 2. Delete screenshot
  const handleDeleteScreenshot = async (imageId) => {
    if (!window.confirm('Delete this screenshot permanently from Cloudinary and portfolio?')) return;

    try {
      const res = await fetch(`/api/admin/projects/${project.id}/gallery/${imageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Delete failed');
      }

      const updated = gallery.filter(item => item.id !== imageId && item.public_id !== imageId);
      setGallery(updated);
      showToast?.('Screenshot removed from gallery');
      onProjectUpdated?.({ ...project, gallery: updated });
    } catch (err) {
      showToast?.(err.message, 'error');
    }
  };

  // 3. Set Cover Image
  const handleSetCover = async (imageId) => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}/gallery`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ setCoverId: imageId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to set cover image');

      setGallery(data.project.gallery);
      onProjectUpdated?.(data.project);
      showToast?.('Cover image updated');
    } catch (err) {
      showToast?.(err.message, 'error');
    }
  };

  // 4. Save Caption & Description
  const handleSaveMetadata = async (item) => {
    const form = itemForms[item.id] || {};
    try {
      const res = await fetch(`/api/admin/projects/${project.id}/gallery`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          updateItem: {
            id: item.id,
            caption: form.caption,
            description: form.description
          }
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');

      setGallery(data.project.gallery);
      onProjectUpdated?.(data.project);
      showToast?.('Screenshot metadata saved');
    } catch (err) {
      showToast?.(err.message, 'error');
    }
  };

  // 5. Reorder screenshots
  const handleMove = async (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= gallery.length) return;

    const reordered = [...gallery];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);

    // Update order indices
    const updated = reordered.map((item, idx) => ({ ...item, order: idx }));
    setGallery(updated);

    try {
      const res = await fetch(`/api/admin/projects/${project.id}/gallery`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ items: updated })
      });

      const data = await res.json();
      if (res.ok) {
        onProjectUpdated?.(data.project);
      }
    } catch (err) {
      console.warn('Reorder patch error:', err);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        background: 'rgba(2, 5, 11, 0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          background: 'linear-gradient(155deg, #0e172a 0%, #060911 100%)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="badge-gold">CLOUDINARY GALLERY</span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                PROJECT: {project.id}
              </span>
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.6rem', color: '#ffffff', fontWeight: 700, margin: 0 }}>
              {project.title} &bull; Screenshot Suite ({gallery.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Gallery Modal"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Upload Zone */}
        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            border: '1.5px dashed rgba(212, 175, 55, 0.4)',
            background: 'rgba(10, 16, 28, 0.75)',
            textAlign: 'center',
            marginBottom: '28px'
          }}
        >
          <UploadCloud size={32} color="#d4af37" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontSize: '1rem', color: '#ffffff', margin: '0 0 6px', fontWeight: 600 }}>
            Upload Project Screenshot to Cloudinary
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '0 0 16px' }}>
            Supports PNG, JPEG, WEBP, or SVG. Screenshots will be served through Cloudinary CDN on live portfolio lightbox.
          </p>

          <label
            className="btn-gold"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              fontSize: '0.86rem',
              cursor: uploading ? 'wait' : 'pointer',
              opacity: uploading ? 0.75 : 1
            }}
          >
            {uploading ? (
              <>
                <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Uploading to Cloudinary...</span>
              </>
            ) : (
              <>
                <UploadCloud size={15} />
                <span>Select Screenshot File</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleUploadScreenshot(file);
                  e.target.value = '';
                }
              }}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* Gallery Items List */}
        {gallery.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            <ImageIcon size={40} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <p style={{ fontSize: '0.9rem', margin: 0 }}>No screenshots in gallery yet. Upload above to populate.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {gallery.map((item, idx) => {
              const form = itemForms[item.id] || { caption: item.caption || '', description: item.description || '' };
              const isCover = Boolean(item.isCover || project.image === item.url);

              return (
                <div
                  key={item.id || idx}
                  className="glass-panel"
                  style={{
                    padding: '18px',
                    borderRadius: '16px',
                    border: isCover ? '1.5px solid #d4af37' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isCover ? 'rgba(212, 175, 55, 0.08)' : 'rgba(10, 16, 28, 0.8)',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  {/* Reorder Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                      onClick={() => handleMove(idx, -1)}
                      disabled={idx === 0}
                      title="Move Up"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        padding: '4px',
                        color: idx === 0 ? '#475569' : '#cbd5e1',
                        cursor: idx === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 1)}
                      disabled={idx === gallery.length - 1}
                      title="Move Down"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        padding: '4px',
                        color: idx === gallery.length - 1 ? '#475569' : '#cbd5e1',
                        cursor: idx === gallery.length - 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  {/* Thumbnail */}
                  <div style={{ position: 'relative', width: '110px', height: '75px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                    <img
                      src={item.url}
                      alt={item.caption || 'Screenshot'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {isCover && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '4px',
                          left: '4px',
                          background: '#d4af37',
                          color: '#060911',
                          padding: '2px 5px',
                          borderRadius: '4px',
                          fontSize: '0.62rem',
                          fontWeight: 700
                        }}
                      >
                        COVER
                      </div>
                    )}
                  </div>

                  {/* Inputs for Caption & Description */}
                  <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Screenshot caption (e.g., Dashboard Overview HUD)"
                      value={form.caption}
                      onChange={(e) => setItemForms({
                        ...itemForms,
                        [item.id]: { ...form, caption: e.target.value }
                      })}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(6, 9, 16, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        fontSize: '0.84rem'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Short description / deliverable detail"
                      value={form.description}
                      onChange={(e) => setItemForms({
                        ...itemForms,
                        [item.id]: { ...form, description: e.target.value }
                      })}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'rgba(6, 9, 16, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#94a3b8',
                        fontSize: '0.8rem'
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleSaveMetadata(item)}
                      title="Save Caption & Description"
                      style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: '#34d399',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Save size={14} />
                      <span>Save</span>
                    </button>

                    {!isCover && (
                      <button
                        onClick={() => handleSetCover(item.id)}
                        title="Set as Project Cover Image"
                        style={{
                          background: 'rgba(212, 175, 55, 0.15)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          color: '#f3d078',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Star size={14} />
                        <span>Set Cover</span>
                      </button>
                    )}

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      title="View High-Res"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '8px',
                        color: '#cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      <ExternalLink size={14} />
                    </a>

                    <button
                      onClick={() => handleDeleteScreenshot(item.id)}
                      title="Delete Screenshot"
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '8px',
                        color: '#f87171',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
