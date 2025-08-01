import React from 'react';

interface ToggleSwitchProps {
  /** Whether the toggle is checked or not. */
  checked: boolean;
  /** Callback function that is called when the toggle state changes. */
  onChange: (checked: boolean) => void;
  /** An accessible label for the toggle switch. */
  label: string;
  /** Optional additional CSS classes for the container. */
  className?: string;
  /** If true, the toggle will be disabled. */
  disabled?: boolean;
}

/**
 * A theme-aware toggle switch component, used as an alternative to a checkbox.
 * It is fully accessible and controllable.
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  className,
  disabled = false,
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label htmlFor={label} className={`flex items-center cursor-pointer ${className || ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="relative">
        <input
          id={label}
          type="checkbox"
          className="sr-only" // Hide the default checkbox
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
        />
        {/* The track of the toggle */}
        <div className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-primary' : 'bg-border'}`}></div>
        {/* The thumb of the toggle */}
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : ''}`}
        ></div>
      </div>
      <div className="ml-3 text-text font-medium">{label}</div>
    </label>
  );
};

export default ToggleSwitch;
