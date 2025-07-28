// src/components/ui/Checkbox.tsx
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode; // Can be string or JSX for richer labels
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, className, ...props }) => {
  const uniqueId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const baseStyles = 'form-checkbox h-4 w-4 rounded transition-colors duration-200 ease-in-out cursor-pointer';
  const themeStyles = 'text-primary border-border bg-card focus:ring-primary';
  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="flex items-center">
      <input
        id={uniqueId}
        type="checkbox"
        className={`${baseStyles} ${themeStyles} ${disabledStyles} ${className || ''}`}
        {...props}
      />
      {label && (
        <label htmlFor={uniqueId} className="ml-2 text-sm text-text cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;