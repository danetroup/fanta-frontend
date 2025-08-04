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

/**
 * @wizard
 * @name Input
 * @description A versatile text input field with support for labels, helper text, error states, and required indicators.
 * @tags form, ui, text-input
 * @props
 * - name: type
 * type: React.InputHTMLAttributes<HTMLInputElement>['type']
 * description: The HTML input type (e.g., 'text', 'email', 'password', 'number').
 * default: 'text' (implicit from HTML default)
 * - name: label
 * type: string
 * description: An optional label displayed above the input field.
 * - name: helperText
 * type: string
 * description: A short message displayed below the input, often for hints or errors.
 * - name: error
 * type: boolean
 * description: If true, the input will be styled to indicate an invalid or error state.
 * default: false
 * - name: required
 * type: boolean
 * description: If true, displays a required indicator (*) next to the label and enforces HTML5 validation.
 * default: false
 * - name: showOptionalLabel
 * type: boolean
 * description: If true, displays an "(optional)" indicator next to the label when not required.
 * default: false
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the input element itself.
 * - name: containerClassName
 * type: string
 * description: Optional additional CSS classes for the wrapper div around the label, input, and helper text.
 * - name: id
 * type: string
 * description: A unique ID for the input, useful for associating labels.
 * - name: name
 * type: string
 * description: The `name` attribute of the input, used for form submission.
 * - name: value
 * type: string | number | readonly string[]
 * description: The current value of the input field.
 * - name: onChange
 * type: (event: React.ChangeEvent<HTMLInputElement>) => void
 * description: Callback function triggered when the input's value changes.
 * - name: placeholder
 * type: string
 * description: The placeholder text displayed when the input is empty.
 * @category form
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
