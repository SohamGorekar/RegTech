// User types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Auth Request/Response types
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

// JWT Payload
export interface JWTPayload {
  userId: string;
  email: string;
}

// Project types
export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  domain: string;
  locationCity: string;
  locationState: string;
  legalStructure: string;
  teamSize: number;
  completedCount: number;
  totalCount: number;
  roadmapData: any; // JSON data
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectListItem {
  id: string;
  name: string;
  description: string | null;
  sector: string; // mapped from domain
  location: string; // formatted from city + state
  structure: string; // mapped from legalStructure
  progress: number; // calculated from completedCount/totalCount
  totalTasks: number;
  completedTasks: number;
  createdAt: string;
}

export interface ProjectsResponse {
  success: boolean;
  projects?: ProjectListItem[];
  stats?: {
    totalProjects: number;
    totalTasksCompleted: number;
    totalTasks: number;
  };
  error?: string;
}

// Express Request with user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}