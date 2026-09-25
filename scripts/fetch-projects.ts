// scripts/fetch-projects.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Получаем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_GITHUB_USERNAME = 'DmitriyLyashenko78';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const fallbackPath = path.resolve(__dirname, '../src/projects-fallback.json');
const outputPath = path.resolve(__dirname, '../public/projects.json');

function readFallbackProjects() {
    if (!fs.existsSync(fallbackPath)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(fallbackPath, 'utf-8'));
}

function createFallbackProjectMap() {
    const fallbackProjects = readFallbackProjects();

    return new Map(
        fallbackProjects.flatMap((project: any) => [
            [String(project.id), project],
            [project.html_url?.toLowerCase(), project],
        ])
    );
}

function writeFallbackProjects() {
    if (fs.existsSync(fallbackPath)) {
        fs.copyFileSync(fallbackPath, outputPath);
        return;
    }

    console.error('❌ Нет fallback-файла с проектами!');
    process.exit(1);
}

async function fetchProjects() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
            {
                headers: GITHUB_TOKEN
                    ? { Authorization: `token ${GITHUB_TOKEN}` }
                    : {},
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();
        const fallbackProjectsMap = createFallbackProjectMap();

        // Фильтруем по топику 'portfolio'
        const portfolioProjects = repos
            .filter((repo: any) => repo.topics?.includes('portfolio'))
            .map((repo: any) => {
                const fallbackProject =
                    fallbackProjectsMap.get(String(repo.id)) ||
                    fallbackProjectsMap.get(repo.html_url?.toLowerCase()) ||
                    {};

                return {
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    html_url: repo.html_url,
                    homepage: repo.homepage,
                    topics: repo.topics || [],
                    updated_at: repo.updated_at,
                    stargazers_count: repo.stargazers_count,
                    language: repo.language,
                    ...fallbackProject,
                };
            });

        fs.writeFileSync(outputPath, JSON.stringify(portfolioProjects, null, 2));

    } catch (error) {
        console.error('❌ Ошибка загрузки проектов:', error);

        // Fallback: копируем локальный JSON с реальными проектами
        writeFallbackProjects();
    }
}

fetchProjects();
