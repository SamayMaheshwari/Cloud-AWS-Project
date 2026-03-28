import { mockFiles, mockResults, userProfile, dashboardStats } from "../data/mockData";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Auth
  loginUser: async (credentials: any) => {
    await delay(800);
    return { success: true, user: userProfile, token: "mock-token" };
  },
  
  registerUser: async (userData: any) => {
    await delay(1000);
    return { success: true, user: { ...userProfile, ...userData }, token: "mock-token" };
  },

  // Files
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

  // Analysis
  getResults: async (fileId: string) => {
    await delay(800);
    return { ...mockResults, fileId };
  },

  // Stats
  getDashboardStats: async () => {
    await delay(500);
    return [...dashboardStats];
  },
  
  getUserProfile: async () => {
    await delay(300);
    return { ...userProfile };
  }
};
