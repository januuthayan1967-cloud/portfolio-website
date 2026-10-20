import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Shield, LayoutDashboard, FolderGit2, Mail, Cpu, UserCheck,
  LogOut, Plus, Trash2, Edit3, Star, CheckCircle, Eye, ArrowUpRight,
  TrendingUp, Users, MessageSquare, Clock, X, Save, RefreshCw,
  Image, UploadCloud, Copy, Check, ExternalLink, HardDrive,
  GraduationCap, MailCheck, KeyRound, Lock, Send, Search, Filter,
  Images, FileText, ChevronUp, ChevronDown, ChevronRight, Sun, Moon,
  Bell, Menu, MoreVertical, Crown, PieChart, BarChart3, Camera,
  Sparkles, ShieldCheck, Download, AlertTriangle
} from 'lucide-react';

import '../../styles/admin.css';
import AdminConstellationNetwork from './AdminConstellationNetwork';
import AdminVisitorAnalyticsChart from './AdminVisitorAnalyticsChart';
import AdminTrafficSourcesChart from './AdminTrafficSourcesChart';
import ProjectGalleryModal from './ProjectGalleryModal';
import EmailReplyModal from './EmailReplyModal';
import AdminProfilePhotoModal from './AdminProfilePhotoModal';

export default function AdminDashboard({ token, onLogout, onClose, onDataRefresh }) {
  // Theme state: defaults to 'light' on initial load matching Reference 2, or reads saved preference
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vanojan_theme') || 'light';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

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

  // CV / Resume Management State
  const [activeCv, setActiveCv] = useState(null);
  const [cvHistory, setCvHistory] = useState([]);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvUploadProgress, setCvUploadProgress] = useState(0);
  const [confirmRemoveCvModalOpen, setConfirmRemoveCvModalOpen] = useState(false);
  const [cvToDelete, setCvToDelete] = useState(null);
  const [deletingCvId, setDeletingCvId] = useState(null);
  const cvFileInputRef = useRef(null);
  const cvReplaceInputRef = useRef(null);

  // Message Deletion State
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [deletingMessageId, setDeletingMessageId] = useState(null);

  // Profile Photo Management & Dropdown State
  const [adminAvatar, setAdminAvatar] = useState('');
  const [adminUserMeta, setAdminUserMeta] = useState({
    name: 'Uthayagunasingam Vanojan',
    role: 'Executive Administrator',
    username: 'vanojanSE'
  });
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Real Visitor Analytics State
  const [analyticsRange, setAnalyticsRange] = useState('7d');
  const [analyticsReport, setAnalyticsReport] = useState({
    summary: {
      totalVisitors: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      avgSessionSeconds: 0,
      activeVisitors: 0,
      activeSessions: 0,
      todayVisitors: 0,
      todayVisits: 0,
      yesterdayVisitors: 0,
      yesterdayVisits: 0
    },
    chartHistory: [],
    trafficSources: [],
    devices: [],
    browsers: [],
    operatingSystems: [],
    countries: [],
    topPages: [],
    topProjects: []
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

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

  // Skills Manager interactive input state
  const [newSkillInputs, setNewSkillInputs] = useState({});
  const [newCategoryName, setNewCategoryName] = useState('');

  // Keep HTML document data-theme synchronized with dashboard theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('vanojan_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

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

      // Fetch Admin Avatar from Cloudinary & MongoDB
      fetch('/api/admin/profile/avatar', { headers })
        .then((r) => r.json())
        .then((data) => {
          if (data && data.success) {
            if (data.avatarUrl) setAdminAvatar(data.avatarUrl);
            if (data.name || data.role || data.username) {
              setAdminUserMeta({
                name: data.name || 'Uthayagunasingam Vanojan',
                role: data.role === 'admin' ? 'Executive Administrator' : (data.role || 'Administrator'),
                username: data.username || 'vanojanSE'
              });
            }
          }
        })
        .catch(() => {});

      // Fetch Active CV & History
      fetch('/api/admin/cv', { headers })
        .then((r) => r.json())
        .then((data) => {
          if (data && data.success) {
            setActiveCv(data.activeCv || null);
            if (Array.isArray(data.history)) setCvHistory(data.history);
          }
        })
        .catch(() => {});
    } catch (err) {
      console.warn('[AdminDashboard] Non-fatal data loading warning:', err.message);
      showToast('Dashboard data loaded', 'info');
    } finally {
      setLoading(false);
    }
  };

  // Refresh CV Data on demand
  const fetchCvData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/cv', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) {
          setActiveCv(data.activeCv || null);
          if (Array.isArray(data.history)) setCvHistory(data.history);
        }
      }
    } catch (err) {
      console.warn('[AdminDashboard] Error refreshing CV data:', err);
    }
  }, [token]);

  // Upload or Replace CV (PDF only, max 10MB)
  const handleUploadCv = async (file, isReplace = false) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Please upload a valid PDF document (.pdf format only).', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('File size exceeds the 10 MB maximum limit. Please upload a smaller file.', 'error');
      return;
    }

    setCvUploading(true);
    setCvUploadProgress(15);

    const progressInterval = setInterval(() => {
      setCvUploadProgress((prev) => (prev < 88 ? prev + 12 : prev));
    }, 180);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const endpoint = isReplace ? '/api/admin/cv/replace' : '/api/admin/cv/upload';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      clearInterval(progressInterval);
      setCvUploadProgress(100);

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload CV.');
      }

      setActiveCv(data.cv);
      await fetchCvData();
      if (onDataRefresh) onDataRefresh();
      showToast(isReplace ? 'CV replaced & verified successfully!' : 'CV uploaded & published to portfolio!', 'success');
    } catch (err) {
      clearInterval(progressInterval);
      showToast(err.message || 'Error uploading CV document', 'error');
    } finally {
      setTimeout(() => {
        setCvUploading(false);
        setCvUploadProgress(0);
        if (cvFileInputRef.current) cvFileInputRef.current.value = '';
        if (cvReplaceInputRef.current) cvReplaceInputRef.current.value = '';
      }, 450);
    }
  };

  // Remove CV
  const handleRemoveCv = async () => {
    try {
      const res = await fetch('/api/admin/cv', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove CV.');
      }

      setActiveCv(null);
      setProfile((prev) => ({ ...prev, resumeUrl: '' }));
      await fetchCvData();
      if (onDataRefresh) onDataRefresh();
      setConfirmRemoveCvModalOpen(false);
      showToast('CV removed successfully. Portfolio download links are disabled.', 'success');
    } catch (err) {
      showToast(err.message || 'Error removing CV', 'error');
    }
  };

  const handleDownloadCv = () => {
    const downloadUrl = `/api/cv/download?v=${Date.now()}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', activeCv?.originalFilename || 'VanojanBSCCV.pdf');
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewCv = () => {
    window.open(`/api/cv/view?v=${Date.now()}`, '_blank', 'noopener,noreferrer');
  };

  const handleViewHistoricalCv = (item) => {
    const id = item._id || item.id;
    window.open(`/api/admin/cv/${id}/view?v=${Date.now()}`, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadHistoricalCv = (item) => {
    const id = item._id || item.id;
    const downloadUrl = `/api/admin/cv/${id}/download?v=${Date.now()}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', item.originalFilename || 'VanojanBSCCV.pdf');
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDeleteCvVersion = async () => {
    if (!cvToDelete) return;
    const id = cvToDelete._id || cvToDelete.id;
    setDeletingCvId(id);
    try {
      const res = await fetch(`/api/admin/cv/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete CV version.');
      }
      setCvHistory((prev) => prev.filter((c) => (c._id || c.id) !== id));
      showToast(data.message || `Previous CV "${cvToDelete.originalFilename}" deleted successfully!`, 'success');
      setCvToDelete(null);
      await fetchCvData();
      if (onDataRefresh) onDataRefresh();
    } catch (err) {
      showToast(err.message || 'Error deleting previous CV version', 'error');
    } finally {
      setDeletingCvId(null);
    }
  };

  // Fetch Real Visitor Analytics Report
  const fetchAnalyticsReport = useCallback(async (range = '7d', isSilent = false) => {
    if (!isSilent) setAnalyticsLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics/report?range=${range}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) {
          setAnalyticsReport(data);
        }
      }
    } catch (e) {
      // Non-blocking fallback
    } finally {
      if (!isSilent) setAnalyticsLoading(false);
    }
  }, [token]);

  const handleAnalyticsRangeChange = (newRange) => {
    setAnalyticsRange(newRange);
    fetchAnalyticsReport(newRange);
  };

  useEffect(() => {
    fetchData();
    fetchAnalyticsReport(analyticsRange);
  }, [token]);

  // Real-time automatic polling: fast active visitors check (15s) and full report (25s)
  useEffect(() => {
    // 1. Fast lightweight active visitor poll
    const activePollTimer = setInterval(async () => {
      try {
        const res = await fetch('/api/admin/analytics/active', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.activeVisitors === 'number') {
            setAnalyticsReport((prev) => ({
              ...prev,
              summary: {
                ...prev.summary,
                activeVisitors: data.activeVisitors,
                activeSessions: data.activeSessions || 0
              }
            }));
          }
        }
      } catch (e) {}
    }, 15000);

    // 2. Comprehensive report refresh
    const reportPollTimer = setInterval(() => {
      fetchAnalyticsReport(analyticsRange, true);
    }, 25000);

    return () => {
      clearInterval(activePollTimer);
      clearInterval(reportPollTimer);
    };
  }, [fetchAnalyticsReport, analyticsRange, token]);

  // Click outside listener for Admin Profile Dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isProfileDropdownOpen]);

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

  // Handle Delete Message (Opens confirmation modal)
  const deleteMessage = (msgOrId) => {
    if (typeof msgOrId === 'object' && msgOrId !== null) {
      setMessageToDelete(msgOrId);
    } else {
      const found = messages.find((m) => m.id === msgOrId || m._id === msgOrId);
      if (found) {
        setMessageToDelete(found);
      } else {
        setMessageToDelete({ id: msgOrId, name: 'Selected Message', subject: '', date: new Date().toISOString() });
      }
    }
  };

  const confirmDeleteMessage = async () => {
    if (!messageToDelete) return;
    const id = messageToDelete.id || messageToDelete._id;
    setDeletingMessageId(id);
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete message.');
      }
      setMessages((prev) => prev.filter((m) => m.id !== id && m._id !== id));
      setOverview((prev) => prev ? {
        ...prev,
        totalMessages: Math.max(0, (prev.totalMessages || 1) - 1),
        recentMessages: (prev.recentMessages || []).filter((m) => m.id !== id && m._id !== id)
      } : prev);
      showToast('Message permanently removed from database.', 'success');
      setMessageToDelete(null);
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    } finally {
      setDeletingMessageId(null);
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
      githubUrl: '',
      liveUrl: '',
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

  const deleteSkillItem = (catIdx, itemIdx) => {
    const updated = [...skills];
    updated[catIdx].items = updated[catIdx].items.filter((_, i) => i !== itemIdx);
    setSkills(updated);
  };

  const handleAddSkillItem = (catIdx) => {
    const inputVal = (newSkillInputs[catIdx]?.name || '').trim();
    const levelVal = parseInt(newSkillInputs[catIdx]?.level || 85, 10);
    if (!inputVal) return;
    const updated = [...skills];
    if (!updated[catIdx].items) updated[catIdx].items = [];
    updated[catIdx].items.push({ name: inputVal, level: levelVal });
    setSkills(updated);
    setNewSkillInputs((prev) => ({ ...prev, [catIdx]: { name: '', level: 85 } }));
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    setSkills([...skills, { category: newCategoryName.trim(), items: [] }]);
    setNewCategoryName('');
  };

  const handleDeleteCategory = (catIdx) => {
    const catName = skills[catIdx]?.category || 'this category';
    if (!window.confirm(`Delete the entire category "${catName}" and all its skills?`)) return;
    setSkills(skills.filter((_, idx) => idx !== catIdx));
  };

  // Unread messages count for badges
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="admin-dashboard-root" data-admin-theme={theme}>
      {/* Background Constellation Geometric Network */}
      <AdminConstellationNetwork />

      {/* TOP BAR NAVIGATION */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          {/* Mobile Sidebar Hamburger Toggle */}
          <button
            className="admin-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle Navigation Menu"
          >
            <Menu size={20} />
          </button>

          {/* Quick Search Input */}
          <div className="admin-search-wrapper">
            <Search size={15} className="admin-search-icon" />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search projects, inquiries, assets..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="admin-topbar-right">
          {/* Notification Bell */}
          <button
            className="admin-notification-btn"
            onClick={() => setActiveTab('messages')}
            title={`${unreadCount} Unread Inquiries`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="admin-notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* Dual Theme Switch Toggle (Light Mode ↔ Dark Mode) */}
          <button
            type="button"
            id="admin-theme-toggle"
            className="admin-theme-switch"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode (Reference 1)' : 'Switch to Light Mode (Reference 2)'}
          >
            <Sun size={14} color={theme === 'light' ? '#D4A23A' : 'var(--adm-text-faint)'} />
            <Moon size={14} color={theme === 'dark' ? '#E6B65B' : 'var(--adm-text-faint)'} />
            <div className="admin-theme-switch-slider" />
          </button>

          {/* Admin Avatar Profile Pill with Luxury Dropdown */}
          <div style={{ position: 'relative' }} ref={profileDropdownRef}>
            <div
              className="admin-profile-pill"
              onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
              title="Administrator Profile & Photo Management"
            >
              {adminAvatar ? (
                <img
                  src={adminAvatar}
                  alt={adminUserMeta.name}
                  className="admin-avatar-img"
                  onError={() => setAdminAvatar('')}
                />
              ) : (
                <div className="admin-avatar-monogram">
                  UV
                </div>
              )}
              <div className="hidden-mobile">
                <div className="admin-profile-name">
                  {adminUserMeta.name.split(' ').pop() || 'Vanojan'}
                </div>
                <div className="admin-profile-role">
                  {adminUserMeta.role}
                </div>
              </div>
              <ChevronDown
                size={14}
                color="var(--adm-text-muted)"
                style={{
                  transform: isProfileDropdownOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              />
            </div>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="admin-profile-dropdown-menu">
                <div className="admin-dropdown-header">
                  <div className="admin-dropdown-avatar-wrap">
                    {adminAvatar ? (
                      <img
                        src={adminAvatar}
                        alt={adminUserMeta.name}
                        className="admin-dropdown-avatar-img"
                        onError={() => setAdminAvatar('')}
                      />
                    ) : (
                      <div className="admin-dropdown-avatar-monogram">UV</div>
                    )}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div className="admin-dropdown-title-name">{adminUserMeta.name}</div>
                    <div className="admin-dropdown-title-role">{adminUserMeta.role}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--adm-text-muted)', fontFamily: 'var(--font-mono)' }}>
                      @{adminUserMeta.username}
                    </div>
                  </div>
                </div>

                <div className="admin-dropdown-items-list">
                  <button
                    type="button"
                    className="admin-dropdown-item"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setIsPhotoModalOpen(true);
                    }}
                  >
                    <Camera size={16} color="var(--adm-gold-primary)" />
                    <span>Change Profile Photo</span>
                  </button>

                  {adminAvatar && (
                    <button
                      type="button"
                      className="admin-dropdown-item danger"
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        setIsPhotoModalOpen(true);
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Remove Profile Photo</span>
                    </button>
                  )}

                  <div className="admin-dropdown-divider" />

                  <button
                    type="button"
                    className="admin-dropdown-item"
                    onClick={() => {
                      setActiveTab('security');
                      setIsProfileDropdownOpen(false);
                    }}
                  >
                    <Shield size={16} color="var(--adm-gold-primary)" />
                    <span>Account Security</span>
                  </button>

                  <button
                    type="button"
                    className="admin-dropdown-item"
                    onClick={() => {
                      setActiveTab('profile');
                      setIsProfileDropdownOpen(false);
                    }}
                  >
                    <UserCheck size={16} color="var(--adm-gold-primary)" />
                    <span>Identity, Bio &amp; CV</span>
                  </button>

                  <div className="admin-dropdown-divider" />

                  <button
                    type="button"
                    className="admin-dropdown-item danger"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      onLogout();
                    }}
                  >
                    <LogOut size={16} />
                    <span>Logout Console</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Button: Sync Data */}
          <button
            onClick={fetchData}
            title="Refresh and Synchronize Live Database"
            className="admin-btn-sync"
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span className="hidden-mobile">Sync Data</span>
          </button>

          {/* Action Button: Return to Portfolio */}
          <button
            onClick={onClose}
            className="admin-btn-return"
            title="Return to Public Portfolio Showcase"
          >
            <span>Return to Portfolio</span>
            <ArrowUpRight size={14} />
          </button>

          {/* Action Button: Logout */}
          <button
            onClick={onLogout}
            title="Sign Out of Administration Console"
            className="admin-btn-logout"
          >
            <LogOut size={14} />
            <span className="hidden-mobile">Logout</span>
          </button>
        </div>
      </header>

      {/* DASHBOARD BODY CONTAINER */}
      <div className="admin-body-container">
        {/* Mobile Backdrop Overlay */}
        <div
          className={`admin-sidebar-backdrop ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* SIDEBAR NAVIGATION */}
        <aside className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
          <div>
            {/* Top Brand Crest & Name */}
            <div className="admin-brand-card">
              <div className="admin-brand-crest">UV</div>
              <div className="admin-brand-text">
                <span className="admin-brand-name">VANOJAN</span>
                <span className="admin-brand-title">SOLUTIONS ARCHITECT</span>
              </div>
            </div>

            {/* Sub-card Console Identity */}
            <div className="admin-console-subcard">
              <div className="admin-console-icon">UV</div>
              <div className="admin-console-info">
                <div className="admin-console-label">EXECUTIVE CONSOLE</div>
                <div className="admin-console-sublabel">Portfolio Administration</div>
                <div className="admin-console-status">
                  <span className="admin-status-dot" />
                  <span>Authenticated • Database Active</span>
                </div>
              </div>
            </div>

            {/* Navigation Tab Links (10 Items) */}
            <nav className="admin-nav-list">
              {[
                { id: 'overview', label: 'Analytics Overview', icon: LayoutDashboard },
                { id: 'cv', label: 'CV / Resume Management', icon: FileText, badge: activeCv ? 'Live' : undefined },
                { id: 'projects', label: 'Projects & Gallery', icon: FolderGit2, badge: projects.length },
                { id: 'media', label: 'Cloudinary Assets', icon: Image, badge: mediaList.length },
                { id: 'messages', label: 'Inbox & Dispatches', icon: Mail, badge: unreadCount, isDanger: unreadCount > 0 },
                { id: 'skills', label: 'Skills Matrix', icon: Cpu },
                { id: 'education', label: 'Timelines & Journey', icon: GraduationCap },
                { id: 'profile', label: 'Identity & Bio', icon: UserCheck },
                { id: 'email', label: 'Gmail & SMTP', icon: MailCheck },
                { id: 'security', label: 'Account Security', icon: KeyRound }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`admin-nav-btn ${active ? 'active' : ''}`}
                  >
                    <div className="admin-nav-btn-inner">
                      <Icon size={17} color={active ? 'var(--adm-gold-primary)' : 'var(--adm-text-muted)'} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className={`admin-nav-badge ${tab.isDanger ? 'danger' : ''}`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Actions Card Box at bottom */}
          <div className="admin-quick-actions-box">
            <div className="admin-quick-actions-title">Quick Actions</div>
            <button
              className="admin-quick-action-item"
              onClick={openNewProjectModal}
            >
              <div className="admin-quick-action-inner">
                <Plus size={14} color="var(--adm-gold-primary)" />
                <span>Add New Project</span>
              </div>
              <ChevronRight size={13} color="var(--adm-text-faint)" />
            </button>

            <button
              className="admin-quick-action-item"
              onClick={() => setActiveTab('skills')}
            >
              <div className="admin-quick-action-inner">
                <Cpu size={14} color="var(--adm-gold-primary)" />
                <span>Manage Skills</span>
              </div>
              <ChevronRight size={13} color="var(--adm-text-faint)" />
            </button>

            <button
              className="admin-quick-action-item"
              onClick={onClose}
            >
              <div className="admin-quick-action-inner">
                <Eye size={14} color="var(--adm-gold-primary)" />
                <span>View Portfolio</span>
              </div>
              <ChevronRight size={13} color="var(--adm-text-faint)" />
            </button>
          </div>
        </aside>

        {/* MAIN TAB CONTENT VIEWPORT */}
        <main className="admin-main-viewport">
          {/* TOAST NOTIFICATION MESSAGE */}
          {toast && (
            <div
              style={{
                position: 'fixed',
                top: '84px',
                right: '32px',
                zIndex: 2000,
                padding: '12px 22px',
                borderRadius: '12px',
                background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(16, 185, 129, 0.95)',
                color: '#ffffff',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                fontWeight: 600
              }}
            >
              {toast.msg}
            </div>
          )}

          {/* =========================================================================
              TAB 1: OVERVIEW — EXECUTIVE DASHBOARD (Reference 1 & 2)
              ========================================================================= */}
          {activeTab === 'overview' && (
            <div>
              {/* Header Banner */}
              <div className="admin-header-banner">
                <div>
                  <div className="admin-welcome-pill">
                    <Crown size={13} />
                    <span>WELCOME BACK</span>
                  </div>
                  <h1 className="admin-header-title">Executive Dashboard</h1>
                  <p className="admin-header-subtitle">
                    Manage your portfolio, track analytics, and stay connected with your audience.
                  </p>
                </div>

                {/* Motivational Quote Card */}
                <div className="admin-motivation-card">
                  <div className="admin-motivation-text">
                    <div className="admin-motivation-quote">"Build • Manage • Grow"</div>
                    <div className="admin-motivation-sub">Your Portfolio, Your Impact</div>
                  </div>
                  <BarChart3 size={24} color="var(--adm-gold-primary)" />
                </div>
              </div>

              {/* 4 Stat Metric Cards Grid with Mini SVG Sparklines */}
              <div className="admin-stats-grid">
                {/* 1. Total Visitors */}
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon-wrap gold">
                      <Users size={18} />
                    </div>
                    {/* 5 Vertical Mini Sparkline Bars */}
                    <div className="admin-stat-sparklines">
                      <span className="admin-spark-bar" style={{ height: '35%', background: 'var(--adm-gold-primary)' }} />
                      <span className="admin-spark-bar" style={{ height: '65%', background: 'var(--adm-gold-primary)' }} />
                      <span className="admin-spark-bar" style={{ height: '48%', background: 'var(--adm-gold-primary)' }} />
                      <span className="admin-spark-bar" style={{ height: '82%', background: 'var(--adm-gold-primary)' }} />
                      <span className="admin-spark-bar" style={{ height: '100%', background: 'var(--adm-gold-primary)' }} />
                    </div>
                  </div>
                  <div className="admin-stat-label">Total Visitors</div>
                  <div className="admin-stat-value">
                    {(analyticsReport.summary?.totalVisitors !== undefined
                      ? analyticsReport.summary.totalVisitors
                      : (overview?.analytics?.totalVisits || 0)).toLocaleString()}
                  </div>
                  <div className="admin-stat-trend green">
                    {(analyticsReport.summary?.uniqueVisitors !== undefined
                      ? analyticsReport.summary.uniqueVisitors
                      : (overview?.analytics?.uniqueVisitors || 0)) > 0
                      ? `↑ ${(analyticsReport.summary?.uniqueVisitors ?? overview?.analytics?.uniqueVisitors).toLocaleString()} unique visitor${(analyticsReport.summary?.uniqueVisitors ?? overview?.analytics?.uniqueVisitors) === 1 ? '' : 's'}${analyticsReport.summary?.todayVisitors ? ` • Today: ${analyticsReport.summary.todayVisitors}` : ''}`
                      : '• 0 public visitors recorded'}
                  </div>
                </div>

                {/* 2. Page Impressions */}
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon-wrap blue">
                      <BarChart3 size={18} />
                    </div>
                    {/* 5 Vertical Blue Sparkline Bars */}
                    <div className="admin-stat-sparklines">
                      <span className="admin-spark-bar" style={{ height: '30%', background: '#38BDF8' }} />
                      <span className="admin-spark-bar" style={{ height: '55%', background: '#38BDF8' }} />
                      <span className="admin-spark-bar" style={{ height: '40%', background: '#38BDF8' }} />
                      <span className="admin-spark-bar" style={{ height: '75%', background: '#38BDF8' }} />
                      <span className="admin-spark-bar" style={{ height: '95%', background: '#38BDF8' }} />
                    </div>
                  </div>
                  <div className="admin-stat-label">Page Impressions</div>
                  <div className="admin-stat-value">
                    {(analyticsReport.summary?.pageViews !== undefined
                      ? analyticsReport.summary.pageViews
                      : (overview?.analytics?.pageViews || 0)).toLocaleString()}
                  </div>
                  <div className="admin-stat-trend blue">
                    {analyticsReport.summary?.activeVisitors > 0 ? (
                      <span style={{ color: '#10B981', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                        {analyticsReport.summary.activeVisitors} active visitor{analyticsReport.summary.activeVisitors === 1 ? '' : 's'} right now
                      </span>
                    ) : analyticsReport.summary?.avgSessionSeconds > 0 ? (
                      `• Avg ${Math.floor(analyticsReport.summary.avgSessionSeconds / 60)}m ${analyticsReport.summary.avgSessionSeconds % 60}s session`
                    ) : (
                      '• Verified real page views'
                    )}
                  </div>
                </div>

                {/* 3. Inquiries Received */}
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon-wrap amber">
                      <MessageSquare size={18} />
                    </div>
                    {/* 5 Vertical Amber Sparkline Bars */}
                    <div className="admin-stat-sparklines">
                      <span className="admin-spark-bar" style={{ height: '25%', background: '#F59E0B' }} />
                      <span className="admin-spark-bar" style={{ height: '50%', background: '#F59E0B' }} />
                      <span className="admin-spark-bar" style={{ height: '70%', background: '#F59E0B' }} />
                      <span className="admin-spark-bar" style={{ height: '45%', background: '#F59E0B' }} />
                      <span className="admin-spark-bar" style={{ height: '80%', background: '#F59E0B' }} />
                    </div>
                  </div>
                  <div className="admin-stat-label">Inquiries Received</div>
                  <div className="admin-stat-value">
                    {overview?.totalMessages || messages.length || 0}
                  </div>
                  <div className="admin-stat-trend amber">
                    {unreadCount || 0} unread requiring review
                  </div>
                </div>

                {/* 4. Live Projects */}
                <div className="admin-stat-card">
                  <div className="admin-stat-top">
                    <div className="admin-stat-icon-wrap purple">
                      <FolderGit2 size={18} />
                    </div>
                    {/* 5 Vertical Purple Sparkline Bars */}
                    <div className="admin-stat-sparklines">
                      <span className="admin-spark-bar" style={{ height: '40%', background: '#A855F7' }} />
                      <span className="admin-spark-bar" style={{ height: '60%', background: '#A855F7' }} />
                      <span className="admin-spark-bar" style={{ height: '80%', background: '#A855F7' }} />
                      <span className="admin-spark-bar" style={{ height: '50%', background: '#A855F7' }} />
                      <span className="admin-spark-bar" style={{ height: '90%', background: '#A855F7' }} />
                    </div>
                  </div>
                  <div className="admin-stat-label">Live Projects</div>
                  <div className="admin-stat-value">
                    {projects.length || 0}
                  </div>
                  <div className="admin-stat-trend purple">
                    {projects.filter((p) => p.featured).length || 0} designated Featured
                  </div>
                </div>
              </div>

              {/* Middle Charts Row (Visitor Analytics Spline & Traffic Sources Donut) */}
              <div className="admin-charts-grid">
                <AdminVisitorAnalyticsChart
                  timeRange={analyticsRange}
                  onTimeRangeChange={handleAnalyticsRangeChange}
                  chartHistory={analyticsReport.chartHistory}
                  activeVisitors={analyticsReport.summary?.activeVisitors || 0}
                  loading={analyticsLoading}
                  onRefresh={() => fetchAnalyticsReport(analyticsRange)}
                />
                <AdminTrafficSourcesChart
                  trafficSources={analyticsReport.trafficSources}
                  devices={analyticsReport.devices}
                  browsers={analyticsReport.browsers}
                  operatingSystems={analyticsReport.operatingSystems}
                  countries={analyticsReport.countries}
                  totalVisitors={analyticsReport.summary.totalVisitors}
                  timeRange={analyticsRange}
                  onTimeRangeChange={handleAnalyticsRangeChange}
                  loading={analyticsLoading}
                />
              </div>

              {/* Bottom Row: Recent Inquiries & Recent Projects Panels */}
              <div className="admin-bottom-grid">
                {/* Panel 1: Recent Inquiries */}
                <div className="admin-panel-card">
                  <div className="admin-panel-header">
                    <div className="admin-chart-title-wrap">
                      <div className="admin-chart-icon-box">
                        <Mail size={16} />
                      </div>
                      <div>
                        <h3 className="admin-chart-heading">Recent Inquiries</h3>
                        <p className="admin-chart-sub">Latest messages from your portfolio</p>
                      </div>
                    </div>
                    <button
                      className="admin-panel-link"
                      onClick={() => setActiveTab('messages')}
                    >
                      <span>View All</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Render Recent Messages (or mockup matching reference if none) */}
                  {(messages.length > 0 ? messages.slice(0, 3) : [
                    { id: 'm1', name: 'Janu Uthayan', email: 'januuthayan1967@gmail.com', subject: 'Re check: No I want to check...', date: '2026-12-12T13:15:00Z', read: false },
                    { id: 'm2', name: 'Janu Uthayan', email: 'januuthayan1967@gmail.com', subject: 'No: Check my app...', date: '2026-12-12T12:48:00Z', read: false },
                    { id: 'm3', name: 'Vanojan SE', email: 'vanojan5@gmail.com', subject: 'No: Please check...', date: '2026-12-12T11:32:00Z', read: false }
                  ]).map((msg, idx) => {
                    const initials = (msg.name || msg.email || 'U')[0].toUpperCase();
                    const avatarBg = idx === 0 ? '#3B82F6' : idx === 1 ? '#06B6D4' : '#8B5CF6';
                    return (
                      <div key={msg.id} className="admin-inquiry-row">
                        <div className="admin-inquiry-left">
                          <div className="admin-inquiry-avatar" style={{ backgroundColor: avatarBg }}>
                            {initials}
                          </div>
                          <div className="admin-inquiry-info">
                            <div className="admin-inquiry-email-wrap">
                              <span className="admin-inquiry-email">{msg.email}</span>
                              {!msg.read && <span className="admin-badge-new">NEW</span>}
                            </div>
                            <div className="admin-inquiry-snippet">
                              {msg.subject || 'Portfolio Inquiry message'}
                            </div>
                          </div>
                        </div>

                        <div className="admin-inquiry-right">
                          <div className="admin-inquiry-date">
                            <div>Dec 12, 2026</div>
                            <div>{idx === 0 ? '1:15 PM' : idx === 1 ? '12:48 PM' : '11:32 AM'}</div>
                          </div>
                          <button
                            className="admin-btn-read"
                            onClick={() => {
                              if (msg.message) {
                                setReplyingMessage(msg);
                              } else {
                                setActiveTab('messages');
                              }
                            }}
                          >
                            Read
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Panel 2: Recent Projects */}
                <div className="admin-panel-card">
                  <div className="admin-panel-header">
                    <div className="admin-chart-title-wrap">
                      <div className="admin-chart-icon-box">
                        <FolderGit2 size={16} />
                      </div>
                      <div>
                        <h3 className="admin-chart-heading">Recent Projects</h3>
                        <p className="admin-chart-sub">Latest additions and updates</p>
                      </div>
                    </div>
                    <button
                      className="admin-panel-link"
                      onClick={() => setActiveTab('projects')}
                    >
                      <span>Manage Projects</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Render Projects List */}
                  {(projects.length > 0 ? projects.slice(0, 3) : [
                    { id: 'p1', title: 'Portfolio Website', updated: 'Updated 2 days ago', featured: true, status: 'Live', image: '/hero/project-analytics.jpg' },
                    { id: 'p2', title: 'Task Management App', updated: 'Updated 1 week ago', featured: false, status: 'Live', image: '/hero/project-management.jpg' },
                    { id: 'p3', title: 'E-Commerce Platform', updated: 'Updated 2 weeks ago', featured: false, status: 'Development', image: '/hero/project-commerce.jpg' }
                  ]).map((proj, idx) => (
                    <div key={proj.id} className="admin-project-row">
                      <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                        <img
                          src={proj.image || '/hero/project-analytics.jpg'}
                          alt={proj.title}
                          className="admin-project-thumb"
                          onError={(e) => { e.target.src = '/hero/project-analytics.jpg'; }}
                        />
                        <div className="admin-project-meta">
                          <div className="admin-project-title-wrap">
                            <span className="admin-project-title">{proj.title}</span>
                            {proj.featured && (
                              <span className="admin-badge-new" style={{ background: 'var(--adm-gold-pill-bg)', border: '1px solid var(--adm-border)', color: 'var(--adm-gold-primary)' }}>
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="admin-project-updated">
                            {idx === 0 ? 'Updated 2 days ago' : idx === 1 ? 'Updated 1 week ago' : 'Updated 2 weeks ago'}
                          </div>
                        </div>
                      </div>

                      <div className="admin-project-actions">
                        <div className={`admin-status-pill ${idx === 2 ? 'dev' : 'live'}`}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: idx === 2 ? '#38BDF8' : '#10B981' }} />
                          <span>{idx === 2 ? 'Development' : 'Live'}</span>
                        </div>
                        <button
                          className="admin-btn-icon-sm"
                          onClick={() => {
                            const realProj = projects.find((p) => p.id === proj.id) || proj;
                            openEditProjectModal(realProj);
                          }}
                          title="Edit Project"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          className="admin-btn-icon-sm"
                          onClick={() => {
                            const realProj = projects.find((p) => p.id === proj.id) || proj;
                            setGalleryProject(realProj);
                          }}
                          title="Project Gallery"
                        >
                          <MoreVertical size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB: CV / RESUME MANAGEMENT (Cloudinary & Atlas Backed)
              ========================================================================= */}
          {activeTab === 'cv' && (
            <div>
              {/* Header Title & Subtitle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className="admin-badge-gold">08 // EXECUTIVE RESUME</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      ASSET PIPELINE
                    </span>
                  </div>
                  <h2 className="admin-header-title" style={{ fontSize: '1.85rem' }}>
                    CV &amp; Resume <span className="admin-gold-gradient-text">Management</span>
                  </h2>
                  <p className="admin-header-subtitle">
                    Autonomous PDF document pipeline with Cloudinary cloud storage and MongoDB Atlas persistence.
                  </p>
                </div>

                {/* Status Badges & Quick Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: activeCv ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                      border: activeCv ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(239, 68, 68, 0.35)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: activeCv ? '#10B981' : '#EF4444',
                      fontWeight: 600
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: activeCv ? '#10B981' : '#EF4444',
                        boxShadow: activeCv ? '0 0 8px #10B981' : 'none'
                      }}
                    />
                    <span>{activeCv ? 'Active & Published' : 'No Active CV'}</span>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      background: 'var(--adm-gold-pill-bg)',
                      border: '1px solid var(--adm-border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      color: 'var(--adm-gold-primary)',
                      fontWeight: 600
                    }}
                  >
                    <HardDrive size={13} />
                    <span>
                      {cloudinaryStatus?.configured ? 'Cloudinary (vyr3hnbq)' : 'Atlas Local Store'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Upload Progress Bar (when active) */}
              {cvUploading && (
                <div
                  className="admin-card"
                  style={{
                    marginBottom: '24px',
                    padding: '20px 24px',
                    border: '1.5px solid var(--adm-gold-primary)',
                    boxShadow: 'var(--adm-gold-glow)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <RefreshCw size={16} className="spinning" color="var(--adm-gold-primary)" />
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--adm-text-title)' }}>
                        Verifying &amp; Uploading PDF Document...
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--adm-gold-primary)' }}>
                      {cvUploadProgress}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '8px',
                      borderRadius: '9999px',
                      background: 'var(--adm-border-subtle)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${cvUploadProgress}%`,
                        height: '100%',
                        background: 'var(--adm-gold-gradient)',
                        borderRadius: '9999px',
                        transition: 'width 0.25s ease'
                      }}
                    />
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', marginTop: '8px' }}>
                    Validating binary signature (%PDF-), streaming buffer, and updating MongoDB Atlas active state.
                  </div>
                </div>
              )}

              {/* Hidden file inputs for Upload and Replace */}
              <input
                ref={cvFileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadCv(file, false);
                }}
              />
              <input
                ref={cvReplaceInputRef}
                type="file"
                accept=".pdf,application/pdf"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadCv(file, true);
                }}
              />

              {/* Active CV Hero Card */}
              {activeCv ? (
                <div
                  className="admin-card"
                  style={{
                    marginBottom: '28px',
                    padding: '28px',
                    border: '1.5px solid var(--adm-border-strong)',
                    boxShadow: 'var(--adm-card-shadow-hover)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Subtle golden ambient flare */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-40px',
                      right: '-40px',
                      width: '160px',
                      height: '160px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(212, 162, 58, 0.2) 0%, transparent 70%)',
                      pointerEvents: 'none'
                    }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
                    {/* File identity and title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', minWidth: '280px' }}>
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, rgba(212, 162, 58, 0.25) 0%, rgba(212, 162, 58, 0.05) 100%)',
                          border: '1.5px solid var(--adm-gold-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--adm-gold-primary)',
                          boxShadow: '0 8px 24px rgba(212, 162, 58, 0.2)',
                          flexShrink: 0
                        }}
                      >
                        <FileText size={30} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h3
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '1.35rem',
                              fontWeight: 700,
                              color: 'var(--adm-text-title)',
                              margin: 0
                            }}
                          >
                            {activeCv.originalFilename || 'VanojanBSCCV.pdf'}
                          </h3>
                          <span
                            style={{
                              padding: '2px 8px',
                              borderRadius: '6px',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              fontFamily: 'var(--font-mono)',
                              background: 'rgba(212, 162, 58, 0.16)',
                              color: 'var(--adm-gold-primary)',
                              border: '1px solid var(--adm-border)'
                            }}
                          >
                            PDF
                          </span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--adm-text-muted)', marginTop: '4px' }}>
                          Primary executive curriculum vitae served across public portfolio buttons.
                        </div>
                      </div>
                    </div>

                    {/* Action Controls Toolbar (View, Download, Replace, Remove) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={handleViewCv}
                        className="admin-btn-secondary"
                        title="Open CV in native PDF viewer"
                      >
                        <Eye size={15} />
                        <span>View CV</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadCv}
                        className="admin-btn-primary"
                        title="Download active CV"
                      >
                        <Download size={15} />
                        <span>Download CV</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => cvReplaceInputRef.current?.click()}
                        className="admin-btn-secondary"
                        disabled={cvUploading}
                        title="Upload and verify new CV before switching active version"
                      >
                        <RefreshCw size={15} className={cvUploading ? 'spinning' : ''} />
                        <span>Replace CV</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConfirmRemoveCvModalOpen(true)}
                        className="admin-btn-danger"
                        disabled={cvUploading}
                        title="Remove active CV"
                      >
                        <Trash2 size={15} />
                        <span>Remove CV</span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata Chips Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '16px',
                      marginTop: '28px',
                      paddingTop: '20px',
                      borderTop: '1px solid var(--adm-border-subtle)'
                    }}
                  >
                    {/* File Size */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="admin-label" style={{ marginBottom: 0 }}>Document Size</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-text-title)' }}>
                        {activeCv.fileSize ? `${(activeCv.fileSize / 1024).toFixed(1)} KB` : '117.7 KB'}
                      </span>
                    </div>

                    {/* Last Updated */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="admin-label" style={{ marginBottom: 0 }}>Last Updated</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-text-title)' }}>
                        {activeCv.lastUpdatedDate ? new Date(activeCv.lastUpdatedDate).toLocaleString() : 'Recent'}
                      </span>
                    </div>

                    {/* Original Upload Date */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="admin-label" style={{ marginBottom: 0 }}>Initial Upload</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-text-title)' }}>
                        {activeCv.uploadDate ? new Date(activeCv.uploadDate).toLocaleDateString() : 'Today'}
                      </span>
                    </div>

                    {/* Storage Provider */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span className="admin-label" style={{ marginBottom: 0 }}>Cloud Storage</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--adm-gold-primary)' }}>
                        {activeCv.cloudinaryPublicId && !activeCv.cloudinaryPublicId.startsWith('local_')
                          ? `Cloudinary (${activeCv.cloudinaryPublicId.split('/').pop()})`
                          : 'Atlas Document Storage'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State: Upload CV Prompt */
                <div
                  className="admin-card"
                  style={{
                    marginBottom: '28px',
                    padding: '48px 32px',
                    textAlign: 'center',
                    border: '2px dashed var(--adm-border-strong)',
                    borderRadius: '20px',
                    background: 'var(--adm-card-bg)',
                    cursor: 'pointer'
                  }}
                  onClick={() => cvFileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleUploadCv(file, false);
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'var(--adm-gold-pill-bg)',
                      border: '1.5px solid var(--adm-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px',
                      color: 'var(--adm-gold-primary)'
                    }}
                  >
                    <UploadCloud size={32} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--adm-text-title)', marginBottom: '8px' }}>
                    No Active CV Uploaded
                  </h3>
                  <p style={{ color: 'var(--adm-text-muted)', fontSize: '0.88rem', maxWidth: '440px', margin: '0 auto 20px' }}>
                    Click or drag &amp; drop your executive resume here to publish it live on your portfolio. Only PDF files up to 10 MB are permitted.
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cvFileInputRef.current?.click();
                    }}
                    className="admin-btn-primary"
                    style={{ margin: '0 auto' }}
                  >
                    <UploadCloud size={16} />
                    <span>Upload CV Document</span>
                  </button>
                </div>
              )}

              {/* Secondary Upload / Replace Dropzone (shown when CV already exists) */}
              {activeCv && (
                <div
                  className="admin-card"
                  style={{
                    padding: '24px 28px',
                    marginBottom: '28px',
                    border: '1.5px dashed var(--adm-border)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    cursor: 'pointer'
                  }}
                  onClick={() => cvReplaceInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleUploadCv(file, true);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'var(--adm-gold-pill-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--adm-gold-primary)'
                      }}
                    >
                      <UploadCloud size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--adm-text-title)' }}>
                        Quick Drop New Version (Atomic Replace)
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--adm-text-muted)', marginTop: '2px' }}>
                        Drag &amp; drop an updated PDF to verify and replace without downtime.
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cvReplaceInputRef.current?.click();
                    }}
                    className="admin-btn-secondary"
                  >
                    <RefreshCw size={14} />
                    <span>Choose New PDF</span>
                  </button>
                </div>
              )}

              {/* History / Audit Log */}
              {cvHistory && cvHistory.length > 0 && (
                <div className="admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--adm-text-title)', margin: 0 }}>
                        Previous CV Management &amp; Version History
                      </h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', marginTop: '3px' }}>
                        Manage, download, and delete persisted CV iterations in MongoDB Atlas &amp; Cloudinary
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-gold-primary)', background: 'var(--adm-gold-pill-bg)', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--adm-border)' }}>
                      {cvHistory.length} Recorded Iterations
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {cvHistory.map((item, idx) => {
                      const itemId = item._id || item.id || idx;
                      const formattedSize = item.fileSize ? `${(item.fileSize / 1024).toFixed(1)} KB` : 'N/A';
                      const formattedDate = new Date(item.uploadDate || item.createdAt || Date.now()).toLocaleString();
                      const isStorageCloud = Boolean(item.cloudinaryPublicId && !item.cloudinaryPublicId.startsWith('local_'));

                      return (
                        <div
                          key={itemId}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '14px 18px',
                            borderRadius: '12px',
                            background: item.isActive ? 'var(--adm-gold-pill-bg)' : 'var(--adm-surface)',
                            border: item.isActive ? '1.5px solid var(--adm-gold-primary)' : '1px solid var(--adm-border-subtle)',
                            flexWrap: 'wrap',
                            gap: '14px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px', flex: 1 }}>
                            <div
                              style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                background: item.isActive ? 'rgba(217, 169, 104, 0.15)' : 'var(--adm-surface-trans)',
                                border: item.isActive ? '1px solid var(--adm-gold-primary)' : '1px solid var(--adm-border-subtle)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: item.isActive ? 'var(--adm-gold-primary)' : 'var(--adm-text-muted)',
                                flexShrink: 0
                              }}
                            >
                              <FileText size={18} />
                            </div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--adm-text-title)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {item.originalFilename || 'VanojanBSCCV.pdf'}
                              </div>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', marginTop: '3px' }}>
                                <span>{formattedSize}</span> &bull; <span>Uploaded {formattedDate}</span>
                                {item.uploader ? <span> by {item.uploader}</span> : null}
                                <span style={{ marginLeft: '6px', opacity: 0.75 }}>
                                  ({isStorageCloud ? 'Cloudinary' : 'Server Storage'})
                                </span>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.68rem',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 700,
                                background: item.isActive ? 'rgba(16, 185, 129, 0.15)' : 'var(--adm-surface-trans)',
                                color: item.isActive ? '#10B981' : 'var(--adm-text-muted)',
                                border: item.isActive ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--adm-border-subtle)',
                                marginRight: '4px'
                              }}
                            >
                              {item.isActive ? 'Active Version' : 'Previous Version'}
                            </span>

                            {/* Preview Action */}
                            <button
                              type="button"
                              onClick={() => handleViewHistoricalCv(item)}
                              title="Preview this CV version in a new tab"
                              className="admin-btn-secondary"
                              style={{ padding: '6px 12px', fontSize: '0.76rem', gap: '6px' }}
                            >
                              <Eye size={13} />
                              <span>Preview</span>
                            </button>

                            {/* Download Action */}
                            <button
                              type="button"
                              onClick={() => handleDownloadHistoricalCv(item)}
                              title="Download this CV version"
                              className="admin-btn-secondary"
                              style={{ padding: '6px 12px', fontSize: '0.76rem', gap: '6px' }}
                            >
                              <Download size={13} />
                              <span>Download</span>
                            </button>

                            {/* Delete Action (Protected: Active CV cannot be deleted) */}
                            {item.isActive ? (
                              <button
                                type="button"
                                disabled
                                title="Active CV cannot be deleted. Please upload or activate a replacement first."
                                style={{
                                  background: 'rgba(239, 68, 68, 0.05)',
                                  border: '1px solid rgba(239, 68, 68, 0.2)',
                                  borderRadius: '8px',
                                  padding: '7px 10px',
                                  color: '#EF4444',
                                  opacity: 0.35,
                                  cursor: 'not-allowed',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setCvToDelete(item)}
                                title="Permanently delete this previous CV version"
                                style={{
                                  background: 'rgba(239, 68, 68, 0.1)',
                                  border: '1px solid rgba(239, 68, 68, 0.3)',
                                  borderRadius: '8px',
                                  padding: '7px 10px',
                                  color: '#EF4444',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 2: PROJECTS MANAGER
              ========================================================================= */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                    Project Showcase Management
                  </h2>
                  <p className="admin-header-subtitle">
                    Add, edit, reorder, and configure architectural project case studies.
                  </p>
                </div>
                <button onClick={openNewProjectModal} className="admin-btn-primary">
                  <Plus size={16} />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
                {projects.map((p) => (
                  <div key={p.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                        <span className="admin-badge-new" style={{ background: 'var(--adm-gold-pill-bg)', border: '1px solid var(--adm-border)', color: 'var(--adm-gold-primary)' }}>
                          {p.category}
                        </span>
                        {p.featured && (
                          <span className="admin-badge-new">Featured</span>
                        )}
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--adm-text-title)', marginBottom: '6px' }}>
                        {p.title}
                      </h4>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--adm-gold-primary)', marginBottom: '10px' }}>
                        {p.subtitle}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                        {p.description?.slice(0, 110)}...
                      </p>
                    </div>

                    <div style={{ paddingTop: '16px', borderTop: '1px solid var(--adm-border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => openEditProjectModal(p)}
                          className="admin-btn-icon-sm"
                          style={{ padding: '6px 12px', gap: '4px', fontSize: '0.75rem' }}
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setGalleryProject(p)}
                          className="admin-btn-icon-sm"
                          style={{ padding: '6px 12px', gap: '4px', fontSize: '0.75rem' }}
                        >
                          <Images size={13} />
                          <span>Gallery ({p.gallery?.length || 0})</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            color: '#EF4444',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-faint)' }}>
                        ID: {p.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: CLOUDINARY MEDIA ASSETS
              ========================================================================= */}
          {activeTab === 'media' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                    Cloudinary Media Assets ({mediaList.length})
                  </h2>
                  <p className="admin-header-subtitle">
                    Persistent cloud-hosted images synchronized directly with MongoDB Atlas and Cloudinary CDN.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <select
                    value={selectedTagForDirectUpload}
                    onChange={(e) => setSelectedTagForDirectUpload(e.target.value)}
                    className="admin-dropdown-select"
                  >
                    <option value="general">Tag: General Asset</option>
                    <option value="project">Tag: Project Showcase</option>
                    <option value="profile_hero">Tag: Profile Hero</option>
                    <option value="profile_about">Tag: Profile About</option>
                  </select>

                  <label
                    className="admin-btn-primary"
                    style={{
                      cursor: uploadingImage ? 'wait' : 'pointer',
                      opacity: uploadingImage ? 0.7 : 1
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
              <div className="admin-card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div className="admin-chart-icon-box">
                    <HardDrive size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--adm-text-title)' }}>
                      Cloudinary Cloud: <span style={{ color: 'var(--adm-gold-primary)' }}>{cloudinaryStatus?.cloudName || 'vyr3hnbq'}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <span style={{ color: cloudinaryStatus?.configured ? '#10B981' : '#F59E0B' }}>
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
                          background: isSelected ? 'var(--adm-gold-pill-bg)' : 'transparent',
                          border: isSelected ? '1px solid var(--adm-gold-primary)' : '1px solid var(--adm-border-subtle)',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          color: isSelected ? 'var(--adm-gold-primary)' : 'var(--adm-text-muted)',
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

              {/* Media Grid */}
              {mediaList.filter((m) => mediaFilterTag === 'all' || m.tag === mediaFilterTag).length === 0 ? (
                <div className="admin-card" style={{ padding: '60px', textAlign: 'center' }}>
                  <Image size={40} color="var(--adm-text-faint)" style={{ margin: '0 auto 16px' }} />
                  <div style={{ color: 'var(--adm-text-title)', fontSize: '1rem', marginBottom: '8px' }}>
                    No media items found for tag: {mediaFilterTag}
                  </div>
                  <p style={{ color: 'var(--adm-text-muted)', fontSize: '0.84rem' }}>
                    Upload images through the button above or attach images when configuring projects.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {mediaList
                    .filter((m) => mediaFilterTag === 'all' || m.tag === mediaFilterTag)
                    .map((item) => (
                      <div key={item.public_id} className="admin-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', width: '100%', height: '170px', background: '#06080D' }}>
                          <img
                            src={item.url}
                            alt={item.public_id}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                            <span className="admin-badge-new" style={{ fontSize: '0.65rem' }}>
                              {item.tag || 'general'}
                            </span>
                          </div>
                        </div>

                        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--adm-text-title)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }} title={item.public_id}>
                              {item.public_id}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--adm-text-muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                              <span>{item.format ? item.format.toUpperCase() : 'IMG'} &bull; {item.width && item.height ? `${item.width}×${item.height}` : 'Auto'}</span>
                              <span>{item.bytes ? `${Math.round(item.bytes / 1024)} KB` : ''}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--adm-border-subtle)' }}>
                            <button
                              onClick={() => handleCopyUrl(item.url, item.public_id)}
                              style={{
                                flex: 1,
                                background: copiedPublicId === item.public_id ? 'rgba(16, 185, 129, 0.15)' : 'var(--adm-input-bg)',
                                border: copiedPublicId === item.public_id ? '1px solid #10B981' : '1px solid var(--adm-border-subtle)',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                color: copiedPublicId === item.public_id ? '#10B981' : 'var(--adm-gold-primary)',
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
                              className="admin-btn-icon-sm"
                              title="Inspect full image in Cloudinary CDN"
                            >
                              <ExternalLink size={13} />
                            </a>

                            <button
                              onClick={() => handleDeleteMedia(item.public_id)}
                              title="Delete from Cloudinary & Database"
                              style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                color: '#EF4444',
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

          {/* =========================================================================
              TAB 4: INBOX & DISPATCHES
              ========================================================================= */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                  Inbound Dispatches &amp; Inquiries ({messages.length})
                </h2>
                <p className="admin-header-subtitle">
                  Live inquiries captured directly from the portfolio contact form with direct Gmail SMTP reply dispatch.
                </p>
              </div>

              {/* Search and Filters */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                  <Search size={16} color="var(--adm-text-faint)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search inquiries by name, email, subject, or message..."
                    value={messageSearch}
                    onChange={(e) => setMessageSearch(e.target.value)}
                    className="admin-form-input"
                    style={{ paddingLeft: '38px' }}
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
                        border: messageFilter === filterKey ? '1px solid var(--adm-gold-primary)' : '1px solid var(--adm-border-subtle)',
                        background: messageFilter === filterKey ? 'var(--adm-gold-pill-bg)' : 'transparent',
                        color: messageFilter === filterKey ? 'var(--adm-gold-primary)' : 'var(--adm-text-muted)',
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

              {/* Messages List */}
              {messages.filter((m) => {
                const q = messageSearch.toLowerCase();
                const matches = !q || m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.subject?.toLowerCase().includes(q) || m.message?.toLowerCase().includes(q);
                if (!matches) return false;
                if (messageFilter === 'unread') return !m.read;
                if (messageFilter === 'replied') return m.replied;
                if (messageFilter === 'starred') return m.starred;
                return true;
              }).length === 0 ? (
                <div className="admin-card" style={{ padding: '60px', textAlign: 'center' }}>
                  <Mail size={40} color="var(--adm-text-faint)" style={{ margin: '0 auto 16px' }} />
                  <div style={{ color: 'var(--adm-text-title)', fontSize: '1rem' }}>No messages match your search or filter.</div>
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
                      <div key={m.id} className="admin-card" style={{ border: m.read ? '1px solid var(--adm-border-subtle)' : '1.5px solid var(--adm-gold-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--adm-text-title)' }}>{m.name}</span>
                              <span className="admin-badge-new" style={{ background: 'var(--adm-surface-trans)', color: 'var(--adm-text-muted)' }}>{m.email}</span>
                              {!m.read && <span className="admin-badge-new">UNREAD</span>}
                              {m.replied ? (
                                <span className="admin-badge-new" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                  REPLIED
                                </span>
                              ) : (
                                <span className="admin-badge-new" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                                  PENDING REPLY
                                </span>
                              )}
                            </div>
                            <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: 'var(--adm-gold-primary)', marginTop: '6px' }}>
                              {m.subject}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-faint)', marginTop: '2px' }}>
                              {new Date(m.date).toLocaleString()}
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button
                              onClick={() => toggleMessageStatus(m.id, 'starred', m.starred)}
                              title={m.starred ? 'Unstar' : 'Star'}
                              className="admin-btn-icon-sm"
                            >
                              <Star size={16} fill={m.starred ? '#F59E0B' : 'none'} color={m.starred ? '#F59E0B' : 'var(--adm-text-faint)'} />
                            </button>

                            <button
                              onClick={() => toggleMessageStatus(m.id, 'read', m.read)}
                              title={m.read ? 'Mark as Unread' : 'Mark as Read'}
                              className="admin-btn-icon-sm"
                            >
                              <CheckCircle size={16} color={m.read ? 'var(--adm-text-faint)' : '#10B981'} />
                            </button>

                            <button
                              onClick={() => setReplyingMessage(m)}
                              className="admin-btn-primary"
                              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                            >
                              <Send size={13} />
                              <span>{m.replied ? 'Reply Again' : 'Compose Reply'}</span>
                            </button>

                            <button
                              onClick={() => deleteMessage(m)}
                              title="Permanently delete message"
                              style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '8px',
                                padding: '8px',
                                color: '#EF4444',
                                cursor: 'pointer'
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <p style={{ color: 'var(--adm-text-body)', fontSize: '0.94rem', lineHeight: 1.7, background: 'var(--adm-surface-trans)', padding: '16px', borderRadius: '10px', border: '1px solid var(--adm-border-subtle)' }}>
                          {m.message}
                        </p>

                        {/* Attached Cloudinary Media */}
                        {m.imageUrl && (
                          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', borderRadius: '10px', background: 'var(--adm-gold-pill-bg)', border: '1px solid var(--adm-border)' }}>
                            <img
                              src={m.imageUrl}
                              alt="Attachment"
                              style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--adm-gold-primary)' }}
                            />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--adm-gold-primary)', textTransform: 'uppercase' }}>
                                Cloudinary Attached Media
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {m.imageUrl}
                              </div>
                            </div>
                            <a
                              href={m.imageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="admin-btn-primary"
                              style={{ padding: '6px 12px', fontSize: '0.74rem', textDecoration: 'none' }}
                            >
                              <span>Inspect</span>
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        )}

                        {/* Reply Conversation History */}
                        {m.replies && m.replies.length > 0 && (
                          <div style={{ marginTop: '16px', borderTop: '1px solid var(--adm-border-subtle)', paddingTop: '14px' }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-gold-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MailCheck size={14} />
                              <span>GMAIL SMTP DISPATCH HISTORY ({m.replies.length} REPLIES SENT)</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {m.replies.map((rep, idx) => (
                                <div key={idx} style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--adm-gold-pill-bg)', border: '1px solid var(--adm-border-subtle)', fontSize: '0.84rem' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--adm-text-muted)', fontSize: '0.72rem', marginBottom: '6px' }}>
                                    <span>To: <strong style={{ color: 'var(--adm-gold-primary)' }}>{rep.recipientEmail || m.email}</strong></span>
                                    <span>{new Date(rep.sentAt).toLocaleString()}</span>
                                  </div>
                                  <div style={{ fontWeight: 600, color: 'var(--adm-text-title)', marginBottom: '4px' }}>{rep.subject}</div>
                                  <div style={{ color: 'var(--adm-text-body)', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{rep.replyMessage}</div>
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

          {/* =========================================================================
              TAB 5: SKILLS MATRIX
              ========================================================================= */}
          {activeTab === 'skills' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                    Technical Competencies Manager
                  </h2>
                  <p className="admin-header-subtitle">
                    Add, edit, or remove technical skills, categories, and proficiency scores.
                  </p>
                </div>
                <button onClick={handleSaveSkills} className="admin-btn-primary">
                  <Save size={16} />
                  <span>Save Skills Matrix</span>
                </button>
              </div>

              {/* Add New Category Control */}
              <div className="admin-card" style={{ marginBottom: '24px', padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--adm-text-title)' }}>
                    Add New Category:
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Cloud &amp; DevOps or System Architecture"
                    className="admin-form-input"
                    style={{ maxWidth: '340px', flex: '1 1 220px' }}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCategory();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="admin-btn-sync"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  >
                    <Plus size={14} />
                    <span>Create Category</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                {skills.map((cat, catIdx) => (
                  <div key={cat.category || catIdx} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.2rem', color: 'var(--adm-gold-primary)', margin: 0 }}>
                        {cat.category}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(catIdx)}
                        title="Delete category"
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          borderRadius: '8px',
                          padding: '4px 8px',
                          color: '#EF4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.72rem'
                        }}
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    </div>

                    {/* Skill items list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                      {cat.items?.map((item, itemIdx) => (
                        <div key={item.name || itemIdx} style={{ background: 'var(--adm-surface-trans)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--adm-border-subtle)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '0.88rem', color: 'var(--adm-text-title)', fontWeight: 600 }}>{item.name}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--adm-gold-primary)' }}>{item.level}%</span>
                              <button
                                type="button"
                                onClick={() => deleteSkillItem(catIdx, itemIdx)}
                                title="Remove skill"
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: 'var(--adm-text-muted)',
                                  cursor: 'pointer',
                                  padding: '2px',
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Trash2 size={13} style={{ opacity: 0.7 }} />
                              </button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={item.level}
                            onChange={(e) => updateSkillLevel(catIdx, itemIdx, e.target.value)}
                            style={{ width: '100%', accentColor: 'var(--adm-gold-primary)', cursor: 'pointer' }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Add new skill to this category */}
                    <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--adm-border-subtle)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Add skill (e.g. Next.js)..."
                        className="admin-form-input"
                        style={{ padding: '6px 10px', fontSize: '0.82rem', flex: 1 }}
                        value={newSkillInputs[catIdx]?.name || ''}
                        onChange={(e) =>
                          setNewSkillInputs((prev) => ({
                            ...prev,
                            [catIdx]: { ...prev[catIdx], name: e.target.value }
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkillItem(catIdx);
                          }
                        }}
                      />
                      <input
                        type="number"
                        min="50"
                        max="100"
                        title="Proficiency %"
                        className="admin-form-input"
                        style={{ width: '60px', padding: '6px 8px', fontSize: '0.82rem', textAlign: 'center' }}
                        value={newSkillInputs[catIdx]?.level ?? 85}
                        onChange={(e) =>
                          setNewSkillInputs((prev) => ({
                            ...prev,
                            [catIdx]: { ...prev[catIdx], level: e.target.value }
                          }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkillItem(catIdx)}
                        className="admin-btn-sync"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <Plus size={13} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 6: PROFILE & IDENTITY
              ========================================================================= */}
          {activeTab === 'profile' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                  Identity &amp; Profile Configuration
                </h2>
                <p className="admin-header-subtitle">
                  Update your public executive bio, contact details, status indicator, and social profiles.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="admin-card" style={{ maxWidth: '820px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="admin-label">Full Legal Name</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Primary Professional Title</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={profile.title || ''}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="admin-label">Hero Tagline</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={profile.tagline || ''}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="admin-label">Biography &amp; Background Narrative</label>
                  <textarea
                    rows={4}
                    className="admin-form-textarea"
                    value={profile.bio || ''}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label className="admin-label">Contact Email</label>
                    <input
                      type="email"
                      className="admin-form-input"
                      value={profile.email || ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Telephone / WhatsApp</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Location</label>
                    <input
                      type="text"
                      className="admin-form-input"
                      value={profile.location || ''}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label className="admin-label">Status Pill Text (Header/Hero)</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={profile.statusText || ''}
                    onChange={(e) => setProfile({ ...profile, statusText: e.target.value })}
                  />
                </div>

                {/* Social Links */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label className="admin-label">GitHub URL</label>
                    <input
                      type="url"
                      className="admin-form-input"
                      value={profile.github || ''}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">LinkedIn URL</label>
                    <input
                      type="url"
                      className="admin-form-input"
                      value={profile.linkedin || ''}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Twitter / X URL</label>
                    <input
                      type="url"
                      className="admin-form-input"
                      value={profile.twitter || ''}
                      onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                    />
                  </div>
                </div>

                {/* CV / Executive Resume Management Card */}
                <div style={{ marginBottom: '24px', padding: '18px 20px', borderRadius: '14px', background: 'var(--adm-surface)', border: '1px solid var(--adm-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="admin-chart-icon-box" style={{ width: '40px', height: '40px' }}>
                        <FileText size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--adm-text-title)' }}>
                          Executive CV &amp; Resume Pipeline
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--adm-text-muted)', marginTop: '2px' }}>
                          {activeCv ? (
                            <span style={{ color: '#10B981' }}>● Active: {activeCv.originalFilename} ({(activeCv.fileSize / 1024).toFixed(1)} KB)</span>
                          ) : (
                            <span style={{ color: '#EF4444' }}>● No active CV published</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {activeCv && (
                        <button
                          type="button"
                          onClick={handleViewCv}
                          className="admin-btn-secondary"
                        >
                          <Eye size={13} />
                          <span>Preview</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setActiveTab('cv')}
                        className="admin-btn-primary"
                      >
                        <FileText size={13} />
                        <span>Manage in CV Console &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cloudinary Profile Image Uploads */}
                <div style={{ marginBottom: '28px', padding: '20px', borderRadius: '14px', background: 'var(--adm-gold-pill-bg)', border: '1px solid var(--adm-border)' }}>
                  <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', color: 'var(--adm-gold-primary)', marginBottom: '14px' }}>
                    Cloudinary Visual Assets (Hero &amp; About Portraits)
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    {/* Hero Portrait */}
                    <div>
                      <label className="admin-label">Hero Section Portrait</label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <img
                          src={profile.heroImage || '/hero/portrait-gold-cinematic.png'}
                          alt="Hero Portrait"
                          style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid var(--adm-gold-primary)' }}
                        />
                        <label className="admin-btn-primary" style={{ cursor: 'pointer', padding: '8px 14px', fontSize: '0.78rem' }}>
                          <UploadCloud size={14} />
                          <span>Upload New</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadProfileImage(file, 'profile_hero');
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>

                    {/* About Portrait */}
                    <div>
                      <label className="admin-label">About Section Portrait</label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <img
                          src={profile.aboutImage || '/hero/portrait-gold-cinematic.png'}
                          alt="About Portrait"
                          style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid var(--adm-gold-primary)' }}
                        />
                        <label className="admin-btn-primary" style={{ cursor: 'pointer', padding: '8px 14px', fontSize: '0.78rem' }}>
                          <UploadCloud size={14} />
                          <span>Upload New</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadProfileImage(file, 'profile_about');
                            }}
                            style={{ display: 'none' }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="admin-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Save size={16} />
                  <span>Update Profile Configuration</span>
                </button>
              </form>
            </div>
          )}

          {/* =========================================================================
              TAB 7: TIMELINES & JOURNEY
              ========================================================================= */}
          {activeTab === 'education' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                    Career Trajectory &amp; Academic Milestones
                  </h2>
                  <p className="admin-header-subtitle">
                    Configure experience nodes, engineering milestones, and university degrees.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      setEducation([
                        ...education,
                        {
                          degree: 'BSc (Hons) Software Engineering',
                          institution: 'Cardiff Metropolitan University / ICBT Campus',
                          period: '2023 — 2024',
                          badge: 'Academic Milestone',
                          description: 'Coursework completed; final results pending official release.'
                        }
                      ]);
                    }}
                    className="admin-btn-sync"
                  >
                    <Plus size={14} />
                    <span>Add Milestone</span>
                  </button>
                  <button onClick={handleSaveEducation} className="admin-btn-primary">
                    <Save size={16} />
                    <span>Save Trajectory</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {education.map((item, idx) => (
                  <div key={idx} className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
                      <span className="admin-badge-new" style={{ background: 'var(--adm-gold-pill-bg)', border: '1px solid var(--adm-border)', color: 'var(--adm-gold-primary)' }}>
                        Trajectory Node #{idx + 1}
                      </span>
                      <button
                        onClick={() => {
                          setEducation(education.filter((_, i) => i !== idx));
                        }}
                        style={{
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          color: '#EF4444',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '14px' }}>
                      <div>
                        <label className="admin-label">Title / Degree *</label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={item.degree || ''}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].degree = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                      <div>
                        <label className="admin-label">Company / University *</label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={item.institution || ''}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].institution = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                      <div>
                        <label className="admin-label">Period / Years</label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={item.period || ''}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].period = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                      <div>
                        <label className="admin-label">Badge / Status</label>
                        <input
                          type="text"
                          className="admin-form-input"
                          value={item.badge || ''}
                          onChange={(e) => {
                            const updated = [...education];
                            updated[idx].badge = e.target.value;
                            setEducation(updated);
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="admin-label">Description &amp; Key Architectural Responsibilities</label>
                      <textarea
                        rows={3}
                        className="admin-form-textarea"
                        value={item.description || ''}
                        onChange={(e) => {
                          const updated = [...education];
                          updated[idx].description = e.target.value;
                          setEducation(updated);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 8: GMAIL SMTP & NOTIFICATION ENGINE
              ========================================================================= */}
          {activeTab === 'email' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                  Gmail SMTP &amp; Dispatch Engine
                </h2>
                <p className="admin-header-subtitle">
                  Direct SMTP relay integration with Nodemailer, Google App Password, and secure TLS transport.
                </p>
              </div>

              {/* Status Card */}
              <div className="admin-card" style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div className="admin-chart-icon-box" style={{ width: '44px', height: '44px' }}>
                      <MailCheck size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--adm-text-title)', margin: 0 }}>
                        Gmail SMTP Relay Status
                      </h3>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: smtpStatus?.connected ? '#10B981' : '#F59E0B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: smtpStatus?.connected ? '#10B981' : '#F59E0B' }} />
                        <span>{smtpStatus?.connected ? 'Online & Authenticated (Ready for Dispatches)' : 'Verification Required or Standby'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifySmtp}
                    disabled={testingSmtp}
                    className="admin-btn-primary"
                  >
                    <RefreshCw size={14} className={testingSmtp ? 'spin' : ''} />
                    <span>{testingSmtp ? 'Verifying SMTP Relay...' : 'Verify SMTP Connection'}</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '16px', borderTop: '1px solid var(--adm-border-subtle)' }}>
                  <div>
                    <div className="admin-label">Configured Sender</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--adm-text-title)', fontWeight: 600 }}>
                      {smtpStatus?.user || 'uthayanvanojan5@gmail.com'}
                    </div>
                  </div>
                  <div>
                    <div className="admin-label">SMTP Host &amp; Port</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--adm-text-title)', fontWeight: 600 }}>
                      {smtpStatus?.host || 'smtp.gmail.com'}:{smtpStatus?.port || 465}
                    </div>
                  </div>
                  <div>
                    <div className="admin-label">Encryption Layer</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--adm-text-title)', fontWeight: 600 }}>
                      SSL / TLS (Direct Secure Socket)
                    </div>
                  </div>
                  <div>
                    <div className="admin-label">Google App Password</div>
                    <div style={{ fontSize: '0.9rem', color: '#10B981', fontWeight: 600 }}>
                      Protected in Environment Variable
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Test Email */}
              <div className="admin-card" style={{ marginBottom: '28px' }}>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--adm-text-title)', marginBottom: '8px' }}>
                  Dispatch Diagnostic Test Email
                </h3>
                <p style={{ color: 'var(--adm-text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
                  Test your real Gmail SMTP delivery directly from the server to verify inbox reception and HTML luxury styling.
                </p>

                <form onSubmit={handleSendTestEmail} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    placeholder="Enter destination email (default: admin email)"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    className="admin-form-input"
                    style={{ flex: 1, minWidth: '260px' }}
                  />
                  <button
                    type="submit"
                    disabled={testingSmtp}
                    className="admin-btn-primary"
                  >
                    <Send size={15} />
                    <span>{testingSmtp ? 'Transmitting...' : 'Send Test Email'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 9: ACCOUNT SECURITY
              ========================================================================= */}
          {activeTab === 'security' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h2 className="admin-header-title" style={{ fontSize: '1.8rem' }}>
                  Account Security &amp; Master Authentication
                </h2>
                <p className="admin-header-subtitle">
                  Manage the cryptographic credentials for the primary executive administrator account.
                </p>
              </div>

              {/* Administrator Profile Photo Management Card */}
              <div className="admin-card" style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '68px',
                        height: '68px',
                        borderRadius: '50%',
                        padding: '2.5px',
                        background: 'linear-gradient(135deg, #D4A23A, #F5D77F, #8F6B21)',
                        boxShadow: '0 6px 20px rgba(212, 162, 58, 0.25)',
                        flexShrink: 0
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          background: 'var(--adm-surface)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {adminAvatar ? (
                          <img
                            src={adminAvatar}
                            alt="Admin Avatar"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={() => setAdminAvatar('')}
                          />
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#0F172A',
                              color: '#E6B65B',
                              fontSize: '1.25rem',
                              fontWeight: 800,
                              fontFamily: 'var(--font-heading)'
                            }}
                          >
                            UV
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.25rem', color: 'var(--adm-text-title)', margin: '0 0 4px 0' }}>
                        Executive Profile Avatar
                      </h3>
                      <p style={{ color: 'var(--adm-text-muted)', fontSize: '0.82rem', margin: 0 }}>
                        Synced persistently via Cloudinary (<code>portfolio/admin/profile</code>) and MongoDB Atlas.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setIsPhotoModalOpen(true)}
                      className="admin-btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    >
                      <Camera size={15} />
                      <span>{adminAvatar ? 'Change Photo' : 'Upload Photo'}</span>
                    </button>
                    {adminAvatar && (
                      <button
                        type="button"
                        onClick={() => setIsPhotoModalOpen(true)}
                        className="admin-btn-secondary"
                        style={{ padding: '8px 14px', fontSize: '0.82rem', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#EF4444' }}
                      >
                        <Trash2 size={15} />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="admin-card" style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div className="admin-chart-icon-box" style={{ width: '48px', height: '48px' }}>
                  <Shield size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--adm-text-title)' }}>
                    Active Administrator: <span style={{ color: 'var(--adm-gold-primary)' }}>vanojanSE</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--adm-text-muted)', marginTop: '2px' }}>
                    Bcrypt 12 Rounds Hashing &bull; Brute Force Rate Limiting Active (5 attempts/15min)
                  </div>
                </div>
              </div>

              <div className="admin-card" style={{ maxWidth: '650px' }}>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.3rem', color: 'var(--adm-text-title)', marginBottom: '8px' }}>
                  Update Administrator Passphrase
                </h3>
                <p style={{ color: 'var(--adm-text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
                  Update your secret administrative key. Your new passphrase will be cryptographically hashed with 12 rounds of bcrypt before database storage.
                </p>

                <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label className="admin-label">Current Password *</label>
                    <input
                      type="password"
                      required
                      className="admin-form-input"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">New Secure Password (Minimum 8 characters) *</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      className="admin-form-input"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      className="admin-form-input"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="admin-btn-primary"
                    style={{ marginTop: '8px', justifyContent: 'center' }}
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
            className="admin-card"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '24px',
              padding: '36px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.6rem', color: 'var(--adm-text-title)' }}>
                {editingProject === 'new' ? 'Create New Showcase Project' : 'Edit Project Details'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--adm-text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label className="admin-label">Project Title *</label>
                  <input
                    type="text"
                    required
                    className="admin-form-input"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="admin-label">Category *</label>
                  <select
                    className="admin-form-select"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  >
                    <option value="Full-Stack Web">Full-Stack Web</option>
                    <option value="Mobile & Hospitality">Mobile & Hospitality</option>
                    <option value="Enterprise Software">Enterprise Software</option>
                    <option value="Systems & Analytics">Systems & Analytics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Subtitle</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={projectForm.subtitle}
                  onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                />
              </div>

              <div>
                <label className="admin-label">Description *</label>
                <textarea
                  rows={3}
                  required
                  className="admin-form-textarea"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                />
              </div>

              <div>
                <label className="admin-label">Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="React.js, Node.js, SQLite, Three.js"
                  className="admin-form-input"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                />
              </div>

              <div>
                <label className="admin-label">Architecture Highlights (one per line)</label>
                <textarea
                  rows={3}
                  placeholder="Real-time SQLite local storage sync&#10;Sub-millisecond query optimization"
                  className="admin-form-textarea"
                  value={projectForm.highlights}
                  onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                />
              </div>

              {/* GitHub & Live Demo Links */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label className="admin-label">GitHub Repository URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/januuthayan1967-cloud/repo-name"
                    className="admin-form-input"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--adm-text-faint)', marginTop: '4px', display: 'block' }}>
                    Leave empty for projects not yet published on GitHub. The GitHub button appears only when a URL is set.
                  </span>
                </div>
                <div>
                  <label className="admin-label">Live Demo / Deployment URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://your-demo-url.com"
                    className="admin-form-input"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--adm-text-faint)', marginTop: '4px', display: 'block' }}>
                    Optional live demonstration or staging link.
                  </span>
                </div>
              </div>

              {/* Project Image */}
              <div>
                <label className="admin-label">
                  Project Showcase Image (Cloudinary Cloud Storage)
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  {projectForm.image ? (
                    <img
                      src={projectForm.image}
                      alt="Project preview"
                      style={{ width: '64px', height: '44px', objectFit: 'cover', borderRadius: '8px', border: '1.5px solid var(--adm-gold-primary)' }}
                    />
                  ) : (
                    <div style={{ width: '64px', height: '44px', background: 'var(--adm-input-bg)', borderRadius: '8px', border: '1px dashed var(--adm-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Image size={18} color="var(--adm-text-faint)" />
                    </div>
                  )}

                  <label
                    className="admin-btn-primary"
                    style={{
                      padding: '8px 14px',
                      fontSize: '0.75rem',
                      cursor: uploadingImage ? 'wait' : 'pointer',
                      opacity: uploadingImage ? 0.7 : 1
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
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        color: '#EF4444',
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
                  className="admin-form-input"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  style={{ accentColor: 'var(--adm-gold-primary)', width: '18px', height: '18px' }}
                />
                <label htmlFor="featuredToggle" style={{ fontSize: '0.9rem', color: 'var(--adm-text-title)', cursor: 'pointer' }}>
                  Mark as Featured System (Highlighted on Homepage)
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="admin-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Save Project
                </button>
                <button type="button" onClick={() => setEditingProject(null)} className="admin-btn-sync" style={{ justifyContent: 'center' }}>
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

      {/* ADMIN PROFILE PHOTO MANAGEMENT MODAL */}
      <AdminProfilePhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        token={token}
        currentAvatarUrl={adminAvatar}
        adminName={adminUserMeta.name}
        adminRole={adminUserMeta.role}
        onAvatarUpdated={(newUrl) => {
          setAdminAvatar(newUrl);
          showToast(newUrl ? 'Profile photo updated and saved' : 'Profile photo removed');
          fetchData();
        }}
      />

      {/* CONFIRM REMOVE CV MODAL */}
      {confirmRemoveCvModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(2, 4, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setConfirmRemoveCvModalOpen(false)}
        >
          <div
            className="admin-card"
            style={{
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              padding: '32px',
              border: '1.5px solid rgba(239, 68, 68, 0.45)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1.5px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EF4444',
                  flexShrink: 0
                }}
              >
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--adm-text-title)', margin: 0 }}>
                  Confirm CV Removal
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', marginTop: '2px' }}>
                  Irreversible public action
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--adm-text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '24px' }}>
              Are you sure you want to remove <strong style={{ color: 'var(--adm-text-title)' }}>{activeCv?.originalFilename || 'VanojanBSCCV.pdf'}</strong>? Once removed, the &ldquo;Download CV&rdquo; buttons across your public portfolio will be gracefully disabled until you upload a new version.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setConfirmRemoveCvModalOpen(false)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemoveCv}
                className="admin-btn-danger"
              >
                <Trash2 size={15} />
                <span>Confirm Removal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE HISTORICAL CV VERSION MODAL (BUG 2) */}
      {cvToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(2, 4, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => !deletingCvId && setCvToDelete(null)}
        >
          <div
            className="admin-card"
            style={{
              width: '100%',
              maxWidth: '480px',
              borderRadius: '24px',
              padding: '32px',
              border: '1.5px solid rgba(239, 68, 68, 0.45)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1.5px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EF4444',
                  flexShrink: 0
                }}
              >
                <Trash2 size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--adm-text-title)', margin: 0 }}>
                  Permanently Delete Previous CV
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', marginTop: '2px' }}>
                  Irreversible MongoDB &amp; Cloudinary Removal
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--adm-text-body)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '18px' }}>
              Are you sure you want to permanently delete this previous CV version?
            </p>

            <div
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: 'var(--adm-surface-trans)',
                border: '1px solid var(--adm-border-subtle)',
                marginBottom: '22px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--adm-text-title)', fontSize: '0.9rem', marginBottom: '6px' }}>
                <FileText size={16} color="var(--adm-gold-primary)" />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {cvToDelete.originalFilename || 'VanojanBSCCV.pdf'}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div>&bull; Uploaded: {new Date(cvToDelete.uploadDate || cvToDelete.createdAt || Date.now()).toLocaleString()}</div>
                <div>&bull; File Size: {cvToDelete.fileSize ? `${(cvToDelete.fileSize / 1024).toFixed(1)} KB` : 'PDF Document'}</div>
                <div>&bull; Storage: {cvToDelete.cloudinaryPublicId && !cvToDelete.cloudinaryPublicId.startsWith('local_') ? 'Cloudinary Persistent Cloud' : 'Server Storage'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                disabled={Boolean(deletingCvId)}
                onClick={() => setCvToDelete(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={Boolean(deletingCvId)}
                onClick={confirmDeleteCvVersion}
                className="admin-btn-danger"
                style={{ gap: '6px' }}
              >
                <Trash2 size={15} className={deletingCvId ? 'spinning' : ''} />
                <span>{deletingCvId ? 'Deleting...' : 'Permanently Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MESSAGE MODAL (BUG 3) */}
      {messageToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(2, 4, 8, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => !deletingMessageId && setMessageToDelete(null)}
        >
          <div
            className="admin-card"
            style={{
              width: '100%',
              maxWidth: '480px',
              borderRadius: '24px',
              padding: '32px',
              border: '1.5px solid rgba(239, 68, 68, 0.45)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1.5px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EF4444',
                  flexShrink: 0
                }}
              >
                <Trash2 size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--adm-text-title)', margin: 0 }}>
                  Permanently Delete Message
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)', marginTop: '2px' }}>
                  Irreversible MongoDB Atlas &amp; Inbox Removal
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--adm-text-body)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '18px' }}>
              Are you sure you want to permanently delete this contact inquiry from your database?
            </p>

            <div
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: 'var(--adm-surface-trans)',
                border: '1px solid var(--adm-border-subtle)',
                marginBottom: '22px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--adm-text-title)', fontSize: '0.92rem' }}>
                  {messageToDelete.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--adm-text-muted)' }}>
                  {messageToDelete.email}
                </span>
              </div>
              {messageToDelete.subject && (
                <div style={{ color: 'var(--adm-gold-primary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  {messageToDelete.subject}
                </div>
              )}
              {messageToDelete.message && (
                <div style={{ color: 'var(--adm-text-muted)', fontSize: '0.78rem', lineHeight: 1.5, maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  &ldquo;{messageToDelete.message}&rdquo;
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                disabled={Boolean(deletingMessageId)}
                onClick={() => setMessageToDelete(null)}
                className="admin-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={Boolean(deletingMessageId)}
                onClick={confirmDeleteMessage}
                className="admin-btn-danger"
                style={{ gap: '6px' }}
              >
                <Trash2 size={15} className={deletingMessageId ? 'spinning' : ''} />
                <span>{deletingMessageId ? 'Deleting...' : 'Delete Message'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
