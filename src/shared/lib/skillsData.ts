// src/shared/lib/skillsData.ts
export interface Skill {
    name: string;
    icon: string;
    category?: 'frontend' | 'tools' | 'other';
}

export const skills: Skill[] = [
    { name: 'React', icon: '/img/skills/react.svg', category: 'frontend' },
    { name: 'TypeScript', icon: '/img/skills/typescript.svg', category: 'frontend' },
    { name: 'Next.js', icon: '/img/skills/nextjs.svg', category: 'frontend' },
    { name: 'Vite', icon: '/img/skills/vite.svg', category: 'frontend' },
    { name: 'CSS Modules', icon: '/img/skills/cssmodules.svg', category: 'frontend' },
    { name: 'Styled Components', icon: '/img/skills/styledcomponents.svg', category: 'frontend' },
    { name: 'RTK Query', icon: '/img/skills/rtkquery.svg', category: 'frontend' },
    { name: 'TanStack Query', icon: '/img/skills/tanstackquery.svg', category: 'frontend' },

    { name: 'Git', icon: '/img/skills/git.svg', category: 'tools' },
    { name: 'GitHub', icon: '/img/skills/github.svg', category: 'tools' },
    { name: 'Vercel', icon: '/img/skills/vercel.svg', category: 'tools' },
    { name: 'Figma', icon: '/img/skills/figma.svg', category: 'tools' },
    { name: 'Material-UI', icon: '/img/skills/materialui.svg', category: 'tools' },
    { name: 'Photoshop', icon: '/img/skills/photoshop.svg', category: 'tools' },
    { name: 'ESLint', icon: '/img/skills/eslint.svg', category: 'tools' },
    { name: 'Prettier', icon: '/img/skills/prettier.svg', category: 'tools' },
];