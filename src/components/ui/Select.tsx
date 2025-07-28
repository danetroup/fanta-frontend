// src/components/ui/Select.tsx
import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
}

const Select: React.FC<SelectProps> = ({ options, label, id, className, ...props }) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`; // Generate unique ID if not provided
  const baseStyles = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary appearance-none';
  const themeStyles = 'bg-card border-border text-text';
  const arrowStyles = `bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5em_1.5em]`; // Custom arrow SVG

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-text mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`${baseStyles} ${themeStyles} ${arrowStyles} ${className || ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;