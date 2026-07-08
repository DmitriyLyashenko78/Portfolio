// src/shared/ui/Button/Button.tsx
import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    as?: 'button' | 'a';
    href?: string;
    target?: string;
    className?: string;
}

export function Button({
                           children,
                           variant = 'primary',
                           size = 'md',
                           fullWidth = false,
                           as: Tag = 'button',
                           href,
                           target,
                           className = '',
                           ...props
                       }: ButtonProps) {
    const variantClass = {
        primary: styles.primary,
        secondary: styles.secondary,
        outline: styles.outline,
        ghost: styles.ghost,
    }[variant];

    const sizeClass = {
        sm: styles.sm,
        md: styles.md,
        lg: styles.lg,
    }[size];

    const widthClass = fullWidth ? styles.fullWidth : '';

    const baseClass = `${styles.button} ${variantClass} ${sizeClass} ${widthClass} ${className}`;

    // Если это ссылка
    if (Tag === 'a' && href) {
        return (
            <a
                href={href}
                target={target}
                className={baseClass}
                {...(props as any)}
            >
                {children}
            </a>
        );
    }

    // Если это кнопка
    return (
        <button className={baseClass} {...props}>
            {children}
        </button>
    );
}