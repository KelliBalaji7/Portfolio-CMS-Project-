import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Mail,
  ArrowUpRight,
  Code2,
  Database,
  Server,
  ShieldCheck,
  FolderGit2,
  Briefcase,
  BookOpen,
  MessageSquare,
  Wrench,
  Upload,
  Lock,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  ExternalLink,
  User,
  Edit3,
  BarChart3,
  PieChart,
  TrendingUp,
  Download
} from 'lucide-react';
import './style.css';

const Github = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

function App() {
  // State for CMS data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Data-Driven Fraud Detection in FinTech',
      desc: 'Machine-learning based system to identify suspicious financial transactions, with data processing, feature engineering and an interactive monitoring dashboard.',
      tags: ['Java', 'Python', 'Machine Learning', 'MySQL', 'Pandas']
    },
    {
      id: 2,
      title: 'Portfolio Project with Custom CMS',
      desc: 'A full-stack portfolio platform where projects, skills, experience, blogs, testimonials and services can be managed from a custom admin dashboard.',
      tags: ['React', 'Spring Boot', 'PostgreSQL', 'JWT']
    }
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: 'Java', category: 'Languages', proficiency: 95 },
    { id: 2, name: 'Spring Boot', category: 'Backend', proficiency: 90 },
    { id: 3, name: 'React', category: 'Frontend', proficiency: 88 },
    { id: 4, name: 'PostgreSQL', category: 'Database', proficiency: 86 },
    { id: 5, name: 'MySQL', category: 'Database', proficiency: 85 },
    { id: 6, name: 'Python', category: 'Languages', proficiency: 82 },
    { id: 7, name: 'C', category: 'Languages', proficiency: 80 },
    { id: 8, name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 90 },
    { id: 9, name: 'Bootstrap', category: 'Frontend', proficiency: 85 },
    { id: 10, name: 'Git & GitHub', category: 'Tools', proficiency: 92 },
    { id: 11, name: 'DSA', category: 'Core CS', proficiency: 94 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: 'CodSoft-IT Services',
      role: 'Java Programmer Intern',
      duration: 'Apr 2026 – May 2026',
      location: 'Remote',
      desc: 'Developed Java applications using OOP, collections and file handling; solved DSA problems; tested, debugged and optimized applications while following software-development best practices.'
    }
  ]);

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Building Scalable REST APIs with Spring Boot 3 & JWT',
      summary: 'A deep dive into setting up stateless authentication, role-based authorization, and clean service layers.',
      date: 'May 2026'
    }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      clientName: 'Engineering Lead',
      clientRole: 'Mentor',
      feedback: 'Balaji demonstrated exceptional problem-solving and software design fundamentals during his internship.'
    }
  ]);

  const [services, setServices] = useState([
    { id: 1, title: 'Full Stack Development', desc: 'Modern web applications built with React, Spring Boot, and PostgreSQL.' },
    { id: 2, title: 'REST API & Backend Architecture', desc: 'Secure, scalable, and well-documented microservices and APIs.' },
    { id: 3, title: 'Database Design & Optimization', desc: 'Normalized relational schemas and query optimizations with PostgreSQL.' }
  ]);

  const [messages, setMessages] = useState([]);

  // CMS Modal & Authentication State (Supports direct link via /admin, #admin, /login)
  const [authToken, setAuthToken] = useState(() => {
    try { return localStorage.getItem('portfolio_cms_auth_token') || null; } catch (e) { return null; }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return !!localStorage.getItem('portfolio_cms_auth_token'); } catch (e) { return false; }
  });
  const [isCmsOpen, setIsCmsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const p = window.location.pathname.toLowerCase();
    const h = window.location.hash.toLowerCase();
    return p.includes('/admin') || p.includes('/login') || h === '#admin' || h === '#login';
  });
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [biCategoryFilter, setBiCategoryFilter] = useState('All');
  const [copiedDax, setCopiedDax] = useState(null);

  // Open & Close CMS with direct URL hash synchronization
  const openCms = (tab = null) => {
    setIsCmsOpen(true);
    if (tab) {
      setActiveTab(tab);
      window.location.hash = tab;
    } else if (window.location.hash !== '#admin') {
      window.location.hash = 'admin';
    }
  };

  const closeCms = () => {
    setIsCmsOpen(false);
    if (typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.hash === '#login' || window.location.hash === '#analytics' || window.location.hash === '#powerbi')) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  };

  // Listen for direct URL navigation (#admin, /admin, #login, #analytics, #powerbi)
  useEffect(() => {
    const handleRoute = () => {
      const p = window.location.pathname.toLowerCase();
      const h = window.location.hash.toLowerCase();
      if (p.includes('/admin') || p.includes('/login') || h === '#admin' || h === '#login') {
        setIsCmsOpen(true);
      } else if (h === '#analytics' || h === '#powerbi') {
        setIsCmsOpen(true);
        setActiveTab('analytics');
      }
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  const handleExportPowerBiCsv = () => {
    let csv = "Record_Type,Title_or_Name,Category_or_Segment,Proficiency_or_Weight,Tags_or_Details,Status\n";
    skills.forEach(s => {
      const name = typeof s === 'string' ? s : s.name;
      const cat = typeof s === 'object' && s.category ? s.category : 'General';
      const prof = typeof s === 'object' && s.proficiency ? s.proficiency : 85;
      csv += `"Skill","${name}","${cat}",${prof},"","Active"\n`;
    });
    projects.forEach(p => {
      const tags = Array.isArray(p.tags) ? p.tags.join('; ') : (p.tags || '');
      csv += `"Project","${p.title}","${p.featured ? 'Featured' : 'Standard'}",100,"${tags}","Published"\n`;
    });
    uploadedFiles.forEach(f => {
      csv += `"Media","${f.name}","Asset",1,"${f.size || 'N/A'}","Uploaded"\n`;
    });
    messages.forEach(m => {
      csv += `"Inquiry","${m.name}","Lead",1,"${m.subject || ''}","${m.read ? 'Read' : 'Unread'}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'portfolio_cms_powerbi_dataset.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyDaxSnippet = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedDax(key);
    setTimeout(() => setCopiedDax(null), 2500);
  };

  // Profile / About Section CMS state
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_cms_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: 'Kelli Balaji',
      avatar: 'KB',
      role: 'CSE Student • Full Stack Developer',
      heroBio: 'Computer Science student focused on Java, Spring Boot, React and Data Structures & Algorithms. I enjoy turning ideas into clean, scalable software.',
      aboutTitle: 'Developer with a problem-solving mindset.',
      aboutLead: 'I am pursuing B.Tech in Computer Science and Engineering at Dhanalakshmi Srinivasan University (2023–2027). I have hands-on Java development experience and enjoy working across frontend, backend, databases and machine learning.',
      cgpa: '8.7',
      degree: 'B.Tech CSE (2023–2027)',
      university: 'Dhanalakshmi Srinivasan University'
    };
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // New item inputs & editing state
  const [newProject, setNewProject] = useState({ title: '', desc: '', tags: '', githubUrl: '', projectUrl: '', imageUrl: '', featured: false });
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [newSkill, setNewSkill] = useState('');
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [skillCategory, setSkillCategory] = useState('Backend');
  const [skillProficiency, setSkillProficiency] = useState(90);

  const [newExp, setNewExp] = useState({ company: '', role: '', duration: '', location: '', desc: '' });
  const [newBlog, setNewBlog] = useState({ title: '', summary: '' });
  const [newTestimonial, setNewTestimonial] = useState({ clientName: '', clientRole: '', feedback: '' });
  const [newService, setNewService] = useState({ title: '', desc: '' });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedFile, setCopiedFile] = useState(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Attempt to fetch from backend on mount (gracefully falling back to initial state)
  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data.map(p => ({
            id: p.id,
            title: p.title,
            desc: p.description,
            tags: typeof p.tags === 'string' ? p.tags.split(',').map(t => t.trim()) : (p.tags || [])
          })));
        }
      })
      .catch(() => {});

    fetch(`${API_BASE}/files`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setUploadedFiles(data.map(f => ({
            name: f.name,
            fileName: f.name,
            size: f.size,
            date: new Date(f.lastModified || Date.now()).toLocaleDateString(),
            url: `${API_BASE.replace('/api', '')}${f.fileUrl}`,
            isImage: /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(f.name)
          })));
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      });
      if (res.ok) {
        const data = await res.json();
        setAuthToken(data.token);
        setIsAuthenticated(true);
        try { localStorage.setItem('portfolio_cms_auth_token', data.token); } catch (e) {}
        if (window.location.hash !== '#admin') window.location.hash = 'admin';
        return;
      }
    } catch (err) {
      // Backend offline or unreachable: allow demo admin access
    }

    if (adminUsername === 'admin' && (adminPassword === 'admin123' || adminPassword === 'admin')) {
      setIsAuthenticated(true);
      setAuthToken('demo-jwt-token-active');
      try { localStorage.setItem('portfolio_cms_auth_token', 'demo-jwt-token-active'); } catch (e) {}
      if (window.location.hash !== '#admin') window.location.hash = 'admin';
    } else {
      setAuthError('Invalid credentials. Use admin / admin123 (or connect to Spring Boot backend)');
    }
  };

  const handleLogout = () => {
    try { localStorage.removeItem('portfolio_cms_auth_token'); } catch (e) {}
    setIsAuthenticated(false);
    setAuthToken(null);
    setAdminPassword('');
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('portfolio_cms_profile', JSON.stringify(profile));
    } catch (err) {}
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;

    if (editingProjectId) {
      const updatedItem = {
        id: editingProjectId,
        title: newProject.title,
        desc: newProject.desc,
        tags: typeof newProject.tags === 'string' ? newProject.tags.split(',').map(t => t.trim()) : (newProject.tags || []),
        githubUrl: newProject.githubUrl || '',
        projectUrl: newProject.projectUrl || '',
        imageUrl: newProject.imageUrl || '',
        featured: newProject.featured || false
      };
      setProjects(projects.map(p => p.id === editingProjectId ? updatedItem : p));
      setEditingProjectId(null);
      setNewProject({ title: '', desc: '', tags: '', githubUrl: '', projectUrl: '', imageUrl: '', featured: false });

      if (authToken && authToken !== 'demo-jwt-token-active') {
        try {
          await fetch(`${API_BASE}/projects/${editingProjectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
            body: JSON.stringify({
              title: updatedItem.title,
              description: updatedItem.desc,
              tags: updatedItem.tags.join(', '),
              githubUrl: updatedItem.githubUrl,
              projectUrl: updatedItem.projectUrl,
              imageUrl: updatedItem.imageUrl,
              featured: updatedItem.featured
            })
          });
        } catch (err) {}
      }
      return;
    }

    const tempId = Date.now();
    const projectItem = {
      id: tempId,
      title: newProject.title,
      desc: newProject.desc,
      tags: typeof newProject.tags === 'string' ? newProject.tags.split(',').map(t => t.trim()) : (newProject.tags || ['React', 'Full Stack']),
      githubUrl: newProject.githubUrl || '',
      projectUrl: newProject.projectUrl || '',
      imageUrl: newProject.imageUrl || '',
      featured: newProject.featured || false
    };
    setProjects([projectItem, ...projects]);
    setNewProject({ title: '', desc: '', tags: '', githubUrl: '', projectUrl: '', imageUrl: '', featured: false });

    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        const res = await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            title: projectItem.title,
            description: projectItem.desc,
            tags: projectItem.tags.join(', '),
            githubUrl: projectItem.githubUrl,
            projectUrl: projectItem.projectUrl,
            imageUrl: projectItem.imageUrl,
            featured: projectItem.featured
          })
        });
        if (res.ok) {
          const saved = await res.json();
          setProjects(prev => prev.map(p => p.id === tempId ? { ...p, id: saved.id } : p));
        }
      } catch (err) {}
    }
  };

  const handleEditProject = (p) => {
    setEditingProjectId(p.id);
    setNewProject({
      title: p.title || '',
      desc: p.desc || p.description || '',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
      githubUrl: p.githubUrl || '',
      projectUrl: p.projectUrl || '',
      imageUrl: p.imageUrl || '',
      featured: p.featured || false
    });
  };

  const handleDeleteProject = async (id) => {
    setProjects(projects.filter(p => p.id !== id));
    if (editingProjectId === id) setEditingProjectId(null);
    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        await fetch(`${API_BASE}/projects/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      } catch (err) {}
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    const skillName = newSkill.trim();
    if (!skillName) return;

    if (editingSkillId) {
      setSkills(skills.map(s => (s.id === editingSkillId || s.name === editingSkillId) ? {
        ...s,
        name: skillName,
        category: skillCategory,
        proficiency: Number(skillProficiency)
      } : s));
      setEditingSkillId(null);
      setNewSkill('');
      return;
    }

    const tempId = Date.now();
    const newSkillObj = {
      id: tempId,
      name: skillName,
      category: skillCategory,
      proficiency: Number(skillProficiency)
    };
    setSkills([...skills, newSkillObj]);
    setNewSkill('');

    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        await fetch(`${API_BASE}/skills`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ name: skillName, category: skillCategory, proficiency: Number(skillProficiency) })
        });
      } catch (err) {}
    }
  };

  const handleEditSkill = (s) => {
    setEditingSkillId(s.id || s.name);
    setNewSkill(s.name || s);
    setSkillCategory(s.category || 'Backend');
    setSkillProficiency(s.proficiency || 90);
  };

  const handleDeleteSkill = (skillToDelete) => {
    const sName = skillToDelete.name || skillToDelete;
    setSkills(skills.filter(s => (s.name || s) !== sName));
    if (editingSkillId === (skillToDelete.id || sName)) setEditingSkillId(null);
    if (authToken && authToken !== 'demo-jwt-token-active' && skillToDelete.id) {
      try {
        fetch(`${API_BASE}/skills/${skillToDelete.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      } catch (err) {}
    }
  };

  const handleAddExp = async (e) => {
    e.preventDefault();
    if (!newExp.company) return;
    const tempId = Date.now();
    const expItem = { id: tempId, ...newExp };
    setExperiences([expItem, ...experiences]);
    setNewExp({ company: '', role: '', duration: '', location: '', desc: '' });

    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        const res = await fetch(`${API_BASE}/experience`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(expItem)
        });
        if (res.ok) {
          const saved = await res.json();
          setExperiences(prev => prev.map(e => e.id === tempId ? { ...e, id: saved.id } : e));
        }
      } catch (err) {}
    }
  };

  const handleDeleteExp = async (id) => {
    setExperiences(experiences.filter(e => e.id !== id));
    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        await fetch(`${API_BASE}/experience/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      } catch (err) {}
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title) return;
    const tempId = Date.now();
    const blogItem = { id: tempId, ...newBlog, date: 'Just now' };
    setBlogs([blogItem, ...blogs]);
    setNewBlog({ title: '', summary: '' });

    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        const res = await fetch(`${API_BASE}/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            title: blogItem.title,
            summary: blogItem.summary,
            content: blogItem.summary,
            author: 'Kelli Balaji'
          })
        });
        if (res.ok) {
          const saved = await res.json();
          setBlogs(prev => prev.map(b => b.id === tempId ? { ...b, id: saved.id } : b));
        }
      } catch (err) {}
    }
  };

  const handleDeleteBlog = async (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        await fetch(`${API_BASE}/blogs/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      } catch (err) {}
    }
  };

  const handleAddTestimonial = (e) => {
    e.preventDefault();
    if (!newTestimonial.clientName) return;
    setTestimonials([{ id: Date.now(), ...newTestimonial }, ...testimonials]);
    setNewTestimonial({ clientName: '', clientRole: '', feedback: '' });
  };

  const handleDeleteTestimonial = (id) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newService.title) return;
    const tempId = Date.now();
    const serviceItem = { id: tempId, ...newService };
    setServices([serviceItem, ...services]);
    setNewService({ title: '', desc: '' });

    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        const res = await fetch(`${API_BASE}/services`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            title: serviceItem.title,
            description: serviceItem.desc
          })
        });
        if (res.ok) {
          const saved = await res.json();
          setServices(prev => prev.map(s => s.id === tempId ? { ...s, id: saved.id } : s));
        }
      } catch (err) {}
    }
  };

  const handleDeleteService = async (id) => {
    setServices(services.filter(s => s.id !== id));
    if (authToken && authToken !== 'demo-jwt-token-active') {
      try {
        await fetch(`${API_BASE}/services/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
      } catch (err) {}
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const msg = {
      id: Date.now(),
      ...contactForm,
      date: new Date().toLocaleTimeString()
    };
    setMessages([msg, ...messages]);
    setContactSubmitted(true);

    try {
      await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
    } catch (err) {}

    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const localBlob = URL.createObjectURL(file);
    const isImg = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);
    const tempFile = {
      name: file.name,
      fileName: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      date: 'Just now',
      url: localBlob,
      isImage: isImg
    };
    setUploadedFiles(prev => [tempFile, ...prev]);

    const formData = new FormData();
    formData.append('file', file);
    try {
      const headers = {};
      if (authToken && authToken !== 'demo-jwt-token-active') {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      const res = await fetch(`${API_BASE}/files/upload`, {
        method: 'POST',
        headers,
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        const serverUrl = data.fileUrl ? `${API_BASE.replace('/api', '')}${data.fileUrl}` : localBlob;
        setUploadedFiles(prev => prev.map(f => f.name === file.name ? {
          ...f,
          name: data.originalName || file.name,
          fileName: data.fileName,
          url: serverUrl,
          isImage: isImg
        } : f));
      }
    } catch (err) {}
    setIsUploading(false);
  };

  const handleDeleteFile = async (nameToDelete) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== nameToDelete && f.fileName !== nameToDelete));
    try {
      await fetch(`${API_BASE}/files/${nameToDelete}`, { method: 'DELETE' });
    } catch (err) {}
  };

  const handleCopyLink = (url, name) => {
    if (url) {
      navigator.clipboard.writeText(url);
      setCopiedFile(name);
      setTimeout(() => setCopiedFile(null), 2500);
    }
  };

  return (
    <>
      <nav>
        <b>KB.</b>
        <div>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#services">Services</a>
          <a href="#media">Media</a>
          <a href="#analytics" onClick={(e) => { e.preventDefault(); openCms('analytics'); }} style={{ color: '#f2c811', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <BarChart3 size={14}/> Power BI
          </a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#admin" className="admin" onClick={(e) => { e.preventDefault(); openCms(); }} style={{ background: 'transparent', cursor: 'pointer', color: '#67e8f9', display: 'inline-flex', alignItems: 'center' }}>
          Admin CMS ↗
        </a>
      </nav>

      <main>
        <section className="hero">
          <div>
            <span className="pill">{profile.role}</span>
            <h1>Hi, I'm <span>{profile.name}</span>.<br/>I build useful digital products.</h1>
            <p>{profile.heroBio}</p>
            <div className="actions">
              <a className="btn" href="#projects">View Projects <ArrowUpRight size={17}/></a>
              <a className="btn ghost" href="#contact">Contact Me</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="avatar">{profile.avatar}</div>
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
            <div className="mini">
              <span>CGPA</span>
              <strong>{profile.cgpa}</strong>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="eyebrow">ABOUT ME</div>
          <h2>{profile.aboutTitle}</h2>
          <p className="lead">{profile.aboutLead}</p>
        </section>

        <section id="skills">
          <div className="eyebrow">TECH STACK</div>
          <h2>Tools I work with</h2>
          <div className="skillgrid">
            {skills.map(s => {
              const skillName = s.name || s;
              return (
                <div className="skill" key={skillName}>
                  <Code2 size={18}/>
                  <span>{skillName}</span>
                  {s.proficiency && (
                    <span style={{ fontSize: '11px', color: '#67e8f9', marginLeft: 'auto', background: '#071526', padding: '2px 6px', borderRadius: '4px' }}>
                      {s.proficiency}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section id="projects">
          <div className="eyebrow">PROJECTS</div>
          <h2>Selected work</h2>
          <div className="cards">
            {projects.map((p, i) => (
              <article className="project" key={p.id || p.title}>
                <div className="projecttop">
                  <span>0{i + 1}</span>
                  <ArrowUpRight/>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience">
          <div className="eyebrow">EXPERIENCE</div>
          <h2>Work & Internships</h2>
          {experiences.map(exp => (
            <div className="timeline" key={exp.id}>
              <strong>{exp.company} · {exp.role} ({exp.location})</strong>
              <span>{exp.duration}</span>
              <p>{exp.desc}</p>
            </div>
          ))}
        </section>

        <section id="services">
          <div className="eyebrow">SERVICES</div>
          <h2>What I Deliver</h2>
          <div className="cards">
            {services.map(srv => (
              <article className="project" key={srv.id}>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="features">
          <div><Server/><h3>Spring Boot</h3><p>REST APIs and backend services.</p></div>
          <div><Database/><h3>PostgreSQL</h3><p>Structured content storage for the CMS.</p></div>
          <div><ShieldCheck/><h3>JWT Security</h3><p>Protected admin authentication.</p></div>
        </section>

        <section id="media">
          <div className="eyebrow">MEDIA & ASSETS</div>
          <h2>Image & File Upload Center</h2>
          <p className="lead">Upload and preview project screenshots, documents, and media assets with instant URL generation.</p>

          <label className="upload-dropzone" style={{ display: 'block', marginTop: '24px' }}>
            <Upload size={38} color="#67e8f9" style={{ margin: '0 auto 12px', display: 'block' }}/>
            <strong style={{ display: 'block', fontSize: '16px', color: '#eaf2ff' }}>
              {isUploading ? 'Uploading file to server...' : 'Click or Drag & Drop to Upload File or Image'}
            </strong>
            <span style={{ fontSize: '13px', color: '#8fa4bd', marginTop: '6px', display: 'block' }}>
              PNG, JPG, SVG, WebP, GIF, PDF, Docs (Max 10MB)
            </span>
            <input type="file" onChange={handleFileUpload} style={{ display: 'none' }}/>
          </label>

          <div className="file-grid">
            {uploadedFiles.map((f, i) => (
              <div className="file-card" key={f.fileName || f.name || i}>
                <div className="file-thumb">
                  {f.isImage && f.url ? (
                    <img src={f.url} alt={f.name}/>
                  ) : (
                    <FileText size={28} color="#67e8f9"/>
                  )}
                </div>
                <div className="file-details">
                  <strong title={f.name}>{f.name}</strong>
                  <span>{f.size} · {f.date}</span>
                  <div className="file-btns">
                    {f.url && (
                      <>
                        <button
                          type="button"
                          className="btn-copy"
                          onClick={() => handleCopyLink(f.url, f.name)}
                        >
                          {copiedFile === f.name ? <><Check size={12}/> Copied</> : <><Copy size={12}/> Copy URL</>}
                        </button>
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-copy"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <ExternalLink size={12}/> Open
                        </a>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteFile(f.fileName || f.name)}
                      style={{ background: 'transparent', border: 0, color: '#ef4444', cursor: 'pointer', marginLeft: 'auto' }}
                      title="Delete file"
                    >
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="admin" className="cms">
          <div>
            <div className="eyebrow">CUSTOM CMS</div>
            <h2>Manage your portfolio without editing code.</h2>
            <p>Admin dashboard for creating, editing and deleting Projects, Skills, Experience, Blogs, Testimonials and Services, plus image/file uploads and contact messages.</p>
          </div>
          <div className="panel">
            <b>Admin Dashboard</b>
            <div className="panelrow"><span>Projects</span><strong>{projects.length}</strong></div>
            <div className="panelrow"><span>Skills</span><strong>{skills.length}</strong></div>
            <div className="panelrow"><span>Blog posts</span><strong>{blogs.length}</strong></div>
            <div className="panelrow"><span>Contact Inquiries</span><strong>{messages.length}</strong></div>
            <button onClick={openCms}>Open CMS Panel</button>
          </div>
        </section>

        {/* POWER BI DASHBOARD PUBLIC SECTION */}
        <section id="analytics" style={{ borderTop: '1px solid #14253a', padding: '70px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '35px' }}>
            <div>
              <div className="eyebrow" style={{ color: '#f2c811' }}>EXECUTIVE TELEMETRY</div>
              <h2 style={{ margin: '8px 0' }}>Power BI Portfolio Analytics</h2>
              <p style={{ margin: 0, color: '#9fb0c7', maxWidth: '620px' }}>
                Interactive business intelligence tracking tech stack competency, project deliveries, asset distribution, and portfolio telemetry.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn" onClick={() => openCms('analytics')} style={{ background: '#f2c811', color: '#07111f', fontWeight: 700 }}>
                <BarChart3 size={16}/> Open Power BI Explorer
              </button>
              <button className="btn ghost" onClick={handleExportPowerBiCsv} style={{ borderColor: '#f2c811', color: '#f2c811' }}>
                <Download size={16}/> Export Dataset (.CSV)
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px', marginBottom: '24px' }}>
            <div style={{ background: '#0a1727', border: '1px solid #1b3558', borderTop: '3px solid #f2c811', borderRadius: '14px', padding: '20px' }}>
              <div style={{ color: '#8fa4bd', fontSize: '12px', textTransform: 'uppercase' }}>Total Projects</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: '6px' }}>{projects.length}</div>
              <div style={{ color: '#10b981', fontSize: '12px', marginTop: '4px' }}>+100% Production Ready</div>
            </div>
            <div style={{ background: '#0a1727', border: '1px solid #1b3558', borderTop: '3px solid #118dff', borderRadius: '14px', padding: '20px' }}>
              <div style={{ color: '#8fa4bd', fontSize: '12px', textTransform: 'uppercase' }}>Avg Proficiency</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
                {skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + (typeof s === 'object' && s.proficiency ? s.proficiency : 85), 0) / skills.length) : 85}%
              </div>
              <div style={{ color: '#67e8f9', fontSize: '12px', marginTop: '4px' }}>Benchmark &gt;85% High</div>
            </div>
            <div style={{ background: '#0a1727', border: '1px solid #1b3558', borderTop: '3px solid #00bcf2', borderRadius: '14px', padding: '20px' }}>
              <div style={{ color: '#8fa4bd', fontSize: '12px', textTransform: 'uppercase' }}>Active Skills Tracked</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: '6px' }}>{skills.length}</div>
              <div style={{ color: '#a78bfa', fontSize: '12px', marginTop: '4px' }}>Frontend, Backend, DB, DevOps</div>
            </div>
            <div style={{ background: '#0a1727', border: '1px solid #1b3558', borderTop: '3px solid #10b981', borderRadius: '14px', padding: '20px' }}>
              <div style={{ color: '#8fa4bd', fontSize: '12px', textTransform: 'uppercase' }}>Media Assets & Leads</div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: '6px' }}>{uploadedFiles.length + messages.length}</div>
              <div style={{ color: '#38bdf8', fontSize: '12px', marginTop: '4px' }}>{uploadedFiles.length} Assets · {messages.length} Inquiries</div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="eyebrow">CONTACT</div>
          <h2>Let's build something useful.</h2>
          <p>Have a project, internship opportunity or collaboration idea? Send a message directly:</p>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            {contactSubmitted && (
              <div className="success-msg">
                <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: 6 }}/>
                Thank you! Your message has been received and stored in the CMS.
              </div>
            )}
            <div className="form-group">
              <label>Your Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Balaji"
                required
                value={contactForm.name}
                onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Your Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="your.email@example.com"
                required
                value={contactForm.email}
                onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                className="form-input"
                type="text"
                placeholder="Project inquiry or internship"
                required
                value={contactForm.subject}
                onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-textarea"
                rows="4"
                placeholder="Write your message here..."
                required
                value={contactForm.message}
                onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
              ></textarea>
            </div>
            <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
              <Mail size={16}/> Send Message
            </button>
          </form>

          <div className="social" style={{ marginTop: 40 }}>
            <a href="https://github.com/KelliBalaji7"><Github/> GitHub</a>
            <a href="https://www.linkedin.com/"><Linkedin/> LinkedIn</a>
            <a href="mailto:balajikelli789@gmail.com"><Mail size={17}/> balajikelli789@gmail.com</a>
          </div>
        </section>
      </main>

      <footer>
        © 2026 Kelli Balaji · Built with React & Spring Boot ·{' '}
        <a href="#admin" onClick={(e) => { e.preventDefault(); openCms(); }} style={{ color: '#67e8f9', textDecoration: 'underline' }}>
          CMS Admin Login & Dashboard ↗
        </a>
      </footer>

      {/* ========================================= */}
      {/* CUSTOM CMS ADMIN MODAL */}
      {/* ========================================= */}
      {isCmsOpen && (
        <div className="modal-overlay" onClick={closeCms}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <ShieldCheck size={22}/>
                Portfolio Custom CMS Admin Panel
              </h3>
              <button className="close-btn" onClick={closeCms}>×</button>
            </div>

            {!isAuthenticated ? (
              <div style={{ padding: '40px 24px', maxWidth: '400px', margin: 'auto', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Lock size={36} color="#67e8f9"/>
                  <h3 style={{ margin: '10px 0 5px' }}>Admin Authentication</h3>
                  <p style={{ color: '#8fa4bd', fontSize: '13px' }}>Sign in with Spring Security JWT or Demo Admin</p>
                </div>
                {authError && <div style={{ color: '#ef4444', fontSize: '13px', marginBottom: '14px', textAlign: 'center' }}>{authError}</div>}
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      className="form-input"
                      type="text"
                      value={adminUsername}
                      onChange={e => setAdminUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-input"
                      type="password"
                      placeholder="admin123"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    Sign In to CMS
                  </button>
                  <p style={{ fontSize: '12px', color: '#68809e', textAlign: 'center', marginTop: '14px' }}>
                    Default demo credentials: <code>admin</code> / <code>admin123</code>
                  </p>
                </form>
              </div>
            ) : (
              <div className="cms-body">
                <div className="cms-sidebar">
                  <button
                    className={`cms-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
                    onClick={() => setActiveTab('about')}
                  >
                    <User size={16}/> About & Bio
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveTab('skills')}
                  >
                    <Code2 size={16}/> Skills ({skills.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    <FolderGit2 size={16}/> Projects ({projects.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                    onClick={() => setActiveTab('experience')}
                  >
                    <Briefcase size={16}/> Experience ({experiences.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('blogs')}
                  >
                    <BookOpen size={16}/> Blogs ({blogs.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
                    onClick={() => setActiveTab('services')}
                  >
                    <Wrench size={16}/> Services ({services.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                  >
                    <MessageSquare size={16}/> Inquiries ({messages.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                  >
                    <Upload size={16}/> Files ({uploadedFiles.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                    style={activeTab === 'analytics' ? { background: '#25200c', color: '#f2c811', border: '1px solid #f2c811' } : { color: '#f2c811' }}
                  >
                    <BarChart3 size={16}/> Power BI Analytics
                  </button>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1a2f4a' }}>
                    <button className="cms-tab-btn" onClick={handleLogout} style={{ color: '#ef4444' }}>
                      <LogOut size={16}/> Logout
                    </button>
                  </div>
                </div>

                <div className="cms-content">
                  {/* ABOUT & BIO TAB */}
                  {activeTab === 'about' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Manage About Me & Profile</h4>
                      {profileSaved && (
                        <div style={{ background: '#064e3b', color: '#a7f3d0', padding: '12px 14px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 size={16}/> Profile successfully saved and updated live on the portfolio!
                        </div>
                      )}
                      <form onSubmit={handleProfileSave} style={{ background: '#081321', padding: '20px', borderRadius: '12px', border: '1px solid #1b3558' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div className="form-group">
                            <label>Full Name</label>
                            <input
                              className="form-input"
                              value={profile.name}
                              onChange={e => setProfile({ ...profile, name: e.target.value })}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Avatar Initials (e.g. KB)</label>
                            <input
                              className="form-input"
                              value={profile.avatar}
                              onChange={e => setProfile({ ...profile, avatar: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Professional Role / Headline</label>
                          <input
                            className="form-input"
                            value={profile.role}
                            onChange={e => setProfile({ ...profile, role: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Hero Summary Bio</label>
                          <textarea
                            className="form-textarea"
                            rows="2"
                            value={profile.heroBio}
                            onChange={e => setProfile({ ...profile, heroBio: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>About Section Heading</label>
                          <input
                            className="form-input"
                            value={profile.aboutTitle}
                            onChange={e => setProfile({ ...profile, aboutTitle: e.target.value })}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>About Section Detailed Story</label>
                          <textarea
                            className="form-textarea"
                            rows="3"
                            value={profile.aboutLead}
                            onChange={e => setProfile({ ...profile, aboutLead: e.target.value })}
                            required
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div className="form-group">
                            <label>Degree & University</label>
                            <input
                              className="form-input"
                              value={profile.degree}
                              onChange={e => setProfile({ ...profile, degree: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>CGPA</label>
                            <input
                              className="form-input"
                              value={profile.cgpa}
                              onChange={e => setProfile({ ...profile, cgpa: e.target.value })}
                            />
                          </div>
                        </div>

                        <button className="btn-sm btn-primary" type="submit" style={{ marginTop: '10px', padding: '10px 18px' }}>
                          <Check size={14}/> Save & Publish Profile
                        </button>
                      </form>
                    </div>
                  )}

                  {/* PROJECTS TAB */}
                  {activeTab === 'projects' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>
                        {editingProjectId ? 'Edit Project' : 'Manage Projects'}
                      </h4>
                      <form onSubmit={handleAddProject} style={{ marginBottom: '24px', background: '#081321', padding: '18px', borderRadius: '12px', border: '1px solid #1b3558' }}>
                        <div className="form-group">
                          <label>Project Title</label>
                          <input
                            className="form-input"
                            placeholder="e.g. AI Fraud Detector"
                            value={newProject.title}
                            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            className="form-textarea"
                            placeholder="Detailed project summary..."
                            rows="2"
                            value={newProject.desc}
                            onChange={e => setNewProject({ ...newProject, desc: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Tags (comma separated)</label>
                          <input
                            className="form-input"
                            placeholder="Java, Spring Boot, React, PostgreSQL"
                            value={newProject.tags}
                            onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <div className="form-group">
                            <label>GitHub Repository URL</label>
                            <input
                              className="form-input"
                              placeholder="https://github.com/..."
                              value={newProject.githubUrl || ''}
                              onChange={e => setNewProject({ ...newProject, githubUrl: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Live Demo URL</label>
                            <input
                              className="form-input"
                              placeholder="https://..."
                              value={newProject.projectUrl || ''}
                              onChange={e => setNewProject({ ...newProject, projectUrl: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Thumbnail / Image URL</label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              className="form-input"
                              style={{ flex: 1 }}
                              placeholder="https://... or select uploaded file"
                              value={newProject.imageUrl || ''}
                              onChange={e => setNewProject({ ...newProject, imageUrl: e.target.value })}
                            />
                            {uploadedFiles.length > 0 && (
                              <select
                                className="form-input"
                                style={{ width: '180px' }}
                                onChange={e => e.target.value && setNewProject({ ...newProject, imageUrl: e.target.value })}
                                defaultValue=""
                              >
                                <option value="" disabled>Pick Asset...</option>
                                {uploadedFiles.map((f, i) => (
                                  <option key={i} value={f.url}>{f.name}</option>
                                ))}
                              </select>
                            )}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '12px' }}>
                          <button className="btn-sm btn-primary" type="submit">
                            {editingProjectId ? <><Check size={14}/> Update Project</> : <><Plus size={14}/> Add Project</>}
                          </button>
                          {editingProjectId && (
                            <button
                              type="button"
                              className="btn-sm"
                              style={{ background: '#334155', color: '#fff' }}
                              onClick={() => {
                                setEditingProjectId(null);
                                setNewProject({ title: '', desc: '', tags: '', githubUrl: '', projectUrl: '', imageUrl: '', featured: false });
                              }}
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </form>

                      <div className="cms-grid">
                        {projects.map(p => (
                          <div className="cms-card" key={p.id}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h4>{p.title}</h4>
                                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={{ color: '#67e8f9', fontSize: '11px' }}>GitHub ↗</a>}
                              </div>
                              <p style={{ marginTop: '4px' }}>{p.desc || p.description}</p>
                              <div className="tags" style={{ marginTop: 8 }}>
                                {(Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',') : [])).map(t => (
                                  <span key={t}>{t.trim()}</span>
                                ))}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                              <button className="btn-sm btn-primary" onClick={() => handleEditProject(p)}>
                                <Edit3 size={14}/> Edit
                              </button>
                              <button className="btn-sm btn-danger" onClick={() => handleDeleteProject(p.id)}>
                                <Trash2 size={14}/> Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SKILLS TAB */}
                  {activeTab === 'skills' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>
                        {editingSkillId ? 'Edit Skill' : 'Manage Skills'}
                      </h4>
                      <form onSubmit={handleAddSkill} style={{ marginBottom: '24px', background: '#081321', padding: '18px', borderRadius: '12px', border: '1px solid #1b3558' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '12px', alignItems: 'flex-end' }}>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Skill Name</label>
                            <input
                              className="form-input"
                              placeholder="e.g. Java, Docker, PostgreSQL"
                              value={newSkill}
                              onChange={e => setNewSkill(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Category</label>
                            <select
                              className="form-input"
                              value={skillCategory}
                              onChange={e => setSkillCategory(e.target.value)}
                            >
                              <option value="Languages">Languages</option>
                              <option value="Backend">Backend</option>
                              <option value="Frontend">Frontend</option>
                              <option value="Database">Database</option>
                              <option value="Tools">Tools & DevOps</option>
                              <option value="Core CS">Core CS / DSA</option>
                            </select>
                          </div>
                          <div className="form-group" style={{ margin: 0 }}>
                            <label>Proficiency: {skillProficiency}%</label>
                            <input
                              type="range"
                              min="50"
                              max="100"
                              value={skillProficiency}
                              onChange={e => setSkillProficiency(Number(e.target.value))}
                              style={{ width: '100%', accentColor: '#67e8f9' }}
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                          <button className="btn-sm btn-primary" type="submit">
                            {editingSkillId ? <><Check size={14}/> Update Skill</> : <><Plus size={14}/> Add Skill</>}
                          </button>
                          {editingSkillId && (
                            <button
                              type="button"
                              className="btn-sm"
                              style={{ background: '#334155', color: '#fff' }}
                              onClick={() => {
                                setEditingSkillId(null);
                                setNewSkill('');
                                setSkillProficiency(90);
                              }}
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </form>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                        {skills.map(s => {
                          const sName = s.name || s;
                          const sCat = s.category || 'Technical';
                          const sProf = s.proficiency || 90;
                          return (
                            <div
                              key={sName}
                              style={{
                                background: '#0e2038',
                                border: '1px solid #1b3558',
                                borderRadius: '10px',
                                padding: '12px 14px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong style={{ color: '#eaf2ff', fontSize: '14px' }}>{sName}</strong>
                                <span style={{ fontSize: '11px', color: '#67e8f9', background: '#071526', padding: '2px 8px', borderRadius: '4px' }}>
                                  {sCat}
                                </span>
                              </div>
                              <div style={{ width: '100%', height: '6px', background: '#081321', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: `${sProf}%`, height: '100%', background: 'linear-gradient(90deg, #67e8f9, #38bdf8)' }}/>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                                <span style={{ fontSize: '12px', color: '#8fa4bd' }}>Proficiency: {sProf}%</span>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <button
                                    type="button"
                                    onClick={() => handleEditSkill(s)}
                                    style={{ background: 'transparent', border: 0, color: '#67e8f9', cursor: 'pointer', padding: '2px' }}
                                    title="Edit skill"
                                  >
                                    <Edit3 size={13}/>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSkill(s)}
                                    style={{ background: 'transparent', border: 0, color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                                    title="Delete skill"
                                  >
                                    <Trash2 size={13}/>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* EXPERIENCE TAB */}
                  {activeTab === 'experience' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Manage Experience</h4>
                      <form onSubmit={handleAddExp} style={{ marginBottom: '24px', background: '#081321', padding: '16px', borderRadius: '10px' }}>
                        <div className="form-group">
                          <label>Company & Role</label>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input className="form-input" style={{ flex: 1 }} placeholder="Company" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} required/>
                            <input className="form-input" style={{ flex: 1 }} placeholder="Role" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} required/>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Duration & Location</label>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input className="form-input" style={{ flex: 1 }} placeholder="Duration (e.g. Jan 2026 - Present)" value={newExp.duration} onChange={e => setNewExp({ ...newExp, duration: e.target.value })}/>
                            <input className="form-input" style={{ flex: 1 }} placeholder="Location (e.g. Remote)" value={newExp.location} onChange={e => setNewExp({ ...newExp, location: e.target.value })}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <textarea className="form-textarea" rows="2" value={newExp.desc} onChange={e => setNewExp({ ...newExp, desc: e.target.value })}/>
                        </div>
                        <button className="btn-sm btn-primary" type="submit"><Plus size={14}/> Add Experience</button>
                      </form>

                      <div className="cms-grid">
                        {experiences.map(e => (
                          <div className="cms-card" key={e.id}>
                            <div>
                              <h4>{e.company} — {e.role}</h4>
                              <p style={{ color: '#67e8f9' }}>{e.duration} ({e.location})</p>
                              <p>{e.desc}</p>
                            </div>
                            <button className="btn-sm btn-danger" onClick={() => handleDeleteExp(e.id)}><Trash2 size={14}/> Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BLOGS TAB */}
                  {activeTab === 'blogs' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Manage Blogs</h4>
                      <form onSubmit={handleAddBlog} style={{ marginBottom: '24px', background: '#081321', padding: '16px', borderRadius: '10px' }}>
                        <div className="form-group">
                          <label>Article Title</label>
                          <input className="form-input" placeholder="Title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} required/>
                        </div>
                        <div className="form-group">
                          <label>Summary</label>
                          <textarea className="form-textarea" rows="2" placeholder="Brief summary" value={newBlog.summary} onChange={e => setNewBlog({ ...newBlog, summary: e.target.value })}/>
                        </div>
                        <button className="btn-sm btn-primary" type="submit"><Plus size={14}/> Add Post</button>
                      </form>
                      <div className="cms-grid">
                        {blogs.map(b => (
                          <div className="cms-card" key={b.id}>
                            <div>
                              <h4>{b.title}</h4>
                              <p>{b.summary}</p>
                            </div>
                            <button className="btn-sm btn-danger" onClick={() => handleDeleteBlog(b.id)}><Trash2 size={14}/> Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SERVICES TAB */}
                  {activeTab === 'services' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Manage Services</h4>
                      <form onSubmit={handleAddService} style={{ marginBottom: '24px', background: '#081321', padding: '16px', borderRadius: '10px' }}>
                        <div className="form-group">
                          <label>Service Title</label>
                          <input className="form-input" placeholder="Service title" value={newService.title} onChange={e => setNewService({ ...newService, title: e.target.value })} required/>
                        </div>
                        <div className="form-group">
                          <label>Description</label>
                          <textarea className="form-textarea" rows="2" placeholder="Service description" value={newService.desc} onChange={e => setNewService({ ...newService, desc: e.target.value })}/>
                        </div>
                        <button className="btn-sm btn-primary" type="submit"><Plus size={14}/> Add Service</button>
                      </form>
                      <div className="cms-grid">
                        {services.map(s => (
                          <div className="cms-card" key={s.id}>
                            <div>
                              <h4>{s.title}</h4>
                              <p>{s.desc}</p>
                            </div>
                            <button className="btn-sm btn-danger" onClick={() => handleDeleteService(s.id)}><Trash2 size={14}/> Delete</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* INQUIRIES TAB */}
                  {activeTab === 'messages' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Contact Form Submissions</h4>
                      {messages.length === 0 ? (
                        <p style={{ color: '#68809e' }}>No inquiries received yet. Submit a test message through the public contact form.</p>
                      ) : (
                        <div className="cms-grid">
                          {messages.map(m => (
                            <div className="cms-card" key={m.id}>
                              <div>
                                <h4>{m.name} ({m.email})</h4>
                                <strong style={{ color: '#67e8f9', fontSize: '13px' }}>Subject: {m.subject}</strong>
                                <p style={{ marginTop: '6px' }}>{m.message}</p>
                                <span style={{ fontSize: '11px', color: '#68809e' }}>Received at {m.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* UPLOADS TAB */}
                  {activeTab === 'upload' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Media & Asset Management</h4>
                      <label className="upload-dropzone" style={{ display: 'block', marginBottom: '20px' }}>
                        <Upload size={32} color="#67e8f9" style={{ margin: '0 auto 8px', display: 'block' }}/>
                        <strong style={{ display: 'block', color: '#eaf2ff' }}>
                          {isUploading ? 'Uploading file...' : 'Upload project screenshot or document'}
                        </strong>
                        <span style={{ fontSize: '12px', color: '#8fa4bd', marginTop: '4px', display: 'block' }}>
                          Supported: JPG, PNG, WebP, GIF, SVG, PDF
                        </span>
                        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }}/>
                      </label>

                      <div className="file-grid">
                        {uploadedFiles.map((f, i) => (
                          <div className="file-card" key={f.fileName || f.name || i}>
                            <div className="file-thumb">
                              {f.isImage && f.url ? (
                                <img src={f.url} alt={f.name}/>
                              ) : (
                                <FileText size={24} color="#67e8f9"/>
                              )}
                            </div>
                            <div className="file-details">
                              <strong title={f.name}>{f.name}</strong>
                              <span>{f.size} · {f.date}</span>
                              <div className="file-btns">
                                {f.url && (
                                  <>
                                    <button
                                      type="button"
                                      className="btn-copy"
                                      onClick={() => handleCopyLink(f.url, f.name)}
                                    >
                                      {copiedFile === f.name ? <><Check size={11}/> Copied</> : <><Copy size={11}/> Copy</>}
                                    </button>
                                    <a
                                      href={f.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="btn-copy"
                                      style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                                    >
                                      <ExternalLink size={11}/> Open
                                    </a>
                                  </>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteFile(f.fileName || f.name)}
                                  style={{ background: 'transparent', border: 0, color: '#ef4444', cursor: 'pointer', marginLeft: 'auto' }}
                                  title="Delete file"
                                >
                                  <Trash2 size={13}/>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* POWER BI ANALYTICS TAB */}
                  {activeTab === 'analytics' && (() => {
                    const biCategories = ['All', 'Backend', 'Frontend', 'Database', 'DevOps', 'Core'];
                    const filteredSkillsList = biCategoryFilter === 'All'
                      ? skills
                      : skills.filter(s => (typeof s === 'object' && s.category ? s.category.toLowerCase() : '') === biCategoryFilter.toLowerCase());

                    const biAvg = skills.length > 0
                      ? Math.round(skills.reduce((acc, s) => acc + (typeof s === 'object' && s.proficiency ? s.proficiency : 85), 0) / skills.length)
                      : 85;

                    const catStats = ['Backend', 'Frontend', 'Database', 'DevOps'].map(c => ({
                      name: c,
                      count: skills.filter(s => (typeof s === 'object' && s.category ? s.category.toLowerCase() : '') === c.toLowerCase()).length
                    }));

                    const techCounts = {};
                    projects.forEach(p => {
                      const tagsList = Array.isArray(p.tags) ? p.tags : (typeof p.tags === 'string' ? p.tags.split(',') : []);
                      tagsList.forEach(t => {
                        const clean = t.trim();
                        if (clean) techCounts[clean] = (techCounts[clean] || 0) + 1;
                      });
                    });
                    const topTech = Object.entries(techCounts).sort((a,b) => b[1] - a[1]).slice(0, 6);

                    return (
                      <div>
                        {/* Executive Header & Slicers */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #1f3756' }}>
                          <div>
                            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1px', color: '#f2c811', background: '#25200c', padding: '3px 8px', borderRadius: '4px', display: 'inline-block', marginBottom: '6px' }}>
                              MICROSOFT POWER BI EMBEDDED ENGINE • TELEMETRY
                            </span>
                            <h3 style={{ margin: 0, color: '#eaf2ff', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <BarChart3 size={20} color="#f2c811"/> Portfolio Intelligence & Performance Dashboard
                            </h3>
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#081321', padding: '4px 8px', borderRadius: '8px', border: '1px solid #1c3454' }}>
                              <span style={{ fontSize: '12px', color: '#8fa4bd' }}>Slicer:</span>
                              <select
                                value={biCategoryFilter}
                                onChange={e => setBiCategoryFilter(e.target.value)}
                                style={{ background: 'transparent', border: 0, color: '#67e8f9', fontSize: '12px', outline: 'none', cursor: 'pointer' }}
                              >
                                {biCategories.map(c => <option key={c} value={c} style={{ background: '#0a1728', color: '#fff' }}>{c}</option>)}
                              </select>
                            </div>
                            <button
                              type="button"
                              className="btn-sm"
                              onClick={handleExportPowerBiCsv}
                              style={{ background: '#f2c811', color: '#07111f', fontWeight: 700 }}
                              title="Export CSV dataset for Power BI Desktop"
                            >
                              <Download size={13}/> Export CSV
                            </button>
                            <button
                              type="button"
                              className="btn-sm"
                              onClick={() => copyDaxSnippet('url', `${API_BASE}/projects`)}
                              style={{ background: '#1c3454', color: '#67e8f9' }}
                              title="Copy REST Web Connector URL"
                            >
                              {copiedDax === 'url' ? <><Check size={12}/> Copied</> : <><Copy size={12}/> Copy OData URL</>}
                            </button>
                          </div>
                        </div>

                        {/* Power BI KPI Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                          <div style={{ background: '#081423', border: '1px solid #1b3558', borderTop: '3px solid #f2c811', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '11px', color: '#8fa4bd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Projects</div>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{projects.length}</div>
                            <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <TrendingUp size={12}/> 100% Production Ready
                            </div>
                          </div>
                          <div style={{ background: '#081423', border: '1px solid #1b3558', borderTop: '3px solid #118dff', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '11px', color: '#8fa4bd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Proficiency</div>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{biAvg}%</div>
                            <div style={{ fontSize: '11px', color: '#67e8f9', marginTop: '4px' }}>
                              Benchmark &gt;85% High
                            </div>
                          </div>
                          <div style={{ background: '#081423', border: '1px solid #1b3558', borderTop: '3px solid #00bcf2', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '11px', color: '#8fa4bd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tracked Skills</div>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{skills.length}</div>
                            <div style={{ fontSize: '11px', color: '#a78bfa', marginTop: '4px' }}>
                              Across 4 Core Domains
                            </div>
                          </div>
                          <div style={{ background: '#081423', border: '1px solid #1b3558', borderTop: '3px solid #10b981', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '11px', color: '#8fa4bd', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Media & Inquiries</div>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{uploadedFiles.length + messages.length}</div>
                            <div style={{ fontSize: '11px', color: '#38bdf8', marginTop: '4px' }}>
                              {uploadedFiles.length} Assets · {messages.length} Leads
                            </div>
                          </div>
                        </div>

                        {/* Power BI Visuals Row 1: Competency Bar Chart & Category Share */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '20px' }}>
                          {/* Visual 1: Horizontal Bar Chart */}
                          <div style={{ background: '#081321', border: '1px solid #182e4a', borderRadius: '12px', padding: '18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                              <h4 style={{ margin: 0, fontSize: '14px', color: '#eaf2ff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <BarChart3 size={15} color="#f2c811"/> Skill Competency Index ({filteredSkillsList.length})
                              </h4>
                              <span style={{ fontSize: '11px', color: '#8fa4bd' }}>Sorted by Proficiency</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
                              {filteredSkillsList.map((s, idx) => {
                                const name = typeof s === 'string' ? s : s.name;
                                const prof = typeof s === 'object' && s.proficiency ? s.proficiency : 85;
                                const cat = typeof s === 'object' && s.category ? s.category : 'General';
                                return (
                                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                      <span style={{ color: '#fff', fontWeight: 500 }}>{name} <small style={{ color: '#68809e' }}>({cat})</small></span>
                                      <span style={{ color: prof >= 90 ? '#f2c811' : '#67e8f9', fontWeight: 700 }}>{prof}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '7px', background: '#0e223b', borderRadius: '4px', overflow: 'hidden' }}>
                                      <div style={{ width: `${prof}%`, height: '100%', background: prof >= 90 ? 'linear-gradient(90deg, #f2c811, #eab308)' : 'linear-gradient(90deg, #00bcf2, #118dff)', borderRadius: '4px' }}/>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Visual 2: Category Share */}
                          <div style={{ background: '#081321', border: '1px solid #182e4a', borderRadius: '12px', padding: '18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                              <h4 style={{ margin: 0, fontSize: '14px', color: '#eaf2ff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <PieChart size={15} color="#00bcf2"/> Domain Breakdown
                              </h4>
                              <span style={{ fontSize: '11px', color: '#8fa4bd' }}>Proportions</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                              {catStats.map((item, i) => {
                                const pct = skills.length > 0 ? Math.round((item.count / skills.length) * 100) : 25;
                                const colors = ['#f2c811', '#00bcf2', '#118dff', '#a78bfa'];
                                return (
                                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                      <span style={{ color: '#cbd5e1' }}>{item.name}</span>
                                      <span style={{ color: colors[i % colors.length], fontWeight: 700 }}>{item.count} ({pct}%)</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: '#0e223b', borderRadius: '4px', overflow: 'hidden' }}>
                                      <div style={{ width: `${pct}%`, height: '100%', background: colors[i % colors.length] }}/>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Visuals Row 2: Tech Stack Frequency & DAX Measures */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px', marginBottom: '20px' }}>
                          {/* Visual 3: Tech Frequency */}
                          <div style={{ background: '#081321', border: '1px solid #182e4a', borderRadius: '12px', padding: '18px' }}>
                            <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: '#eaf2ff' }}>
                              Top Tech Stacks in Projects
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              {topTech.map(([tech, count], i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0c1a2c', padding: '6px 10px', borderRadius: '6px' }}>
                                  <span style={{ fontSize: '12px', color: '#e2e8f0' }}>{tech}</span>
                                  <span style={{ fontSize: '11px', color: '#67e8f9', background: '#112947', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>{count} projects</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Visual 4: Power BI DAX Formulas Reference */}
                          <div style={{ background: '#081321', border: '1px solid #182e4a', borderRadius: '12px', padding: '18px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <h4 style={{ margin: 0, fontSize: '14px', color: '#f2c811' }}>
                                Power BI DAX Formulas Library
                              </h4>
                              <span style={{ fontSize: '11px', color: '#8fa4bd' }}>Copy & Paste</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                              {[
                                { name: 'Total Projects', dax: "Total Projects = COUNTROWS('Projects')" },
                                { name: 'Avg Proficiency %', dax: "Avg Proficiency % = DIVIDE(AVERAGE('Skills'[Proficiency]), 100)" },
                                { name: 'Featured Project Ratio', dax: "Featured Ratio = DIVIDE(CALCULATE(COUNTROWS('Projects'), 'Projects'[Featured] = TRUE()), [Total Projects], 0)" },
                                { name: 'Lead SLA Rate', dax: "Lead SLA Rate = DIVIDE(CALCULATE(COUNTROWS('Inquiries'), 'Inquiries'[ReadStatus] = TRUE()), COUNTROWS('Inquiries'), 0)" }
                              ].map(item => (
                                <div key={item.name} style={{ background: '#091524', border: '1px solid #1a3250', borderRadius: '6px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <code style={{ color: '#93c5fd', fontSize: '11px' }}>{item.dax}</code>
                                  <button
                                    type="button"
                                    onClick={() => copyDaxSnippet(item.name, item.dax)}
                                    style={{ background: 'transparent', border: 0, color: '#f2c811', cursor: 'pointer', marginLeft: '8px', padding: '2px' }}
                                    title="Copy DAX"
                                  >
                                    {copiedDax === item.name ? <Check size={12}/> : <Copy size={12}/>}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Power BI Desktop Quick Connect Guide */}
                        <div style={{ background: '#0d1d33', border: '1px solid #1e3b63', borderRadius: '12px', padding: '16px' }}>
                          <h4 style={{ margin: '0 0 8px', color: '#67e8f9', fontSize: '14px' }}>
                            How to load into Microsoft Power BI Desktop
                          </h4>
                          <ol style={{ margin: 0, paddingLeft: '20px', color: '#94a8c2', fontSize: '12px', lineHeight: '1.7' }}>
                            <li>Click <strong>Export CSV</strong> above, open Power BI Desktop &rarr; <strong>Get Data</strong> &rarr; <strong>Text/CSV</strong> &rarr; select the downloaded file.</li>
                            <li>Or connect live via REST API: <strong>Get Data</strong> &rarr; <strong>Web</strong> &rarr; paste <code>https://frontend-ten-snowy-b8s54euo2n.vercel.app/api/projects</code>.</li>
                            <li>Create visuals: Map <strong>Proficiency</strong> to a Bar Chart, and <strong>Category</strong> to a Donut Chart.</li>
                          </ol>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
