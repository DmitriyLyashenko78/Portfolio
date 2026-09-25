// src/widgets/Hero/Hero.tsx
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { Button } from '@/shared/ui/Button/Button';
import {
    heroTextVariants,
    heroPhotoVariants,
    heroButtonVariants,
} from '@/shared/lib/animations';
import styles from './Hero.module.css';

export function Hero() {
    return (
        <section className={styles.hero} id="hero">
            {/* Декоративный фон (световое пятно) */}
            <div className={styles.glow} />
            <div className={styles.glowSecondary} />

            <Container size="xl">
                <div className={styles.content}>
                    {/* Фото + текст в одной сетке */}
                    <div className={styles.grid}>
                        {/* Левая колонка — фото */}
                        <motion.div
                            className={styles.photoWrapper}
                            initial="hidden"
                            animate="visible"
                            variants={heroPhotoVariants}
                        >
                            <div className={styles.photoBorder}>
                                <img
                                    src="/img/aavatar.webp"
                                    alt="Дмитрий Ляшенко — Front-end Developer"
                                    className={styles.photo}
                                    loading="lazy"
                                />
                            </div>

                            {/* Декоративный элемент вокруг фото */}
                            <div className={styles.photoRing} />
                            <div className={styles.photoRingSecondary} />
                        </motion.div>

                        {/* Правая колонка — текст */}
                        <div className={styles.textWrapper}>
                            {/* Приветствие */}
                            <motion.div
                                className={styles.greeting}
                                initial="hidden"
                                animate="visible"
                                variants={heroTextVariants}
                                transition={{ duration: 0.6 }}
                            >
                                <span className={styles.greetingText}>Привет, я</span>
                            </motion.div>

                            {/* Имя */}
                            <motion.h1
                                className={styles.name}
                                initial="hidden"
                                animate="visible"
                                variants={heroTextVariants}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Ляшенко Дмитрий
                            </motion.h1>

                            {/* Описание */}
                            <motion.p
                                className={styles.description}
                                initial="hidden"
                                animate="visible"
                                variants={heroTextVariants}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Front-end разработчик с опытом коммерческой и командной разработки на React, TypeScript и Next.js. Разрабатываю SPA/SSR-интерфейсы, работаю с API, авторизацией, формами, CRUD, Redux Toolkit, RTK Query и TanStack Query. Активно использую AI-инструменты в разработке: для анализа задач, ускорения прототипирования, рефакторинга и поиска решений. Ценю чистую архитектуру, понятную логику интерфейса и внимательность к деталям.
                            </motion.p>

                            {/* Кнопки */}
                            <motion.div
                                className={styles.actions}
                                initial="hidden"
                                animate="visible"
                                variants={heroButtonVariants}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    as="a"
                                    href="#projects"
                                >
                                    Мои проекты
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    as="a"
                                    href="/cv.pdf"
                                    target="_blank"
                                >
                                    Скачать резюме
                                </Button>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
