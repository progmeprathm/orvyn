import React from 'react';
import './ui.css';

interface AvatarProps {
  url?: string | null;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ url, size = 40, className = '' }) => {
  if (!url) {
    return (
      <div 
        className={`avatar ${className}`} 
        style={{ width: size, height: size, display: 'inline-block' }} 
      />
    );
  }

  return (
    <img 
      src={url} 
      alt="Avatar"
      className={`avatar ${className}`} 
      style={{ width: size, height: size }} 
    />
  );
};
