// src/components/ui/DatePicker.tsx
import React from 'react';
import ReactDatePicker from 'react-datepicker'; // <--- Removed ReactDatePickerProps import
import { useTheme } from '../../contexts'; // For theme context
import Input from './Input'; // Re-use our Input component for the display field

// It's crucial to import react-datepicker's default CSS.
// We'll then override it in our _ag-custom-theme.scss or a new custom-datepicker.scss
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps extends Omit<React.ComponentProps<typeof ReactDatePicker>, 'onChange' | 'selected'> { // <--- Corrected type here
  label?: string;
  onChange: (date: Date | null) => void;
  selected: Date | null;
  className?: string; // For additional styling on the input wrapper
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  selected,
  onChange,
  className,
  ...props
}) => {
  const { theme } = useTheme();

  // Define dynamic class for the date picker portal (if used)
  const portalClassName = `react-datepicker-portal-${theme}`;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text mb-1">
          {label}
        </label>
      )}
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        // Use our Input component as the custom input
        customInput={<Input />}
        // Apply theme-specific classes to the calendar itself
        popperClassName={portalClassName} // Class for the popper/portal div
        calendarClassName={`bg-card text-text border border-border rounded-md shadow-lg`}
        // You can add more props like dateFormat, showTimeSelect, isClearable etc.
        // For actual styling overrides, we will rely on CSS/Sass, which we'll configure next.
        {...props}
      />
    </div>
  );
};

export default DatePicker;