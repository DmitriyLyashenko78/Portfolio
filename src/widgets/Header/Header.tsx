// src/widgets/Header/Header.tsx
import { useState, useEffect } from 'react';
import { Container } from '@/shared/ui/Container/Container';
import { Button } from '@/shared/ui/Button/Button';
import styles from './Header.module.css';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Проекты', href: '#projects' },
    { label: 'Навыки', href: '#skills' },
    { label: 'Контакты', href: '#contacts' },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Отслеживаем скролл для изменения стиля хедера
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Закрываем мобильное меню при клике на ссылку
    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Переключаем мобильное меню
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <Container size="xl">
                <div className={styles.inner}>
                    {/* Логотип */}
                    <a href="#" className={styles.logo}>
                        <span className={styles.logoName}>[</span>
                        <span className={styles.logoLetters}>DL</span>
                        <span className={styles.logoName}>]</span>
                    </a>

                    {/* Десктопная навигация */}
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} className={styles.navLink}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Кнопка "Резюме" (десктоп) */}
                    <div className={styles.actions}>
                        <Button
                            variant="outline"
                            size="sm"
                            as="a"
                            href="/cv.pdf"
                            target="_blank"
                        >
                            Резюме
                        </Button>
                    </div>

                    {/* Кнопка бургер-меню (мобилка) */}
                    <button
                        className={styles.burger}
                        onClick={toggleMobileMenu}
                        aria-label="Открыть меню"
                    >
                        <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen1 : ''}`} />
                        <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen2 : ''}`} />
                        <span className={`${styles.burgerLine} ${isMobileMenuOpen ? styles.burgerLineOpen3 : ''}`} />
                    </button>
                </div>

                {/* Мобильное меню (overlay) */}
                <div
                    className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
                >
                    <nav className={styles.mobileNav}>
                        <ul className={styles.mobileNavList}>
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className={styles.mobileNavLink}
                                        onClick={handleNavClick}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                            <li className={styles.mobileNavAction}>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    as="a"
                                    href="/cv.pdf"
                                    target="_blank"
                                >
                                    Резюме
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    );
}