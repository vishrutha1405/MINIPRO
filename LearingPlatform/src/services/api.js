// frontend/src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'https://minipro-4.onrender.com/api';

// Helper function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    // If the database was reset (seeding), the old token will have an invalid ID
    if (data.message === 'User not found') {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Get auth token
const getToken = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : null;
};

// API functions
export const api = {
  // Auth
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Protected requests with token
  getMaterials: async () => {
    const response = await fetch(`${API_URL}/materials`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return handleResponse(response);
  },

  uploadContent: async (formData) => {
    const response = await fetch(`${API_URL}/uploads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });
    return handleResponse(response);
  },

  submitStudentDetails: async (studentData) => {
    const response = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(studentData)
    });
    return handleResponse(response);
  },

  getTheory: async (subject) => {
    const response = await fetch(`${API_URL}/theory/${subject}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  },

  getTest: async (subject) => {
    const response = await fetch(`${API_URL}/tests/${subject}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return handleResponse(response);
  },

  submitTest: async (subject, answers) => {
    const response = await fetch(`${API_URL}/tests/${subject}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ answers })
    });
    return handleResponse(response);
  }
};