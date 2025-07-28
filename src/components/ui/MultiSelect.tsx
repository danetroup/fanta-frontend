// src/components/ui/MultiSelect.tsx
import React from 'react';
import Select, { type StylesConfig, type GroupBase, type OptionsOrGroups } from 'react-select'; // <--- Ensure 'type' is before StylesConfig, GroupBase, and OptionsOrGroups
import { useTheme } from '../../contexts'; // To get theme context for styling

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: MultiSelectOption[] | null; // Array of selected options or null
  onChange: (selected: MultiSelectOption[] | null) => void;
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  label?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isClearable = true,
  isDisabled = false,
  isLoading = false,
  isSearchable = true,
  label,
}) => {
  const { theme } = useTheme();

  // Define colors based on theme context for react-select's custom styles
  const primaryColor = theme === 'light' ? 'var(--app-primary-color)' : 'var(--app-primary-color)';
  const accentColor = theme === 'light' ? 'var(--app-accent-color)' : 'var(--app-accent-color)';
  const textColor = theme === 'light' ? 'var(--app-text-color)' : 'var(--app-text-color)';
  const bgColor = theme === 'light' ? 'var(--app-card-bg-color)' : 'var(--app-card-bg-color)';
  const borderColor = theme === 'light' ? 'var(--app-border-color)' : 'var(--app-border-color)';
  const inputBgColor = theme === 'light' ? 'var(--app-card-bg-color)' : 'var(--app-card-bg-color)';
  const controlHoverBorderColor = theme === 'light' ? 'var(--app-primary-color)' : 'var(--app-primary-color)';
  const optionHoverBgColor = theme === 'light' ? 'rgba(var(--app-primary-color-raw), 0.1)' : 'rgba(var(--app-primary-color-raw), 0.1)';
  const selectedOptionBgColor = theme === 'light' ? 'rgba(var(--app-primary-color-raw), 0.2)' : 'rgba(var(--app-primary-color-raw), 0.2)';
  const disabledColor = theme === 'light' ? 'rgba(var(--app-text-color-raw), 0.5)' : 'rgba(var(--app-text-color-raw), 0.5)';


  // Styles configuration for react-select
  const customStyles: StylesConfig<MultiSelectOption, true, GroupBase<MultiSelectOption>> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: inputBgColor,
      borderColor: state.isFocused ? primaryColor : borderColor,
      boxShadow: state.isFocused ? `0 0 0 1px ${primaryColor}` : 'none',
      '&:hover': {
        borderColor: controlHoverBorderColor,
      },
      color: textColor,
      minHeight: '40px', // Match height of our Input component
    }),
    input: (provided) => ({
      ...provided,
      color: textColor,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: disabledColor, // Placeholder should be a muted text color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: textColor,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: selectedOptionBgColor,
      color: textColor,
      borderRadius: '4px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: textColor,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: textColor,
      '&:hover': {
        backgroundColor: accentColor,
        color: 'white',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: bgColor,
      borderColor: borderColor,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 9999, // Ensure it's above other elements
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? selectedOptionBgColor
        : state.isFocused
        ? optionHoverBgColor
        : bgColor,
      color: state.isSelected ? primaryColor : textColor,
      '&:active': {
        backgroundColor: selectedOptionBgColor,
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: textColor,
      '&:hover': {
        color: primaryColor,
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: textColor,
      '&:hover': {
        color: primaryColor,
      },
    }),
    loadingIndicator: (provided) => ({
      ...provided,
      '& > span': {
        backgroundColor: primaryColor,
      },
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: textColor,
      backgroundColor: bgColor,
    }),
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text mb-1">
          {label}
        </label>
      )}
      <Select<MultiSelectOption, true> // Specify type arguments here for multi-select
        options={options}
        value={value}
        onChange={onChange}
        isMulti // Enable multi-select
        isClearable={isClearable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isSearchable={isSearchable}
        placeholder={placeholder}
        styles={customStyles}
        classNamePrefix="react-select" // For easier global targeting if needed
      />
    </div>
  );
};

export default MultiSelect;