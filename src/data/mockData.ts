export interface FileItem {
  id: string;
  name: string;
  uploadDate: string;
  status: "completed" | "failed" | "processing" | "pending";
  size: string;
  type: string;
}

export interface AnalysisResult {
  fileId: string;
  fileName: string;
  uploadDate: string;
  status: "completed" | "failed" | "processing" | "pending";
  errorsFound: number;
  qualityScore: number;
  summary: string;
  errors: { line: number; description: string }[];
}

export const mockFiles: FileItem[] = [
  { id: "1", name: "test.cpp", uploadDate: "2026-03-25", status: "completed", size: "12.4 KB", type: "cpp" },
  { id: "2", name: "notes.pdf", uploadDate: "2026-03-26", status: "processing", size: "245 KB", type: "pdf" },
  { id: "3", name: "project.py", uploadDate: "2026-03-27", status: "completed", size: "8.1 KB", type: "py" },
  { id: "4", name: "readme.txt", uploadDate: "2026-03-24", status: "completed", size: "2.3 KB", type: "txt" },
  { id: "5", name: "main.cpp", uploadDate: "2026-03-23", status: "failed", size: "15.7 KB", type: "cpp" },
  { id: "6", name: "analysis.py", uploadDate: "2026-03-22", status: "completed", size: "5.9 KB", type: "py" },
  { id: "7", name: "report.pdf", uploadDate: "2026-03-21", status: "completed", size: "1.2 MB", type: "pdf" },
  { id: "8", name: "data.txt", uploadDate: "2026-03-20", status: "pending", size: "890 B", type: "txt" },
];

export const mockResults: AnalysisResult = {
  fileId: "1",
  fileName: "test.cpp",
  uploadDate: "2026-03-25",
  status: "completed",
  errorsFound: 3,
  qualityScore: 78,
  summary: "The file contains 3 potential issues including memory leak risks and unused variables. Overall code structure is acceptable with room for optimization.",
  errors: [
    { line: 12, description: "Potential memory leak: allocated memory not freed in exception path" },
    { line: 45, description: "Unused variable 'tempBuffer' declared but never referenced" },
    { line: 89, description: "Missing null check before pointer dereference" },
  ],
};

export const uploadStats = [
  { name: "Mon", uploads: 4 },
  { name: "Tue", uploads: 7 },
  { name: "Wed", uploads: 3 },
  { name: "Thu", uploads: 9 },
  { name: "Fri", uploads: 6 },
  { name: "Sat", uploads: 2 },
  { name: "Sun", uploads: 5 },
];

export const userProfile = {
  name: "Alex Johnson",
  email: "alex@cloudanalyzer.io",
  totalUploads: 47,
  accountCreated: "2025-11-15",
  avatar: "AJ",
};

export const dashboardStats = [
  { title: "Total Files", value: 47, variant: "primary" as const, trend: "+12% this week" },
  { title: "Completed", value: 38, variant: "success" as const },
  { title: "Pending", value: 6, variant: "warning" as const },
  { title: "Failed", value: 3, variant: "destructive" as const },
];
