// src/widgets/Skills/Skills.tsx
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { fadeInUp, staggerContainer, fadeInScale } from '@/shared/lib/animations';
import { groupSkills } from '@/shared/lib/groupSkills';
import styles from './Skills.module.css';

export function Skills() {
    const categories = groupSkills();

    return (
        <section className={styles.section} id="skills">
            <Container size="xl">
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <h2 className={styles.title}>Мои навыки</h2>
                </motion.div>

                {categories.map((category) => (
                    <div key={category.key} className={styles.category}>
                        <h3 className={styles.categoryTitle}>
                            {category.label}
                        </h3>
                        <motion.div
                            className={styles.grid}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={staggerContainer}
                        >
                            {category.items.map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    className={styles.skillCard}
                                    variants={fadeInScale}
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