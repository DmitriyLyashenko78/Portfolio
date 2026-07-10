// src/shared/lib/groupSkills.ts
import { skills, categoryConfig, type CategoryKey } from './skillsData';

export function groupSkills() {
    const grouped = Object.keys(categoryConfig).reduce((acc, key) => {
        const categoryKey = key as CategoryKey;
        acc[categoryKey] = skills.filter(
            (s) => s.category === categoryKey || (categoryKey === 'other' && !s.category)
        );
        return acc;
    }, {} as Record<CategoryKey, typeof skills>);

    // Фильтруем пустые категории
    return Object.entries(grouped)
        .filter(([_, items]) => items.length > 0)
        .map(([key, items]) => ({
            key: key as CategoryKey,
            label: categoryConfig[key as CategoryKey].label,
            items,
        }));
}