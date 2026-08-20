import React from 'react';
import './ui.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'glass' | 'outline';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'glass', 
  className = '', 
  ...props 
}) => {
  return (
    <div 
      className={`card card-${variant} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
