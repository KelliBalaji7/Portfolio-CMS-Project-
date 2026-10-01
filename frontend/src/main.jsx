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
  CheckCircle2
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
    'Java', 'Spring Boot', 'React', 'HTML5', 'CSS3', 'Bootstrap', 'Python', 'C', 'MySQL', 'PostgreSQL', 'Git', 'GitHub', 'DSA'
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

  // CMS Modal & Authentication State
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  // New item inputs
  const [newProject, setNewProject] = useState({ title: '', desc: '', tags: '' });
  const [newSkill, setNewSkill] = useState('');
  const [newExp, setNewExp] = useState({ company: '', role: '', duration: '', location: '', desc: '' });
  const [newBlog, setNewBlog] = useState({ title: '', summary: '' });
  const [newTestimonial, setNewTestimonial] = useState({ clientName: '', clientRole: '', feedback: '' });
  const [newService, setNewService] = useState({ title: '', desc: '' });
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
        return;
      }
    } catch (err) {
      // Backend offline or unreachable: allow demo admin access
    }

    if (adminUsername === 'admin' && (adminPassword === 'admin123' || adminPassword === 'admin')) {
      setIsAuthenticated(true);
      setAuthToken('demo-jwt-token-active');
    } else {
      setAuthError('Invalid credentials. Use admin / admin123 (or connect to Spring Boot backend)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setAdminPassword('');
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    const projectItem = {
      id: Date.now(),
      title: newProject.title,
      desc: newProject.desc,
      tags: newProject.tags ? newProject.tags.split(',').map(t => t.trim()) : ['React', 'Full Stack']
    };
    setProjects([projectItem, ...projects]);
    setNewProject({ title: '', desc: '', tags: '' });
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
    }
    setNewSkill('');
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter(s => s !== skillToDelete));
  };

  const handleAddExp = (e) => {
    e.preventDefault();
    if (!newExp.company) return;
    setExperiences([{ id: Date.now(), ...newExp }, ...experiences]);
    setNewExp({ company: '', role: '', duration: '', location: '', desc: '' });
  };

  const handleDeleteExp = (id) => {
    setExperiences(experiences.filter(e => e.id !== id));
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title) return;
    setBlogs([{ id: Date.now(), ...newBlog, date: 'Just now' }, ...blogs]);
    setNewBlog({ title: '', summary: '' });
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(b => b.id !== id));
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

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.title) return;
    setServices([{ id: Date.now(), ...newService }, ...services]);
    setNewService({ title: '', desc: '' });
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(s => s.id !== id));
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles([{ name: file.name, size: (file.size / 1024).toFixed(1) + ' KB', date: 'Just now' }, ...uploadedFiles]);
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
          <a href="#contact">Contact</a>
        </div>
        <button className="admin" onClick={() => setIsCmsOpen(true)} style={{ background: 'transparent', cursor: 'pointer', color: '#67e8f9' }}>
          Admin CMS ↗
        </button>
      </nav>

      <main>
        <section className="hero">
          <div>
            <span className="pill">CSE Student • Full Stack Developer</span>
            <h1>Hi, I'm <span>Kelli Balaji</span>.<br/>I build useful digital products.</h1>
            <p>Computer Science student focused on Java, Spring Boot, React and Data Structures & Algorithms. I enjoy turning ideas into clean, scalable software.</p>
            <div className="actions">
              <a className="btn" href="#projects">View Projects <ArrowUpRight size={17}/></a>
              <a className="btn ghost" href="#contact">Contact Me</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="avatar">KB</div>
            <h3>Java + Full Stack</h3>
            <p>Building scalable applications with modern web technologies.</p>
            <div className="mini">
              <span>CGPA</span>
              <strong>8.7</strong>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="eyebrow">ABOUT ME</div>
          <h2>Developer with a problem-solving mindset.</h2>
          <p className="lead">I am pursuing B.Tech in Computer Science and Engineering at Dhanalakshmi Srinivasan University (2023–2027). I have hands-on Java development experience and enjoy working across frontend, backend, databases and machine learning.</p>
        </section>

        <section id="skills">
          <div className="eyebrow">TECH STACK</div>
          <h2>Tools I work with</h2>
          <div className="skillgrid">
            {skills.map(s => (
              <div className="skill" key={s}><Code2 size={18}/>{s}</div>
            ))}
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
            <button onClick={() => setIsCmsOpen(true)}>Open CMS Panel</button>
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

      <footer>© 2026 Kelli Balaji · Built with React & Spring Boot</footer>

      {/* ========================================= */}
      {/* CUSTOM CMS ADMIN MODAL */}
      {/* ========================================= */}
      {isCmsOpen && (
        <div className="modal-overlay" onClick={() => setIsCmsOpen(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <ShieldCheck size={22}/>
                Portfolio Custom CMS Admin Panel
              </h3>
              <button className="close-btn" onClick={() => setIsCmsOpen(false)}>×</button>
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
                    className={`cms-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    <FolderGit2 size={16}/> Projects ({projects.length})
                  </button>
                  <button
                    className={`cms-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                    onClick={() => setActiveTab('skills')}
                  >
                    <Code2 size={16}/> Skills ({skills.length})
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

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1a2f4a' }}>
                    <button className="cms-tab-btn" onClick={handleLogout} style={{ color: '#ef4444' }}>
                      <LogOut size={16}/> Logout
                    </button>
                  </div>
                </div>

                <div className="cms-content">
                  {/* PROJECTS TAB */}
                  {activeTab === 'projects' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Manage Projects</h4>
                      <form onSubmit={handleAddProject} style={{ marginBottom: '24px', background: '#081321', padding: '16px', borderRadius: '10px' }}>
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
                        <button className="btn-sm btn-primary" type="submit"><Plus size={14}/> Add Project</button>
                      </form>

                      <div className="cms-grid">
                        {projects.map(p => (
                          <div className="cms-card" key={p.id}>
                            <div>
                              <h4>{p.title}</h4>
                              <p>{p.desc}</p>
                              <div className="tags" style={{ marginTop: 8 }}>
                                {p.tags.map(t => <span key={t}>{t}</span>)}
                              </div>
                            </div>
                            <button className="btn-sm btn-danger" onClick={() => handleDeleteProject(p.id)}>
                              <Trash2 size={14}/> Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SKILLS TAB */}
                  {activeTab === 'skills' && (
                    <div>
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>Manage Skills</h4>
                      <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <input
                          className="form-input"
                          style={{ flex: 1 }}
                          placeholder="New skill (e.g. Docker, Redis, Kubernetes)"
                          value={newSkill}
                          onChange={e => setNewSkill(e.target.value)}
                        />
                        <button className="btn-sm btn-primary" type="submit"><Plus size={14}/> Add Skill</button>
                      </form>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {skills.map(s => (
                          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0e2038', padding: '6px 12px', borderRadius: '8px', border: '1px solid #1b3558' }}>
                            <span>{s}</span>
                            <button onClick={() => handleDeleteSkill(s)} style={{ background: 'transparent', border: 0, color: '#ef4444', cursor: 'pointer' }}>×</button>
                          </div>
                        ))}
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
                      <h4 style={{ margin: '0 0 16px', color: '#67e8f9' }}>File & Image Uploads</h4>
                      <div style={{ border: '2px dashed #1c395c', borderRadius: '12px', padding: '30px', textAlign: 'center', marginBottom: '20px' }}>
                        <Upload size={32} color="#67e8f9"/>
                        <p style={{ margin: '10px 0 14px', color: '#8fa4bd' }}>Upload project screenshots, resume, or avatar assets</p>
                        <input type="file" onChange={handleFileUpload} style={{ color: '#8fa4bd' }}/>
                      </div>
                      <div className="cms-grid">
                        {uploadedFiles.map((f, i) => (
                          <div className="cms-card" key={i}>
                            <div>
                              <h4>{f.name}</h4>
                              <p>Size: {f.size} · Uploaded: {f.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
