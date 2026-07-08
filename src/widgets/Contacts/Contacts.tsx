// src/widgets/Contacts/Contacts.tsx
import { motion, type Variants } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { contacts } from '@/shared/lib/contactsData';
import styles from './Contacts.module.css';

export function Contacts() {
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
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    return (
        <section className={styles.section} id="contacts">
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
                        Контакты
                    </h2>
                </motion.div>

                {/* Контакты */}
                <motion.div
                    className={styles.grid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {contacts.map((contact) => (
                        <motion.a
                            key={contact.name}
                            href={contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactCard}
                            variants={itemVariants}
                            whileHover={{
                                y: -6,
                                scale: 1.05,
                                transition: { duration: 0.2 },
                            }}
                        >
                            <img
                                src={contact.icon}
                                alt={contact.name}
                                className={styles.contactIcon}
                                loading="lazy"
                            />
                            <span className={styles.contactName}>
                                {contact.name}
                            </span>
                            <span className={styles.contactLabel}>
                                {contact.label}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}