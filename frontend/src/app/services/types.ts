export interface User {
    login: string;
    avatar: string;
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
