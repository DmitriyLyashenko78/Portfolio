// src/widgets/Header/components/NavLinks.tsx
import styles from './NavLinks.module.css';

interface NavItem {
    label: string;
    href: string;
}

interface NavLinksProps {
    items: NavItem[];
    onClick: () => void;
    isMobile?: boolean;
}

export function NavLinks({ items, onClick, isMobile = false }: NavLinksProps) {
    const listClass = isMobile ? styles.mobileList : styles.list;
    const linkClass = isMobile ? styles.mobileLink : styles.link;

    return (
        <ul className={listClass}>
            {items.map((item) => (
                <li key={item.href}>
                    <a href={item.href} className={linkClass} onClick={onClick}>
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    );
}