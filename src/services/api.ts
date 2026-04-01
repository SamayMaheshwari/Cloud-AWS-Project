import { mockFiles, mockResults, dashboardStats } from "../data/mockData";

const BASE_URL = "https://trcjp7u1ne.execute-api.us-east-1.amazonaws.com/prod";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getToken = () => localStorage.getItem("token");

// Helper to handle fetch and parse robustly
const fetchApi = async (url: string, options: RequestInit) => {
  let res;
  try {
    res = await fetch(url, options);
  } catch (error: any) {
    if (error.message === "Failed to fetch") {
      throw new Error("Failed to fetch: CORS error. Please test from your deployed Vercel domain or enable localhost in AWS API Gateway CORS settings.");
    }
    throw new Error("Network error: " + error.message);
  }

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || "Invalid response from server" };
  }

  if (!res.ok) {
    throw new Error(data.message || `HTTP Error ${res.status}`);
  }

  return data;
};

export const apiService = {
  // ─── AUTH (Real AWS APIs) ───────────────────────────────────────────────

  loginUser: async (credentials: { email: string; password: string }) => {
    const data = await fetchApi(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return { success: true, token: data.token, message: data.message };
  },

  registerUser: async (userData: { name: string; email: string; password: string }) => {
    const data = await fetchApi(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });
    return { success: true, message: data.message };
  },

  forgotPassword: async (email: string) => {
    const data = await fetchApi(`${BASE_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return { success: true, message: data.message };
  },

  resetPassword: async (payload: { email: string; token: string; password: string }) => {
    const data = await fetchApi(`${BASE_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { success: true, message: data.message };
  },

  getUserProfile: async () => {
    const token = getToken();
    if (!token) throw new Error("No token");
    
    let res;
    try {
      res = await fetch(`${BASE_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      throw new Error("Failed to fetch: CORS error. Please test from your deployed Vercel domain.");
    }

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("token");
      throw new Error("TOKEN_EXPIRED");
    }

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text };
    }

    if (!res.ok) throw new Error(data.message || "Failed to load profile");
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  // ─── FILES (mock — no file APIs provided) ──────────────────────────────

  getFiles: async () => {
    await delay(600);
    return [...mockFiles];
  },

  uploadFile: async (file: File) => {
    await delay(2000);
    return { success: true, file: { id: Math.random().toString(), name: file.name, status: "processing" } };
  },

  deleteFile: async (id: string) => {
    await delay(500);
    return { success: true };
  },

  // ─── ANALYSIS (mock) ──────────────────────────────────────────────────

  getResults: async (fileId: string) => {
    await delay(800);
    return { ...mockResults, fileId };
  },

  getDashboardStats: async () => {
    await delay(500);
    return [...dashboardStats];
  },
};
