export interface User {
  login: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  password: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface CourseCounts {
  totalLessons: number;
  completedLessons: number;
  totalReviews: number;
  completedReviews: number;
}
