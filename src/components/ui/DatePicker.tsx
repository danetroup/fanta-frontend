import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useTheme } from '../../contexts';
import Input from './Input';

import 'react-datepicker/dist/react-datepicker.css';

// We simplify our props to no longer extend the complex library types directly.
// We explicitly define only the props we need for a single date picker.
interface DatePickerProps {
  label?: string;
  onChange: (date: Date | null) => void;
  selected: Date | null;
  className?: string;
  placeholderText?: string;
  dateFormat?: string;
  isClearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  // Add any other simple props from react-datepicker you might need.
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
        // This simplified inline handler now directly matches what the library
        // expects for a single date picker, resolving the type error.
        onChange={(date: Date | null) => onChange(date)}
        customInput={<Input />}
        popperClassName={portalClassName}
        calendarClassName={`bg-card text-text border border-border rounded-md shadow-lg`}
        {...props}
      />
    </div>
  );
};

export default DatePicker;