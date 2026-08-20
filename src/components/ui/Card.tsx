import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
}

export function Card({ children, variant = 'default', className = '', ...props }: CardProps) {
  const baseStyles = 'rounded-2xl p-6 transition-all';
  const variants = {
    default: 'bg-surface border border-border shadow-lg',
    glass: 'glass-card hover:bg-surfaceElevated/90',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
