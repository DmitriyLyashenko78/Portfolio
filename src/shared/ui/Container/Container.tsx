// src/shared/ui/Container/Container.tsx
import { type ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: 'div' | 'section' | 'header' | 'footer' | 'main';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({
                              children,
                              className = '',
                              as: Tag = 'div',
                              size = 'lg',
                          }: ContainerProps) {
    const sizeClass = {
        sm: styles.sm,
        md: styles.md,
        lg: styles.lg,
        xl: styles.xl,
        full: styles.full,
    }[size];

    return (
        <Tag className={`${styles.container} ${sizeClass} ${className}`}>
            {children}
        </Tag>
    );
}