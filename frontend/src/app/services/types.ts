export interface User {
    login: string;
    avatar: string;
    levels: UserLevels | undefined;
}

export type UserLevels = {
    [Key in CourseType]?: number
}

export type CourseType = "wani" | "bun";

export interface CourseCounts {
    lessons: number;
    reviews: number;
    heap: number;
}

export type Counts = {
    [Key in CourseType]?: CourseCounts;
};

export interface UserSettings {
    wanikaniApiToken?: string;
    bunproEmail?: string;
}

// Generic API response shape (flexible to accommodate different backend responses)
export interface ApiResponse<T = unknown> {
    success?: boolean;
    data?: T;
    message?: string;
    error?: string;
}