import React from 'react';
import Input from './Input';
import Icon from './Icon';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional additional CSS classes for the container. */
  containerClassName?: string;
}

/**
 * A specialized input component for search functionality.
 * It wraps the standard Input and includes a search icon.
 */
/**
 * @wizard
 * @name SearchInput
 * @description A specialized input component designed for search functionality, featuring an integrated search icon.
 * @tags form, input, search, ui
 * @props
 * - name: placeholder
 * type: string
 * description: The placeholder text displayed when the input is empty.
 * - name: value
 * type: string
 * description: The current value of the input field.
 * - name: onChange
 * type: (event: React.ChangeEvent<HTMLInputElement>) => void
 * description: Callback function triggered when the input value changes.
 * - name: containerClassName
 * type: string
 * description: Optional additional CSS classes for the outer container wrapping the input and icon.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the input field itself.
 * @category form
 */
const SearchInput: React.FC<SearchInputProps> = ({ className, containerClassName, ...props }) => {
  return (
    <div className={`relative ${containerClassName || ''}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="search" size={16} className="text-text-light" />
      </div>
      <Input
        type="search"
        className={`pl-10 ${className || ''}`}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
