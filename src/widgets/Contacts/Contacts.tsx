// src/widgets/Contacts/Contacts.tsx
import { motion } from 'framer-motion';
import { Container } from '@/shared/ui/Container/Container';
import { contacts } from '@/shared/lib/contactsData';
import { fadeInUp, contactsContainerVariants, contactsItemVariants } from '@/shared/lib/animations';
import styles from './Contacts.module.css';

export function Contacts() {
    return (
        <section className={styles.section} id="contacts">
            <Container size="xl">
                {/* Заголовок */}
                <motion.div
                    className={styles.header}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <h2 className={styles.title}>Контакты</h2>
                </motion.div>

                {/* Контакты */}
                <motion.div
                    className={styles.grid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={contactsContainerVariants}
                >
                    {contacts.map((contact) => (
                        <motion.a
                            key={contact.name}
                            href={contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contactCard}
                            variants={contactsItemVariants}
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