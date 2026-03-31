import React, { useState } from 'react';

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
}

export const ObfuscatedEmail: React.FC<ObfuscatedEmailProps> = ({ user, domain, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <span 
      className={`cursor-pointer transition-colors ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Haz clic para enviar un correo"
    >
      {user}
      <span className={isHovered ? 'text-brand-orange' : 'text-slate-400'}>@</span>
      {domain}
    </span>
  );
};
