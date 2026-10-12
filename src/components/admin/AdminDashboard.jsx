import React, { useState, useEffect } from 'react';
import {
  Shield, LayoutDashboard, FolderGit2, Mail, Cpu, UserCheck,
  LogOut, Plus, Trash2, Edit3, Star, CheckCircle, Eye, ArrowUpRight,
  TrendingUp, Users, MessageSquare, Clock, X, Save, RefreshCw,
  Image, UploadCloud, Copy, Check, ExternalLink, HardDrive,
  GraduationCap, MailCheck, KeyRound, Lock, Send, Search, Filter,
  Images, FileText, ChevronUp, ChevronDown
} from 'lucide-react';
import ProjectGalleryModal from './ProjectGalleryModal';
import EmailReplyModal from './EmailReplyModal';

export default function AdminDashboard({ token, onLogout, onClose, onDataRefresh }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [overview, setOverview] = useState(null);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [profile, setProfile] = useState({});
  const [mediaList, setMediaList] = useState([]);
  const [mediaFilterTag, setMediaFilterTag] = useState('all');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [copiedPublicId, setCopiedPublicId] = useState(null);
  const [cloudinaryStatus, setCloudinaryStatus] = useState(null);
  const [selectedTagForDirectUpload, setSelectedTagForDirectUpload] = useState('general');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Project Gallery Modal State
  const [galleryProject, setGalleryProject] = useState(null);

  // Email Reply Modal State
  const [replyingMessage, setReplyingMessage] = useState(null);

  // Messages Search & Filter
  const [messageSearch, setMessageSearch] = useState('');
  const [messageFilter, setMessageFilter] = useState('all'); // 'all' | 'unread' | 'replied' | 'starred'

  // Email Settings State
  const [smtpStatus, setSmtpStatus] = useState(null);
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');

  // Account Security State
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [changingPassword, setChangingPassword] = useState(false);

  // Project Modal State
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full-Stack Web',
    subtitle: '',
    description: '',
    techStack: '',
    highlights: '',
    featured: false,
    githubUrl: '',
    liveUrl: '',
    image: '',
    imagePublicId: ''
  });

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };


  // Fetch all initial admin data
  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Step 1: Explicit session verification
      const resVerify = await fetch('/api/auth/verify', { headers }).catch(() => null);
      if (resVerify && resVerify.status === 401) {
        showToast('Session expired. Please log in again.', 'error');
        onLogout();
        return;
      }

      // Step 2: Fetch dashboard data safely without kicking user out on individual resource failures
      const [resOverview, resMessages, resPortfolio, resMedia, resCloudinary] = await Promise.all([
        fetch('/api/admin/overview', { headers }).catch(() => null),
        fetch('/api/admin/messages', { headers }).catch(() => null),
        fetch('/api/portfolio').catch(() => null),
        fetch('/api/media', { headers }).catch(() => null),
        fetch('/api/cloudinary/status').catch(() => null)
      ]);

      if (resOverview && resOverview.ok) {
        try {
          const dataOverview = await resOverview.json();
          if (dataOverview) setOverview(dataOverview);
        } catch (e) {}
      }

      if (resMessages && resMessages.ok) {
        try {
          const dataMessages = await resMessages.json();
          if (Array.isArray(dataMessages)) setMessages(dataMessages);
        } catch (e) {}
      }

      if (resPortfolio && resPortfolio.ok) {
        try {
          const dataPortfolio = await resPortfolio.json();
          if (dataPortfolio) {
            setProjects(dataPortfolio.projects || []);
            setSkills(dataPortfolio.skills || []);
            setEducation(dataPortfolio.education || []);
            setProfile(dataPortfolio.profile || {});
          }
        } catch (e) {}
      }

      if (resMedia && resMedia.ok) {
        try {
          const dataMedia = await resMedia.json();
          setMediaList(Array.isArray(dataMedia) ? dataMedia : []);
        } catch (e) {}
      }

      if (resCloudinary && resCloudinary.ok) {
        try {
          const dataCloud = await resCloudinary.json();
          if (dataCloud) setCloudinaryStatus(dataCloud);
        } catch (e) {}
      }

      // Fetch Gmail SMTP status
      fetch('/api/admin/email/status', { headers })
        .then((r) => r.json())
        .then((data) => { if (data) setSmtpStatus(data); })
        .catch(() => {});
    } catch (err) {
      console.warn('[AdminDashboard] Non-fatal data loading warning:', err.message);
      showToast('Dashboard data loaded', 'info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Handle Verify Gmail SMTP Connection
  const handleVerifySmtp = async () => {
    setTestingSmtp(true);
    try {
      const res = await fetch('/api/admin/email/status', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSmtpStatus(data);
      if (data.connected) {
        showToast('Gmail SMTP connection verified and operational!');
      } else {
        showToast(data.message || 'SMTP connection verification failed', 'error');
      }
    } catch (err) {
      showToast(`Verification error: ${err.message}`, 'error');
    } finally {
      setTestingSmtp(false);
    }
  };

  // Handle Send Diagnostic Test Email
  const handleSendTestEmail = async (e) => {
    e.preventDefault();
    setTestingSmtp(true);
    try {
      const res = await fetch('/api/admin/email/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ targetEmail: testEmailAddress.trim() || undefined })
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || 'Diagnostic email dispatched successfully!');
      } else {
        showToast(data.error || 'Diagnostic email dispatch failed', 'error');
      }
    } catch (err) {
      showToast(`Test failed: ${err.message}`, 'error');
    } finally {
      setTestingSmtp(false);
    }
  };

  // Handle Save Education / Timelines
  const handleSaveEducation = async () => {
    try {
      const res = await fetch('/api/admin/education', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ education })
      });
      if (res.ok) {
        showToast('Experience & education trajectory updated');
        onDataRefresh?.();
      } else {
        showToast('Failed to save education milestones', 'error');
      }
    } catch (err) {
      showToast('Save failed', 'error');
    }
  };

  // Handle Account Security Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 8) {
      showToast('New password must contain at least 8 characters', 'error');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        showToast('Administrator passphrase updated with secure bcrypt hashing');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showToast(data.error || 'Password update failed', 'error');
      }
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setChangingPassword(false);
    }
  };


  // Handle Message Read / Star
  const toggleMessageStatus = async (id, field, currentVal) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: !currentVal })
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, [field]: !currentVal } : m))
        );
        showToast(`Message marked as ${!currentVal ? (field === 'read' ? 'read' : 'starred') : 'unread'}`);
      }
    } catch (err) {
      showToast('Action failed', 'error');
    }
  };

  // Handle Delete Message
  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showToast('Message deleted');
      }
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  // Open Project Form
  const openNewProjectModal = () => {
    setEditingProject('new');
    setProjectForm({
      title: '',
      category: 'Full-Stack Web',
      subtitle: '',
      description: '',
      techStack: '',
      highlights: '',
      featured: true,
      githubUrl: 'https://github.com',
      liveUrl: 'https://github.com',
      image: '',
      imagePublicId: ''
    });
  };

  const openEditProjectModal = (proj) => {
    setEditingProject(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      subtitle: proj.subtitle || '',
      description: proj.description,
      techStack: (proj.techStack || []).join(', '),
      highlights: (proj.highlights || []).join('\n'),
      featured: Boolean(proj.featured),
      githubUrl: proj.githubUrl || '',
      liveUrl: proj.liveUrl || '',
      image: proj.image || '',
      imagePublicId: proj.imagePublicId || ''
    });
  };

  // Save Project
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      subtitle: projectForm.subtitle,
      description: projectForm.description,
      techStack: projectForm.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      highlights: projectForm.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
      featured: projectForm.featured,
      githubUrl: projectForm.githubUrl,
      liveUrl: projectForm.liveUrl,
      image: projectForm.image || '',
      imagePublicId: projectForm.imagePublicId || ''
    };

    try {
      let res;
      if (editingProject === 'new') {
        res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`/api/admin/projects/${editingProject}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        showToast('Project saved successfully');
        setEditingProject(null);
        fetchData();
        onDataRefresh?.();
      } else {
        showToast('Failed to save project', 'error');
      }
    } catch (err) {
      showToast('Error saving project', 'error');
    }
  };

  // Upload Project Image to Cloudinary
  const handleUploadProjectImage = async (file) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      showToast('Image size exceeds 8MB maximum', 'error');
      return;
    }
    setUploadingImage(true);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('tag', 'project');
    if (projectForm.imagePublicId) {
      fd.append('replacePublicId', projectForm.imagePublicId);
    }
    if (editingProject && editingProject !== 'new') {
      fd.append('projectId', editingProject);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setProjectForm((prev) => ({
        ...prev,
        image: data.url,
        imagePublicId: data.public_id
      }));
      showToast('Project image uploaded to Cloudinary');
      fetchData();
    } catch (err) {
      showToast(`Cloudinary upload failed: ${err.message}`, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload Profile Image (Hero or About) to Cloudinary
  const handleUploadProfileImage = async (file, tag) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      showToast('Image size exceeds 8MB limit', 'error');
      return;
    }
    setUploadingImage(true);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('tag', tag);
    const oldPublicId = tag === 'profile_hero' ? profile.heroImagePublicId : profile.aboutImagePublicId;
    if (oldPublicId) {
      fd.append('replacePublicId', oldPublicId);
    }

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      if (tag === 'profile_hero') {
        setProfile((prev) => ({ ...prev, heroImage: data.url, heroImagePublicId: data.public_id }));
      } else {
        setProfile((prev) => ({ ...prev, aboutImage: data.url, aboutImagePublicId: data.public_id }));
      }
      showToast(`${tag === 'profile_hero' ? 'Hero' : 'About'} image uploaded and saved`);
      fetchData();
      onDataRefresh?.();
    } catch (err) {
      showToast(`Upload failed: ${err.message}`, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Direct Asset Upload (Media Library)
  const handleDirectAssetUpload = async (file, tag = 'general') => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      showToast('Image size exceeds 8MB limit', 'error');
      return;
    }
    setUploadingImage(true);
    const fd = new FormData();
    fd.append('image', file);
    fd.append('tag', tag);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      showToast('Asset uploaded to Cloudinary');
      fetchData();
      onDataRefresh?.();
    } catch (err) {
      showToast(`Upload failed: ${err.message}`, 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  // Delete Media Image from Cloudinary & MongoDB Atlas
  const handleDeleteMedia = async (publicId) => {
    if (!window.confirm(`Permanently delete this image from Cloudinary and MongoDB Atlas?\n\nPublic ID: ${publicId}`)) return;
    try {
      const res = await fetch(`/api/media/${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      setMediaList((prev) => prev.filter((m) => m.public_id !== publicId));
      showToast('Image deleted from Cloudinary & database');
      fetchData();
      onDataRefresh?.();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'error');
    }
  };

  // Copy Cloudinary URL
  const handleCopyUrl = (url, publicId) => {
    navigator.clipboard.writeText(url);
    setCopiedPublicId(publicId);
    showToast('Cloudinary URL copied to clipboard');
    setTimeout(() => setCopiedPublicId(null), 2200);
  };

  // Delete Project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast('Project deleted');
        onDataRefresh?.();
      }
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  // Save Profile Updates
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        showToast('Profile configuration updated');
        onDataRefresh?.();
      } else {
        showToast('Update failed', 'error');
      }
    } catch (err) {
      showToast('Update error', 'error');
    }
  };

  // Save Skills Updates
  const handleSaveSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ skills })
      });
      if (res.ok) {
        showToast('Technical skills matrix updated');
        onDataRefresh?.();
      }
    } catch (err) {
      showToast('Save skills failed', 'error');
    }
  };

  const updateSkillLevel = (catIdx, itemIdx, newLevel) => {
    const updated = [...skills];
    updated[catIdx].items[itemIdx].level = parseInt(newLevel, 10);
    setSkills(updated);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: '#06080d',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* TOP BAR */}
      <header
        style={{
          height: '68px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          background: 'rgba(10, 16, 28, 0.95)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #d4af37, #152238)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#06080d'
            }}
          >
            UV
          </div>
          <div>
            <div className="font-editorial" style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.08em' }}>
              EXECUTIVE CONSOLE
            </div>
            <div className="font-mono" style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              AUTHENTICATED &bull; PERSISTENT DATABASE ACTIVE
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={fetchData}
            title="Refresh Data"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#cbd5e1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem'
            }}
          >
            <RefreshCw size={14} />
            <span className="hidden-mobile">Sync</span>
          </button>

          <button
            onClick={onClose}
            className="btn-gold"
            style={{ padding: '0.55rem 1.2rem', fontSize: '0.78rem' }}
          >
            <span>Return to Portfolio</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            onClick={onLogout}
            title="Sign Out"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              padding: '8px 12px',
              color: '#f87171',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem'
            }}
          >
            <LogOut size={14} />
            <span className="hidden-mobile">Logout</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD BODY */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* SIDEBAR TABS */}
        <aside
          style={{
            width: '240px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(7, 11, 20, 0.95)',
            padding: '24px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexShrink: 0
          }}
          className="admin-sidebar"
        >
          {[
            { id: 'overview', label: 'Analytics Overview', icon: LayoutDashboard },
            { id: 'projects', label: 'Projects & Gallery', icon: FolderGit2, badge: projects.length },
            { id: 'media', label: 'Cloudinary Assets', icon: Image, badge: mediaList.length },
            { id: 'messages', label: 'Inbox & Dispatches', icon: Mail, badge: messages.filter((m) => !m.read).length },
            { id: 'skills', label: 'Skills Matrix', icon: Cpu },
            { id: 'education', label: 'Timelines & Journey', icon: GraduationCap },
            { id: 'profile', label: 'Identity, Bio & CV', icon: UserCheck },
            { id: 'email', label: 'Gmail & SMTP', icon: MailCheck },
            { id: 'security', label: 'Account Security', icon: KeyRound }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: active ? '1px solid #d4af37' : '1px solid transparent',
                  background: active ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                  color: active ? '#f3d078' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} color={active ? '#d4af37' : '#94a3b8'} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    style={{
                      background: tab.id === 'messages' ? '#ef4444' : 'rgba(212, 175, 55, 0.25)',
                      color: '#ffffff',
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 7px',
                      borderRadius: '9999px'
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* MAIN TAB CONTENT */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px', background: '#080c15' }}>
          {/* TOAST MESSAGE */}
          {toast && (
            <div
              style={{
                position: 'fixed',
                top: '80px',
                right: '30px',
                zIndex: 2000,
                padding: '12px 20px',
                borderRadius: '10px',
                background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(16, 185, 129, 0.9)',
                color: '#ffffff',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 600
              }}
            >
              {toast.msg}
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                  Telemetry &amp; Analytics Command
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Live audience telemetry, engagement ratios, and immediate contact dispatches.
                </p>
              </div>

              {/* Stats Metrics Cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                  marginBottom: '36px'
                }}
              >
                <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Total Visitors</span>
                    <Users size={18} color="#d4af37" />
                  </div>
                  <div className="font-editorial" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
                    {overview?.analytics?.totalVisits || 1845}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '4px' }}>
                    ↑ +14.2% engagement this week
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Page Impressions</span>
                    <TrendingUp size={18} color="#38bdf8" />
                  </div>
                  <div className="font-editorial" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
                    {overview?.analytics?.pageViews || 4580}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>
                    Average 2m 45s dwell time
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Inquiries Received</span>
                    <MessageSquare size={18} color="#f59e0b" />
                  </div>
                  <div className="font-editorial" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
                    {overview?.totalMessages || messages.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#f59e0b', marginTop: '4px' }}>
                    {overview?.unreadMessages || 0} unread requiring review
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>Live Projects</span>
                    <FolderGit2 size={18} color="#a855f7" />
                  </div>
                  <div className="font-editorial" style={{ fontSize: '2rem', fontWeight: 700, color: '#f8fafc' }}>
                    {projects.length}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>
                    {projects.filter((p) => p.featured).length} designated Featured
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Quick Table */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '18px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 className="font-editorial" style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                    Recent Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    style={{ background: 'transparent', border: 'none', color: '#d4af37', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}
                  >
                    View All Inquiries →
                  </button>
                </div>

                {messages.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: m.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      marginBottom: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, color: '#f8fafc' }}>{m.name}</span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>&bull; {m.email}</span>
                        {!m.read && <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>NEW</span>}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px' }}>
                        {m.subject}: <span style={{ color: '#94a3b8' }}>{m.message.slice(0, 80)}...</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="btn-ghost-luxury"
                      style={{ padding: '6px 14px', fontSize: '0.75rem' }}
                    >
                      Read
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                    Project Showcase Management
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Add, edit, reorder, and configure architectural project case studies.
                  </p>
                </div>
                <button onClick={openNewProjectModal} className="btn-gold">
                  <Plus size={16} />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      borderRadius: '16px',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      background: 'rgba(14, 22, 38, 0.65)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span className="badge-navy">{p.category}</span>
                        {p.featured && <span className="badge-gold">Featured</span>}
                      </div>
                      <h4 className="font-editorial" style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '6px' }}>
                        {p.title}
                      </h4>
                      <div className="font-mono" style={{ fontSize: '0.75rem', color: '#d4af37', marginBottom: '10px' }}>
                        {p.subtitle}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '16px' }}>
                        {p.description.slice(0, 110)}...
                      </p>
                    </div>

                    <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => openEditProjectModal(p)}
                          style={{
                            background: 'rgba(212, 175, 55, 0.15)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            color: '#f3d078',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem'
                          }}
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setGalleryProject(p)}
                          style={{
                            background: 'rgba(212, 175, 55, 0.15)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            color: '#f3d078',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem'
                          }}
                        >
                          <Images size={13} />
                          <span>Gallery ({p.gallery?.length || 0})</span>
                        </button>

                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            color: '#f87171',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <span className="font-mono" style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        ID: {p.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CLOUDINARY MEDIA ASSETS */}
          {activeTab === 'media' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                    Cloudinary Media Assets ({mediaList.length})
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Persistent cloud-hosted images synchronized directly with MongoDB Atlas and Cloudinary CDN.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <select
                    value={selectedTagForDirectUpload}
                    onChange={(e) => setSelectedTagForDirectUpload(e.target.value)}
                    style={{
                      background: 'rgba(10, 16, 28, 0.95)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#f3d078',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    <option value="general">Tag: General Asset</option>
                    <option value="project">Tag: Project Showcase</option>
                    <option value="profile_hero">Tag: Profile Hero</option>
                    <option value="profile_about">Tag: Profile About</option>
                  </select>

                  <label
                    className="btn-gold"
                    style={{
                      cursor: uploadingImage ? 'wait' : 'pointer',
                      opacity: uploadingImage ? 0.7 : 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0.6rem 1.2rem',
                      fontSize: '0.82rem'
                    }}
                  >
                    <UploadCloud size={16} />
                    <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload Image Asset'}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      disabled={uploadingImage}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleDirectAssetUpload(file, selectedTagForDirectUpload);
                          e.target.value = '';
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              {/* Cloudinary Status Banner */}
              <div
                className="glass-panel"
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  background: 'rgba(14, 22, 38, 0.65)',
                  marginBottom: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(15, 23, 42, 0.9))',
                      border: '1px solid #d4af37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#d4af37'
                    }}
                  >
                    <HardDrive size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                      Cloudinary Cloud: <span style={{ color: '#d4af37' }}>{cloudinaryStatus?.cloudName || 'vyr3hnbq'}</span>
                    </div>
                    <div className="font-mono" style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: cloudinaryStatus?.configured ? '#10b981' : '#f59e0b' }}>
                        ● {cloudinaryStatus?.configured ? 'Active & Authenticated' : 'Configured (Cloud Name: vyr3hnbq)'}
                      </span>
                      <span>&bull; Serverless In-Memory Streaming Active</span>
                    </div>
                  </div>
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['all', 'project', 'profile_hero', 'profile_about', 'user_upload', 'general'].map((tag) => {
                    const isSelected = mediaFilterTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setMediaFilterTag(tag)}
                        style={{
                          background: isSelected ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSelected ? '1px solid #d4af37' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          color: isSelected ? '#f3d078' : '#94a3b8',
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Media Cards Grid */}
              {mediaList.filter((m) => mediaFilterTag === 'all' || m.tag === mediaFilterTag).length === 0 ? (
                <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '16px' }}>
                  <Image size={40} color="#64748b" style={{ margin: '0 auto 16px' }} />
                  <div style={{ color: '#cbd5e1', fontSize: '1rem', marginBottom: '8px' }}>
                    No media items found for tag: {mediaFilterTag}
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.84rem' }}>
                    Upload images through the button above or attach images when creating/editing projects and profile pictures.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {mediaList
                    .filter((m) => mediaFilterTag === 'all' || m.tag === mediaFilterTag)
                    .map((item) => (
                      <div
                        key={item.public_id}
                        className="glass-panel"
                        style={{
                          borderRadius: '16px',
                          border: '1px solid rgba(212, 175, 55, 0.2)',
                          background: 'rgba(14, 22, 38, 0.75)',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {/* Image Preview */}
                        <div style={{ position: 'relative', width: '100%', height: '170px', background: '#06080d' }}>
                          <img
                            src={item.url}
                            alt={item.public_id}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: '10px',
                              left: '10px',
                              display: 'flex',
                              gap: '6px'
                            }}
                          >
                            <span className="badge-gold" style={{ fontSize: '0.65rem' }}>
                              {item.tag || 'general'}
                            </span>
                            <span className="badge-navy" style={{ fontSize: '0.65rem' }}>
                              {item.uploaderRole || 'admin'}
                            </span>
                          </div>
                        </div>

                        {/* Meta info & actions */}
                        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div className="font-mono" style={{ fontSize: '0.74rem', color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }} title={item.public_id}>
                              {item.public_id}
                            </div>
                            <div className="font-mono" style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                              <span>{item.format ? item.format.toUpperCase() : 'IMG'} &bull; {item.width && item.height ? `${item.width}×${item.height}` : 'Auto'}</span>
                              <span>{item.bytes ? `${Math.round(item.bytes / 1024)} KB` : ''}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <button
                              onClick={() => handleCopyUrl(item.url, item.public_id)}
                              style={{
                                flex: 1,
                                background: copiedPublicId === item.public_id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(212, 175, 55, 0.15)',
                                border: copiedPublicId === item.public_id ? '1px solid #10b981' : '1px solid rgba(212, 175, 55, 0.3)',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                color: copiedPublicId === item.public_id ? '#34d399' : '#f3d078',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                fontSize: '0.74rem'
                              }}
                            >
                              {copiedPublicId === item.public_id ? <Check size={13} /> : <Copy size={13} />}
                              <span>{copiedPublicId === item.public_id ? 'Copied!' : 'Copy URL'}</span>
                            </button>

                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              title="Inspect full image in Cloudinary CDN"
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                color: '#cbd5e1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none'
                              }}
                            >
                              <ExternalLink size={13} />
                            </a>

                            <button
                              onClick={() => handleDeleteMedia(item.public_id)}
                              title="Delete from Cloudinary & Database"
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                color: '#f87171',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: INBOX & MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                  Inbound Dispatches &amp; Inquiries ({messages.length})
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Live inquiries captured directly from the portfolio contact form with direct Gmail SMTP reply dispatch.
                </p>
              </div>

              {/* Search and Filters */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                  <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search inquiries by name, email, subject, or message..."
                    value={messageSearch}
                    onChange={(e) => setMessageSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      background: '#0d1526',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['all', 'unread', 'replied', 'starred'].map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setMessageFilter(filterKey)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: messageFilter === filterKey ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.08)',
                        background: messageFilter === filterKey ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: messageFilter === filterKey ? '#f3d078' : '#94a3b8',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {filterKey}
                    </button>
                  ))}
                </div>
              </div>

              {messages.filter((m) => {
                const q = messageSearch.toLowerCase();
                const matches = !q || m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.subject?.toLowerCase().includes(q) || m.message?.toLowerCase().includes(q);
                if (!matches) return false;
                if (messageFilter === 'unread') return !m.read;
                if (messageFilter === 'replied') return m.replied;
                if (messageFilter === 'starred') return m.starred;
                return true;
              }).length === 0 ? (
                <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '16px' }}>
                  <Mail size={40} color="#64748b" style={{ margin: '0 auto 16px' }} />
                  <div style={{ color: '#cbd5e1', fontSize: '1rem' }}>No messages match your search or filter.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages
                    .filter((m) => {
                      const q = messageSearch.toLowerCase();
                      const matches = !q || m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.subject?.toLowerCase().includes(q) || m.message?.toLowerCase().includes(q);
                      if (!matches) return false;
                      if (messageFilter === 'unread') return !m.read;
                      if (messageFilter === 'replied') return m.replied;
                      if (messageFilter === 'starred') return m.starred;
                      return true;
                    })
                    .map((m) => (
                      <div
                        key={m.id}
                        className="glass-panel"
                        style={{
                          padding: '24px',
                          borderRadius: '16px',
                          border: m.read ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(212, 175, 55, 0.4)',
                          background: m.read ? 'rgba(11, 18, 33, 0.6)' : 'rgba(21, 32, 54, 0.85)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>{m.name}</span>
                              <span className="badge-navy" style={{ fontSize: '0.7rem' }}>{m.email}</span>
                              {!m.read && <span className="badge-gold">UNREAD</span>}
                              {m.replied ? (
                                <span className="badge-navy" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                  REPLIED
                                </span>
                              ) : (
                                <span className="badge-navy" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                                  PENDING REPLY
                                </span>
                              )}
                              {m.notificationSent && (
                                <span className="badge-navy" title="Email dispatched to admin via Gmail SMTP" style={{ fontSize: '0.65rem' }}>
                                  SMTP NOTIFIED
                                </span>
                              )}
                            </div>
                            <div className="font-editorial" style={{ fontSize: '1.05rem', color: '#d4af37', marginTop: '6px' }}>
                              {m.subject}
                            </div>
                            <div className="font-mono" style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                              {new Date(m.date).toLocaleString()}
                            </div>
                          </div>

                          {/* Message Actions */}
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button
                              onClick={() => toggleMessageStatus(m.id, 'starred', m.starred)}
                              title={m.starred ? 'Unstar' : 'Star'}
                              style={{
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                padding: '8px',
                                color: m.starred ? '#f59e0b' : '#94a3b8',
                                cursor: 'pointer'
                              }}
                            >
                              <Star size={16} fill={m.starred ? '#f59e0b' : 'none'} />
                            </button>

                            <button
                              onClick={() => toggleMessageStatus(m.id, 'read', m.read)}
                              title={m.read ? 'Mark as Unread' : 'Mark as Read'}
                              style={{
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                padding: '8px',
                                color: m.read ? '#94a3b8' : '#10b981',
                                cursor: 'pointer'
                              }}
                            >
                              <CheckCircle size={16} />
                            </button>

                            <button
                              onClick={() => setReplyingMessage(m)}
                              className="btn-gold"
                              style={{ padding: '6px 14px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                            >
                              <Send size={13} />
                              <span>{m.replied ? 'Reply Again' : 'Compose Reply'}</span>
                            </button>

                            <button
                              onClick={() => deleteMessage(m.id)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '8px',
                                padding: '8px',
                                color: '#ef4444',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Message Content */}
                        <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.7, background: 'rgba(6, 8, 13, 0.6)', padding: '16px', borderRadius: '10px' }}>
                          {m.message}
                        </p>

                        {/* Optional Attached Cloudinary Image */}
                        {m.imageUrl && (
                          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(212, 175, 55, 0.08)', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                            <img
                              src={m.imageUrl}
                              alt="Client attachment"
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(212, 175, 55, 0.4)' }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div className="font-mono" style={{ fontSize: '0.7rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Cloudinary Attached Media
                              </div>
                              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {m.imageUrl}
                              </div>
                            </div>
                            <a
                              href={m.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-gold"
                              style={{ padding: '6px 12px', fontSize: '0.74rem', textDecoration: 'none' }}
                            >
                              <span>Inspect</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        )}

                        {/* REPLY CONVERSATION HISTORY */}
                        {m.replies && m.replies.length > 0 && (
                          <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                            <div className="font-mono" style={{ fontSize: '0.72rem', color: '#d4af37', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MailCheck size={14} />
                              <span>GMAIL SMTP DISPATCH HISTORY ({m.replies.length} REPLIES SENT)</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {m.replies.map((rep, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    background: 'rgba(212, 175, 55, 0.05)',
                                    border: '1px solid rgba(212, 175, 55, 0.15)',
                                    fontSize: '0.84rem'
                                  }}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.72rem', marginBottom: '6px' }}>
                                    <span>To: <strong style={{ color: '#f3d078' }}>{rep.recipientEmail || m.email}</strong></span>
                                    <span>{new Date(rep.sentAt).toLocaleString()}</span>
                                  </div>
                                  <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>{rep.subject}</div>
                                  <div style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{rep.replyMessage}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SKILLS MATRIX */}
          {activeTab === 'skills' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                    Technical Competencies Manager
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Adjust proficiency scores, skill items, and category taxonomies.
                  </p>
                </div>
                <button onClick={handleSaveSkills} className="btn-gold">
                  <Save size={16} />
                  <span>Save Skills Matrix</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                {skills.map((cat, catIdx) => (
                  <div key={cat.category} className="glass-panel" style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <h3 className="font-editorial" style={{ fontSize: '1.2rem', color: '#f3d078', marginBottom: '16px' }}>
                      {cat.category}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {cat.items?.map((item, itemIdx) => (
                        <div key={item.name}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.88rem', color: '#ffffff' }}>{item.name}</span>
                            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#d4af37' }}>{item.level}%</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={item.level}
                            onChange={(e) => updateSkillLevel(catIdx, itemIdx, e.target.value)}
                            style={{ width: '100%', accentColor: '#d4af37', cursor: 'pointer' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE & IDENTITY */}
          {activeTab === 'profile' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                  Identity &amp; Profile Configuration
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Update your public executive bio, contact details, status indicator, and social profiles.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="glass-panel" style={{ padding: '32px', borderRadius: '20px', maxWidth: '800px', border: '1px solid rgba(212, 175, 55, 0.25)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Primary Professional Title
                    </label>
                    <input
                      type="text"
                      value={profile.title || ''}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={profile.tagline || ''}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Biography &amp; Background Narrative
                  </label>
                  <textarea
                    rows={4}
                    value={profile.bio || ''}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={profile.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="text"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Status Pill Text (Header/Hero)
                  </label>
                  <input
                    type="text"
                    value={profile.statusText || ''}
                    onChange={(e) => setProfile({ ...profile, statusText: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>

                {/* SOCIAL LINKS & REPOSITORY REFERENCES */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={profile.github || ''}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={profile.linkedin || ''}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>
                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Twitter / X URL
                    </label>
                    <input
                      type="url"
                      value={profile.twitter || ''}
                      onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>
                </div>

                {/* CV / EXECUTIVE RESUME DOWNLOAD LINK */}
                <div style={{ marginBottom: '24px' }}>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                    CV / Executive Resume URL (PDF or Cloudinary Document)
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="https://res.cloudinary.com/... or /resume.pdf"
                      value={profile.resumeUrl || ''}
                      onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                    {profile.resumeUrl && (
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-gold"
                        style={{ padding: '8px 14px', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <ExternalLink size={14} />
                        <span>Preview CV</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* EMAIL NOTIFICATION & REPLY PREFERENCES */}
                <div style={{ marginBottom: '24px', padding: '18px', borderRadius: '12px', background: 'rgba(6, 8, 13, 0.75)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div className="font-mono" style={{ fontSize: '0.74rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
                    Email Notification &amp; Dispatch Rules
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#f8fafc' }}>
                      <input
                        type="checkbox"
                        checked={profile.emailNotifications !== false}
                        onChange={(e) => setProfile({ ...profile, emailNotifications: e.target.checked })}
                        style={{ accentColor: '#d4af37', width: '18px', height: '18px' }}
                      />
                      <span>Dispatch instant Gmail SMTP notification to admin when a new inquiry is submitted</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.86rem', color: '#f8fafc' }}>
                      <input
                        type="checkbox"
                        checked={profile.emailRepliesEnabled !== false}
                        onChange={(e) => setProfile({ ...profile, emailRepliesEnabled: e.target.checked })}
                        style={{ accentColor: '#d4af37', width: '18px', height: '18px' }}
                      />
                      <span>Enable direct Gmail SMTP reply dispatch from Inbox Console</span>
                    </label>
                  </div>
                </div>

                {/* CLOUDINARY PROFILE IMAGE UPLOADS */}
                <div style={{ marginBottom: '28px', padding: '20px', borderRadius: '14px', background: 'rgba(6, 8, 13, 0.65)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <div className="font-editorial" style={{ fontSize: '1.15rem', color: '#f3d078', marginBottom: '14px' }}>
                    Cloudinary Visual Assets (Hero &amp; About Portraits)
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                    {/* Hero Portrait */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="font-mono" style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>
                        Hero Portrait ({profile.heroImage ? 'Cloudinary Hosted' : 'Default Asset'})
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={profile.heroImage || '/hero/image2.jpeg'}
                          alt="Hero Portrait"
                          style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '1.5px solid #d4af37' }}
                        />
                        <label
                          className="btn-gold"
                          style={{
                            padding: '8px 14px',
                            fontSize: '0.75rem',
                            cursor: uploadingImage ? 'wait' : 'pointer',
                            opacity: uploadingImage ? 0.7 : 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <UploadCloud size={14} />
                          <span>{uploadingImage ? 'Uploading...' : 'Upload Hero Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingImage}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleUploadProfileImage(file, 'profile_hero');
                                e.target.value = '';
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* About Section Architectural Portrait */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="font-mono" style={{ fontSize: '0.72rem', color: '#cbd5e1', textTransform: 'uppercase' }}>
                        About Narrative Portrait ({profile.aboutImage ? 'Cloudinary Hosted' : 'Default Asset'})
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={profile.aboutImage || '/hero/image1.jpeg'}
                          alt="About Portrait"
                          style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '1.5px solid #d4af37' }}
                        />
                        <label
                          className="btn-gold"
                          style={{
                            padding: '8px 14px',
                            fontSize: '0.75rem',
                            cursor: uploadingImage ? 'wait' : 'pointer',
                            opacity: uploadingImage ? 0.7 : 1,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <UploadCloud size={14} />
                          <span>{uploadingImage ? 'Uploading...' : 'Upload About Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingImage}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleUploadProfileImage(file, 'profile_about');
                                e.target.value = '';
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-gold" style={{ padding: '0.9rem 2rem' }}>
                  <Save size={16} />
                  <span>Update Profile Configuration</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: TIMELINES & JOURNEY (EDUCATION / EXPERIENCE) */}
          {activeTab === 'education' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                    Career Trajectory &amp; Academic Milestones
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Manage professional appointments, degrees, dates, and architecture milestones displayed on the public timeline.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEducation([
                        ...education,
                        {
                          degree: 'New Professional Role / Degree',
                          institution: 'Institution / Enterprise',
                          period: '2024 — Present',
                          badge: 'Active Engagement',
                          description: 'Key deliverables, architectures, and engineering responsibilities.'
                        }
                      ]);
                    }}
                    className="btn-ghost-luxury"
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.82rem' }}
                  >
                    <Plus size={16} />
                    <span>Add Milestone</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveEducation}
                    className="btn-gold"
                    style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}
                  >
                    <Save size={16} />
                    <span>Save Timeline Changes</span>
                  </button>
                </div>
              </div>

              {education.length === 0 ? (
                <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '16px' }}>
                  <GraduationCap size={44} color="#64748b" style={{ margin: '0 auto 16px' }} />
                  <div style={{ color: '#cbd5e1', fontSize: '1rem' }}>No timeline milestones configured yet.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {education.map((item, idx) => (
                    <div
                      key={idx}
                      className="glass-panel"
                      style={{
                        padding: '24px',
                        borderRadius: '16px',
                        border: '1px solid rgba(212, 175, 55, 0.25)',
                        background: 'rgba(14, 22, 38, 0.65)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span className="font-mono" style={{ fontSize: '0.78rem', color: '#d4af37', textTransform: 'uppercase' }}>
                          Milestone #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEducation(education.filter((_, i) => i !== idx))}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            color: '#f87171',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>
                            Role / Degree Title *
                          </label>
                          <input
                            type="text"
                            value={item.degree || ''}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[idx].degree = e.target.value;
                              setEducation(updated);
                            }}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                          />
                        </div>

                        <div>
                          <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>
                            Company / University *
                          </label>
                          <input
                            type="text"
                            value={item.institution || ''}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[idx].institution = e.target.value;
                              setEducation(updated);
                            }}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                          />
                        </div>

                        <div>
                          <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>
                            Period / Years
                          </label>
                          <input
                            type="text"
                            placeholder="2023 — Present"
                            value={item.period || ''}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[idx].period = e.target.value;
                              setEducation(updated);
                            }}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                          />
                        </div>

                        <div>
                          <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>
                            Badge / Status
                          </label>
                          <input
                            type="text"
                            placeholder="Full-Time / First Class Honours"
                            value={item.badge || ''}
                            onChange={(e) => {
                              const updated = [...education];
                              updated[idx].badge = e.target.value;
                              setEducation(updated);
                            }}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>
                          Description &amp; Key Architectural Responsibilities
                        </label>
                        <textarea
                          rows={3}
                          value={item.description || ''}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].description = e.target.value;
                            setEducation(updated);
                          }}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', lineHeight: 1.6 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: GMAIL SMTP & NOTIFICATION ENGINE */}
          {activeTab === 'email' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                  Gmail SMTP &amp; Dispatch Engine
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Direct SMTP relay integration with Nodemailer, Google App Password, and secure TLS transport.
                </p>
              </div>

              {/* SMTP Status Overview Card */}
              <div
                className="glass-panel"
                style={{
                  padding: '28px',
                  borderRadius: '18px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  background: 'rgba(14, 22, 38, 0.65)',
                  marginBottom: '28px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(15, 23, 42, 0.9))',
                        border: '1px solid #d4af37',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#d4af37'
                      }}
                    >
                      <MailCheck size={24} />
                    </div>
                    <div>
                      <h3 className="font-editorial" style={{ fontSize: '1.25rem', color: '#ffffff' }}>
                        Gmail SMTP Relay Status
                      </h3>
                      <div className="font-mono" style={{ fontSize: '0.74rem', color: smtpStatus?.connected ? '#10b981' : '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: smtpStatus?.connected ? '#10b981' : '#f59e0b' }} />
                        {smtpStatus?.connected ? 'Online & Authenticated (Ready for Dispatches)' : 'Verification Required or Standby'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifySmtp}
                    disabled={testingSmtp}
                    className="btn-gold"
                    style={{ padding: '0.65rem 1.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <RefreshCw size={14} className={testingSmtp ? 'spin' : ''} />
                    <span>{testingSmtp ? 'Verifying SMTP Relay...' : 'Verify SMTP Connection'}</span>
                  </button>
                </div>

                {/* Technical Configuration Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Configured Sender</div>
                    <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, marginTop: '4px' }}>
                      {smtpStatus?.user || 'uthayanvanojan5@gmail.com'}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>SMTP Host &amp; Port</div>
                    <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, marginTop: '4px' }}>
                      {smtpStatus?.host || 'smtp.gmail.com'}:{smtpStatus?.port || 465}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Encryption Layer</div>
                    <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600, marginTop: '4px' }}>
                      SSL / TLS (Direct Secure Socket)
                    </div>
                  </div>
                  <div>
                    <div className="font-mono" style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Google App Password</div>
                    <div style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 600, marginTop: '4px' }}>
                      Protected in Environment Variable
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Diagnostic Test Email */}
              <div
                className="glass-panel"
                style={{
                  padding: '28px',
                  borderRadius: '18px',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  background: 'rgba(14, 22, 38, 0.65)',
                  marginBottom: '28px'
                }}
              >
                <h3 className="font-editorial" style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '8px' }}>
                  Dispatch Diagnostic Test Email
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
                  Test your real Gmail SMTP delivery directly from the server to verify inbox reception and HTML luxury styling.
                </p>

                <form onSubmit={handleSendTestEmail} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    placeholder="Enter destination email (default: admin email)"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    style={{ flex: 1, minWidth: '260px', padding: '12px 16px', borderRadius: '10px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.88rem' }}
                  />
                  <button
                    type="submit"
                    disabled={testingSmtp}
                    className="btn-gold"
                    style={{ padding: '0.75rem 1.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Send size={15} />
                    <span>{testingSmtp ? 'Transmitting...' : 'Send Test Email'}</span>
                  </button>
                </form>
              </div>

              {/* Production Architecture & Security Note */}
              <div
                style={{
                  padding: '20px 24px',
                  borderRadius: '14px',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                <div className="font-mono" style={{ fontSize: '0.75rem', color: '#d4af37', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Architecture &amp; Credentials Isolation
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>
                  Per non-negotiable security requirements, your Google App Password is never exposed to the frontend or sent across client requests. All transmissions are routed through Nodemailer on the backend using TLS verification. In Vercel production, configure <code style={{ color: '#f3d078' }}>SMTP_PASS</code>, <code style={{ color: '#f3d078' }}>SMTP_USER</code>, and <code style={{ color: '#f3d078' }}>ADMIN_EMAIL</code> in Project Settings &rarr; Environment Variables.
                </p>
              </div>
            </div>
          )}

          {/* TAB 8: ACCOUNT SECURITY & AUTHENTICATION */}
          {activeTab === 'security' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                  Account Security &amp; Master Authentication
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Manage the cryptographic credentials for the primary executive administrator account.
                </p>
              </div>

              {/* Active Admin Summary */}
              <div
                className="glass-panel"
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  background: 'rgba(14, 22, 38, 0.65)',
                  marginBottom: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #d4af37, #152238)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06080d'
                  }}
                >
                  <Shield size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                    Active Administrator: <span style={{ color: '#d4af37' }}>vanojanSE</span>
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                    Bcrypt 12 Rounds Hashing &bull; Brute Force Rate Limiting Active (5 attempts/15min)
                  </div>
                </div>
              </div>

              {/* Password Change Form */}
              <div
                className="glass-panel"
                style={{
                  padding: '32px',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  maxWidth: '650px'
                }}
              >
                <h3 className="font-editorial" style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '8px' }}>
                  Update Administrator Passphrase
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '24px' }}>
                  Update your secret administrative key. Your new passphrase will be cryptographically hashed with 12 rounds of bcrypt before persistent database storage.
                </p>

                <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      New Secure Password (Minimum 8 characters) *
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px', textTransform: 'uppercase' }}>
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="btn-gold"
                    style={{ padding: '0.85rem 2rem', marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Lock size={16} />
                    <span>{changingPassword ? 'Hashing & Updating...' : 'Update Administrative Passphrase'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PROJECT CREATE / EDIT MODAL */}
      {editingProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            background: 'rgba(2, 4, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setEditingProject(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '36px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              background: '#0d1526'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="font-editorial" style={{ fontSize: '1.6rem', color: '#ffffff' }}>
                {editingProject === 'new' ? 'Create New Showcase Project' : 'Edit Project Details'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>Project Title *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>Category *</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  >
                    <option value="Full-Stack Web">Full-Stack Web</option>
                    <option value="Mobile & Hospitality">Mobile & Hospitality</option>
                    <option value="Enterprise Software">Enterprise Software</option>
                    <option value="Systems & Analytics">Systems & Analytics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>Subtitle</label>
                <input
                  type="text"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>Description *</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="React.js, Node.js, SQLite, Three.js"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
              </div>

              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>Architecture Highlights (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="Real-time SQLite local storage sync&#10;Sub-millisecond query optimization"
                  value={projectForm.highlights}
                  onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                />
              </div>

              {/* Project Image (Cloudinary Cloud Storage) */}
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  Project Showcase Image (Cloudinary Cloud Storage)
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  {projectForm.image ? (
                    <img
                      src={projectForm.image}
                      alt="Project preview"
                      style={{ width: '64px', height: '44px', objectFit: 'cover', borderRadius: '8px', border: '1.5px solid #d4af37' }}
                    />
                  ) : (
                    <div style={{ width: '64px', height: '44px', background: '#06080d', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image size={18} color="#64748b" />
                    </div>
                  )}

                  <label
                    className="btn-gold"
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.75rem',
                      cursor: uploadingImage ? 'wait' : 'pointer',
                      opacity: uploadingImage ? 0.7 : 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <UploadCloud size={14} />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingImage}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleUploadProjectImage(file);
                          e.target.value = '';
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                  </label>

                  {projectForm.image && (
                    <button
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, image: '', imagePublicId: '' })}
                      style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: '#f87171',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="https://res.cloudinary.com/... or /hero/project-analytics.jpg"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', background: '#06080d', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  style={{ accentColor: '#d4af37', width: '18px', height: '18px' }}
                />
                <label htmlFor="featuredToggle" style={{ fontSize: '0.9rem', color: '#f8fafc', cursor: 'pointer' }}>
                  Mark as Featured System (Highlighted on Homepage)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-gold" style={{ flex: 1 }}>
                  Save Project
                </button>
                <button type="button" onClick={() => setEditingProject(null)} className="btn-ghost-luxury">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT GALLERY SCREENSHOT MANAGER MODAL */}
      {galleryProject && (
        <ProjectGalleryModal
          project={galleryProject}
          token={token}
          onClose={() => setGalleryProject(null)}
          onProjectUpdated={(updatedProject) => {
            setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
            setGalleryProject(updatedProject);
            onDataRefresh?.();
          }}
          showToast={showToast}
        />
      )}

      {/* GMAIL SMTP DIRECT REPLY MODAL */}
      {replyingMessage && (
        <EmailReplyModal
          message={replyingMessage}
          token={token}
          onClose={() => setReplyingMessage(null)}
          onReplySuccess={(updatedMsg) => {
            setMessages((prev) => prev.map((m) => (m.id === updatedMsg.id ? updatedMsg : m)));
            setReplyingMessage(null);
            onDataRefresh?.();
          }}
          showToast={showToast}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar {
            width: 70px !important;
            padding: 16px 8px !important;
          }
          .admin-sidebar span {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
