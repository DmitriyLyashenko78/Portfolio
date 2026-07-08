// src/types/project.ts
export interface Project {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics: string[];
    updated_at: string;
    stargazers_count: number;
    language: string | null;
}