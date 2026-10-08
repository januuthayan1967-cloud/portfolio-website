import React, { useState, useEffect } from 'react';
import {
  Shield, LayoutDashboard, FolderGit2, Mail, Cpu, UserCheck,
  LogOut, Plus, Trash2, Edit3, Star, CheckCircle, Eye, ArrowUpRight,
  TrendingUp, Users, MessageSquare, Clock, X, Save, RefreshCw
} from 'lucide-react';

export default function AdminDashboard({ token, onLogout, onClose, onDataRefresh }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [overview, setOverview] = useState(null);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

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
    liveUrl: ''
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

      const [resOverview, resMessages, resPortfolio] = await Promise.all([
        fetch('/api/admin/overview', { headers }),
        fetch('/api/admin/messages', { headers }),
        fetch('/api/portfolio')
      ]);

      if (resOverview.status === 401) {
        onLogout();
        return;
      }

      const dataOverview = await resOverview.json();
      const dataMessages = await resMessages.json();
      const dataPortfolio = await resPortfolio.json();

      setOverview(dataOverview);
      setMessages(dataMessages);
      setProjects(dataPortfolio.projects || []);
      setSkills(dataPortfolio.skills || []);
      setProfile(dataPortfolio.profile || {});
    } catch (err) {
      showToast('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

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
      liveUrl: 'https://github.com'
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
      liveUrl: proj.liveUrl || ''
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
      liveUrl: projectForm.liveUrl
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
            { id: 'projects', label: 'Projects Manager', icon: FolderGit2, badge: projects.length },
            { id: 'messages', label: 'Inbox & Inquiries', icon: Mail, badge: messages.filter((m) => !m.read).length },
            { id: 'skills', label: 'Skills Matrix', icon: Cpu },
            { id: 'profile', label: 'Identity & Bio', icon: UserCheck }
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

          {/* TAB 3: INBOX & MESSAGES */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="font-editorial" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
                  Inbound Dispatches &amp; Inquiries ({messages.length})
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Live inquiries captured directly from the portfolio contact form.
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', borderRadius: '16px' }}>
                  <Mail size={40} color="#64748b" style={{ margin: '0 auto 16px' }} />
                  <div style={{ color: '#cbd5e1', fontSize: '1rem' }}>No messages in the inbox yet.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {messages.map((m) => (
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>{m.name}</span>
                            <span className="badge-navy" style={{ fontSize: '0.7rem' }}>{m.email}</span>
                            {!m.read && <span className="badge-gold">UNREAD</span>}
                          </div>
                          <div className="font-editorial" style={{ fontSize: '1.05rem', color: '#d4af37', marginTop: '6px' }}>
                            {m.subject}
                          </div>
                          <div className="font-mono" style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                            {new Date(m.date).toLocaleString()}
                          </div>
                        </div>

                        {/* Message Actions */}
                        <div style={{ display: 'flex', gap: '8px' }}>
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

                          <a
                            href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                            className="btn-gold"
                            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                          >
                            Reply
                          </a>

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

                <button type="submit" className="btn-gold" style={{ padding: '0.9rem 2rem' }}>
                  <Save size={16} />
                  <span>Update Profile Configuration</span>
                </button>
              </form>
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
