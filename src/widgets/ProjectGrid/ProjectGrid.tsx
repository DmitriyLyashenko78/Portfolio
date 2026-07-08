// src/widgets/ProjectGrid/ProjectGrid.tsx
import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { ProjectCard } from './components/ProjectCard/ProjectCard';
import type { Project } from '@/types/project';
import styles from './ProjectGrid.module.css';

export function ProjectGrid() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch('/projects.json');
                if (!response.ok) {
                    throw new Error('Не удалось загрузить проекты');
                }
                const data = await response.json();
                setProjects(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    const headerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    if (loading) {
        return (
            <section className={styles.section} id="projects">
                <Container size="xl">
                    <div className={styles.loading}>
                        <div className={styles.spinner} />
                        <p>Загрузка проектов...</p>
                    </div>
                </Container>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.section} id="projects">
                <Container size="xl">
                    <div className={styles.error}>
                        <p>❌ {error}</p>
                        <p className={styles.errorHint}>
                            Попробуйте обновить страницу
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section className={styles.section} id="projects">
                <Container size="xl">
                    <div className={styles.empty}>
                        <p>Проекты не найдены</p>
                        <p className={styles.emptyHint}>
                            Добавьте топик <code>portfolio</code> к репозиториям на GitHub
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className={styles.section} id="projects">
            <Container size="xl">
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                >
                    <h2 className={styles.title}>
                        Мои проекты
                    </h2>
                    <p className={styles.subtitle}>
                        Пет-проекты, над которыми я работал
                    </p>
                    {/* ← Убрали titleLine */}
                </motion.div>

                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}