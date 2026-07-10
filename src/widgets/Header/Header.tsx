// src/widgets/Header/Header.tsx
import { useState, useEffect } from 'react';
import { Container } from '@/shared/ui/Container/Container';
import { Button } from '@/shared/ui/Button/Button';
import { NavLinks } from './components/NavLinks'; // ← импортируем новый компонент
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

    // Блокируем скролл страницы при открытом меню (п.2)
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

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
                    <a href="#" className={styles.logo}>
                        <span className={styles.logoName}>[</span>
                        <span className={styles.logoLetters}>DL</span>
                        <span className={styles.logoName}>]</span>
                    </a>

                    <nav className={styles.nav}>
                        <NavLinks items={navItems} onClick={() => {}} isMobile={false} />
                    </nav>

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

                {/* Мобильное меню  */}
                <div
                    className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}
                >
                    <div className={styles.mobileNav}>
                        <NavLinks items={navItems} onClick={handleNavClick} isMobile={true} />
                        <div className={styles.mobileNavAction}>
                            <Button
                                variant="primary"
                                size="lg"
                                fullWidth
                                as="a"
                                href="/cv.pdf"
                                target="_blank"
                                onClick={handleNavClick}
                            >
                                Резюме
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}