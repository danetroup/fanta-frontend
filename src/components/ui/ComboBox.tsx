// src/components/ui/ComboBox.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Input from './Input';

interface ComboBoxOption {
  value: string | number;
  label: string;
}

// Renamed onSelect to onOptionSelect to avoid conflict with standard input attributes
interface ComboBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  options: ComboBoxOption[];
  label?: string;
  value?: string | number | null;
  onOptionSelect?: (selectedValue: string | number | null, selectedLabel: string | null) => void;
  placeholder?: string;
}

/**
 * @wizard
 * @name ComboBox
 * @description A text input with an integrated dropdown list of selectable options, allowing both typing and selection.
 * @tags form, input, select, dropdown, autocomplete, ui
 * @props
 * - name: options
 * type: { value: string | number; label: string; }[]
 * description: An array of objects defining the selectable options, each with a `value` and `label`.
 * - name: label
 * type: string
 * description: An optional label displayed above the ComboBox input field.
 * - name: value
 * type: string | number | null
 * description: The currently selected option's `value`. Can be `null` if no option is selected.
 * - name: onOptionSelect  // <-- Updated JSDoc
 * type: (selectedValue: string | number | null, selectedLabel: string | null) => void
 * description: Callback function triggered when an option is selected from the dropdown.
 * - name: placeholder
 * type: string
 * description: The placeholder text displayed when the input is empty.
 * @category form
 */
const ComboBox: React.FC<ComboBoxProps> = ({
  options,
  label,
  value: controlledValue,
  onOptionSelect, // <-- Updated prop name
  placeholder,
  id,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<ComboBoxOption[]>(options);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uniqueId = id || `combobox-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    if (controlledValue !== undefined) {
      const selectedOption = options.find(opt => opt.value === controlledValue);
      setInputValue(selectedOption ? selectedOption.label : '');
    }
  }, [controlledValue, options]);

  useEffect(() => {
    if (inputValue === '') {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter(option =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
    setHighlightedIndex(-1);
  }, [inputValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option: ComboBoxOption) => {
    setInputValue(option.label);
    setIsOpen(false);
    onOptionSelect?.(option.value, option.label); // <-- Updated prop name
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex !== -1 && filteredOptions[highlightedIndex]) {
        handleOptionClick(filteredOptions[highlightedIndex]);
      } else {
        const matchedOption = options.find(opt => opt.label.toLowerCase() === inputValue.toLowerCase());
        if (matchedOption) {
          handleOptionClick(matchedOption);
        } else {
          setInputValue('');
          onOptionSelect?.(null, null); // <-- Updated prop name
        }
      }
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className || ''}`} ref={wrapperRef}>
      {label && (
        <label htmlFor={uniqueId} className="block text-sm font-medium text-text mb-1">
          {label}
        </label>
      )}
      <Input
        id={uniqueId}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        ref={inputRef}
        {...props}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg py-1 overflow-auto max-h-60 focus:outline-none">
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              className={`px-4 py-2 text-sm cursor-pointer ${
                highlightedIndex === index ? 'bg-primary/10 text-primary' : 'hover:bg-bg-hover text-text'
              }`}
              onClick={() => handleOptionClick(option)}
              role="option"
              aria-selected={highlightedIndex === index}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;