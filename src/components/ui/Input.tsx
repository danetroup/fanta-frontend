import React from 'react';
import Icon from './Icon';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** An optional label to display above the input field. */
  label?: string;
  /** A string that provides a hint or an error message below the input. */
  helperText?: string;
  /** If true, the input will be styled to indicate an error. */
  error?: boolean;
  /** If true, a required indicator (*) will be displayed next to the label. */
  required?: boolean;
  /** If true, an "(optional)" indicator will be displayed next to the label. */
  showOptionalLabel?: boolean;
  /** Optional additional CSS classes for the container. */
  containerClassName?: string;
}

/**
 * A theme-aware text input component with support for labels, helper text,
 * and validation states.
 */
const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error = false,
  required = false,
  showOptionalLabel = false,
  className,
  containerClassName,
  ...props
}) => {
  const baseStyles = 'w-full px-3 py-2 rounded-md bg-card border transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2';
  
  const stateStyles = error
    ? 'border-red-500 text-red-700 focus:ring-red-500'
    : 'border-border text-text focus:ring-primary focus:border-primary';

  return (
    <div className={`w-full ${containerClassName || ''}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label htmlFor={props.id || props.name} className="block text-sm font-medium text-text-light">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {showOptionalLabel && !required && (
            <span className="text-xs text-text-light">Optional</span>
          )}
        </div>
      )}
      <input
        className={`${baseStyles} ${stateStyles} ${className || ''}`}
        required={required}
        {...props}
      />
      {helperText && (
        <p className={`mt-1 text-xs ${error ? 'text-red-600' : 'text-text-light'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
