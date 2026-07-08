// src/widgets/Skills/Skills.tsx
import { motion, type Variants } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { skills } from '@/shared/lib/skillsData';
import styles from './Skills.module.css';

export function Skills() {
    // Анимация для заголовка
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    // Анимация для элементов (stagger)
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
    };

    // Группировка по категориям
    const categories = {
        frontend: skills.filter((s) => s.category === 'frontend'),
        tools: skills.filter((s) => s.category === 'tools'),
        other: skills.filter((s) => s.category === 'other' || !s.category),
    };

    const categoryLabels: Record<keyof typeof categories, string> = {
        frontend: 'Frontend',
        tools: 'Инструменты',
        other: 'Другое',
    };

    // Фильтруем пустые категории
    const nonEmptyCategories = Object.entries(categories)
        .filter(([_, items]) => items.length > 0)
        .map(([key, items]) => ({
            key: key as keyof typeof categories,
            label: categoryLabels[key as keyof typeof categories],
            items,
        }));

    return (
        <section className={styles.section} id="skills">
            <Container size="xl">
                {/* Заголовок */}
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                >
                    <h2 className={styles.title}>
                        Мои навыки
                    </h2>
                </motion.div>

                {/* Список навыков */}
                {nonEmptyCategories.map((category) => (
                    <div key={category.key} className={styles.category}>
                        <h3 className={styles.categoryTitle}>
                            {category.label}
                        </h3>
                        <motion.div
                            className={styles.grid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={containerVariants}
                        >
                            {category.items.map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    className={styles.skillCard}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -6,
                                        scale: 1.05,
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className={styles.skillIcon}
                                        loading="lazy"
                                    />
                                    <span className={styles.skillName}>
                                        {skill.name}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </Container>
        </section>
    );
}