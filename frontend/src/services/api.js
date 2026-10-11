/**
 * Centralized REST API Service for Portfolio and Custom CMS.
 * Handles HTTP requests, JWT token attachment, and unified error handling.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const TOKEN_KEY = 'portfolio_cms_token';

export const authStorage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
  hasToken: () => !!localStorage.getItem(TOKEN_KEY)
};

/**
 * Universal request wrapper appending Bearer authorization headers when available.
 */
async function request(endpoint, options = {}) {
  const token = authStorage.getToken();
  const headers = { ...options.headers };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token && token !== 'demo-jwt-token-active') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP Error ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return null;
}

export const api = {
  // Authentication
  login: async (username, password) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },

  // Projects
  getProjects: () => request('/projects'),
  createProject: (project) => request('/projects', { method: 'POST', body: JSON.stringify(project) }),
  updateProject: (id, project) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  // Skills
  getSkills: () => request('/skills'),
  createSkill: (skill) => request('/skills', { method: 'POST', body: JSON.stringify(skill) }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: 'DELETE' }),

  // Work Experience
  getExperience: () => request('/experience'),
  createExperience: (exp) => request('/experience', { method: 'POST', body: JSON.stringify(exp) }),
  deleteExperience: (id) => request(`/experience/${id}`, { method: 'DELETE' }),

  // Blog Posts
  getBlogs: () => request('/blogs'),
  createBlog: (blog) => request('/blogs', { method: 'POST', body: JSON.stringify(blog) }),
  deleteBlog: (id) => request(`/blogs/${id}`, { method: 'DELETE' }),

  // Services
  getServices: () => request('/services'),
  createService: (service) => request('/services', { method: 'POST', body: JSON.stringify(service) }),
  deleteService: (id) => request(`/services/${id}`, { method: 'DELETE' }),

  // Contact Messages
  submitContact: (contactData) => request('/contact', { method: 'POST', body: JSON.stringify(contactData) }),
  getMessages: () => request('/contact'),
  markMessageRead: (id) => request(`/contact/${id}/read`, { method: 'PUT' }),

  // Media / File Upload
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return request('/files/upload', {
      method: 'POST',
      body: formData
    });
  }
};
