// scripts/fetch-projects.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Получаем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Проверяем, что логин задан
if (!GITHUB_USERNAME) {
    console.error('❌ Ошибка: GITHUB_USERNAME не указан в .env');
    console.log('💡 Создай файл .env в корне проекта и добавь: GITHUB_USERNAME=твой_логин');
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

        // Фильтруем по топику 'portfolio'
        const portfolioProjects = repos
            .filter((repo: any) => repo.topics?.includes('portfolio'))
            .map((repo: any) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                homepage: repo.homepage,
                topics: repo.topics || [],
                updated_at: repo.updated_at,
                stargazers_count: repo.stargazers_count,
                language: repo.language,
            }));

        // Сохраняем в public/
        const outputPath = path.resolve(__dirname, '../public/projects.json');
        fs.writeFileSync(outputPath, JSON.stringify(portfolioProjects, null, 2));

    } catch (error) {
        console.error('❌ Ошибка загрузки проектов:', error);

        // Fallback: копируем локальный JSON
        const fallbackPath = path.resolve(__dirname, '../src/projects-fallback.json');
        const outputPath = path.resolve(__dirname, '../public/projects.json');

        if (fs.existsSync(fallbackPath)) {
            fs.copyFileSync(fallbackPath, outputPath);
        } else {
            console.error('❌ Нет даже fallback-файла!');
            process.exit(1);
        }
    }
}

fetchProjects();