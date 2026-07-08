// src/widgets/ProjectGrid/components/ProjectCard/ProjectCard.tsx
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/shared/ui/Button/Button';
import type { Project } from '@/types/project';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
            },
        },
    };

    // Фильтруем топики: убираем 'portfolio'
    const displayTopics = project.topics.filter(topic => topic !== 'portfolio');

    return (
        <motion.div
            className={styles.card}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
            {/* Название проекта */}
            <h3 className={styles.title}>{project.name}</h3>

            {/* Описание */}
            <p className={styles.description}>
                {project.description || 'Описание отсутствует'}
            </p>

            {/* Технологии (топики) — без portfolio */}
            {displayTopics.length > 0 && (
                <div className={styles.topics}>
                    {displayTopics.slice(0, 4).map((topic) => (
                        <span key={topic} className={styles.topic}>
                            {topic}
                        </span>
                    ))}
                    {displayTopics.length > 4 && (
                        <span className={styles.topicMore}>+{displayTopics.length - 4}</span>
                    )}
                </div>
            )}

            {/* Кнопки */}
            <div className={styles.actions}>
                {project.homepage && (
                    <Button
                        variant="primary"
                        size="sm"
                        as="a"
                        href={project.homepage}
                        target="_blank"
                    >
                        Смотреть
                    </Button>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    as="a"
                    href={project.html_url}
                    target="_blank"
                >
                    Код
                </Button>
            </div>
        </motion.div>
    );
}