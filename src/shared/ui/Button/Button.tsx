// src/shared/ui/Button/Button.tsx
import {
    type ReactNode,
    type AnchorHTMLAttributes,
    type ButtonHTMLAttributes,
} from 'react';
import styles from './Button.module.css';

interface ButtonBaseProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    className?: string;
}

type ButtonAsButtonProps = ButtonBaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
        as?: 'button';
    };

type ButtonAsAnchorProps = ButtonBaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className' | 'href'> & {
        as: 'a';
        href: string;
    };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

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
    if (Tag === 'a') {
        const { rel, ...anchorProps } = props as Omit<ButtonAsAnchorProps, keyof ButtonBaseProps | 'as' | 'href'>;
        const safeRel = target === '_blank' ? rel ?? 'noopener noreferrer' : rel;

        return (
            <a
                href={href}
                target={target}
                rel={safeRel}
                className={baseClass}
                {...anchorProps}
            >
                {children}
            </a>
        );
    }

    // Если это кнопка
    return (
        <button className={baseClass} {...(props as ButtonAsButtonProps)}>
            {children}
        </button>
    );
}
