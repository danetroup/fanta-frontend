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
