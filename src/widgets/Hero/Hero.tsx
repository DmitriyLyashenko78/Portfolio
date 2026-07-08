// src/widgets/Hero/Hero.tsx
import { motion, type Variants } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { Button } from '@/shared/ui/Button/Button';
import styles from './Hero.module.css';

export function Hero() {
    // Анимация для текста (появление снизу)
    const textVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    // Анимация для фото (появление с вращением и масштабом)
    const photoVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -5 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut'
            }
        },
    };

    // Анимация для кнопок (появление с задержкой)
    const buttonVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

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
                            variants={photoVariants}
                        >
                            <div className={styles.photoBorder}>
                                <img
                                    src="/img/aavatar.webp"
                                    alt="Имя Фамилия — Frontend Developer"
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
                                variants={textVariants}
                                transition={{ duration: 0.6 }}
                            >
                                <span className={styles.greetingText}>Привет, я</span>
                            </motion.div>

                            {/* Имя */}
                            <motion.h1
                                className={styles.name}
                                initial="hidden"
                                animate="visible"
                                variants={textVariants}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Ляшенко Дмитрий
                            </motion.h1>

                            {/* Описание */}
                            <motion.p
                                className={styles.description}
                                initial="hidden"
                                animate="visible"
                                variants={textVariants}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Front-end разработчик с опытом коммерческой и командной разработки на стеке React / TypeScript / Next.js. Владею инструментами управления стейтом (RTK, TanStack Query) и реализации полного цикла авторизации и CRUD-операций. Уверенно настраиваю управление состоянием и запросами через Redux Toolkit и TanStack Query. Занимаюсь интеграцией API, версткой интерфейсов, валидацией форм и написанием Unit-тестов (Jest). Открыт к новым задачам, ценю чистый код и понятную логику интерфейса.
                            </motion.p>

                            {/* Кнопки */}
                            <motion.div
                                className={styles.actions}
                                initial="hidden"
                                animate="visible"
                                variants={buttonVariants}
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