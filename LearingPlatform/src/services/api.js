const BASE_URL = import.meta.env.VITE_API_URL || "https://minipro-8.onrender.com";

// Always add /api here because your backend uses /api/*
const API_URL = BASE_URL.endsWith('/api') ? BASE_URL : `${BASE_URL}/api`;

// Helper function to handle responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    if (data.message === "User not found") {
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

const getToken = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user).token : null;
};

// API functions
export const api = {
  // Auth
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return handleResponse(response);
  },

  // Materials
  getMaterials: async () => {
    const response = await fetch(`${API_URL}/materials`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return handleResponse(response);
  },

  // Upload content
  uploadContent: async (formData) => {
    const response = await fetch(`${API_URL}/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    return handleResponse(response);
  },

  // Student details
  submitStudentDetails: async (studentData) => {
    const response = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(studentData),
    });

    return handleResponse(response);
  },

  // Theory
  getTheory: async (subject) => {
    const response = await fetch(`${API_URL}/theory/${subject}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return handleResponse(response);
  },

  // Test
  getTest: async (subject) => {
    const response = await fetch(`${API_URL}/tests/${subject}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return handleResponse(response);
  },

  submitTest: async (subject, answers) => {
    const response = await fetch(`${API_URL}/tests/${subject}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ answers }),
    });

    return handleResponse(response);
  },
};