// src/components/ui/Input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Add any specific props here if needed later
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  const baseStyles = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary';
  const themeStyles = 'bg-card border-border text-text placeholder-gray-400';

  return (
    <input
      className={`${baseStyles} ${themeStyles} ${className || ''}`}
      {...props}
    />
  );
};

export default Input;