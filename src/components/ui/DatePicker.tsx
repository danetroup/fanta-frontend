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

/**
 * @wizard
 * @name DatePicker
 * @description A calendar-based input component for selecting single dates, with theme integration.
 * @tags form, input, date, calendar, ui
 * @props
 * - name: label
 * type: string
 * description: An optional label displayed above the date picker input field.
 * - name: selected
 * type: Date | null
 * description: The currently selected date object, or `null` if no date is selected.
 * - name: onChange
 * type: (date: Date | null) => void
 * description: Callback function triggered when a new date is selected.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the date picker's wrapper container.
 * - name: dateFormat
 * type: string
 * description: The format string for displaying the date (e.g., 'MM/dd/yyyy', 'yyyy-MM-dd').
 * - name: showTimeSelect
 * type: boolean
 * description: If true, also allows time selection in addition to date selection.
 * - name: isClearable
 * type: boolean
 * description: If true, displays a clear button to deselect the date.
 * - name: placeholderText
 * type: string
 * description: Text displayed when no date is selected.
 * - name: minDate
 * type: Date
 * description: The earliest selectable date.
 * - name: maxDate
 * type: Date
 * description: The latest selectable date.
 * @category form
 */

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