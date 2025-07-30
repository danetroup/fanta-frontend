import React from 'react';

/**
 * Props for the ButtonGroup component.
 */
interface ButtonGroupProps {
  /**
   * The Button components to be grouped together.
   */
  children: React.ReactNode;
  /**
   * Optional additional CSS classes to apply to the container.
   */
  className?: string;
  /**
   * The value of the currently selected button. Providing this will
   * turn the group into a radio-style segmented control.
   */
  value?: string | number;
  /**
   * Callback function that is called when the selected value changes.
   */
  onValueChange?: (value: string | number) => void;
}

// Define the expected props for children to help TypeScript
interface ButtonGroupChildProps {
  className?: string;
  value?: string | number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
}

/**
 * A component that visually groups multiple buttons together.
 * It can function as a simple visual container or as a stateful
 * segmented control (radio group) when `value` and `onValueChange` props are provided.
 */
const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className, value, onValueChange }) => {
  const childCount = React.Children.count(children);
  const isRadioGroup = value !== undefined && onValueChange !== undefined;

  const buttons = React.Children.map(children, (child, index) => {
    // Use a type guard with a generic to inform TypeScript about the child's props.
    if (!React.isValidElement<ButtonGroupChildProps>(child)) {
      return child;
    }

    let childClassName = child.props.className || '';
    const childValue = child.props.value;

    // --- Border Radius and Margin Logic ---
    if (childCount > 1) {
      if (index === 0) {
        childClassName += ' rounded-r-none';
      } else if (index === childCount - 1) {
        childClassName += ' rounded-l-none';
      } else {
        childClassName += ' rounded-none';
      }
      if (index > 0) {
        childClassName += ' -ml-px';
      }
    }

    // --- Radio Group Logic ---
    let newProps: any = { className: childClassName };
    if (isRadioGroup) {
      const isSelected = childValue === value;
      
      // Explicitly set the variant for selected and unselected states.
      newProps.variant = isSelected ? 'primary' : 'outline';
      
      // Add the inner shadow only to the selected button for a "pressed" look.
      if (isSelected) {
        newProps.className += ' shadow-inner';
      }
      
      // Wrap the onClick handler to manage state.
      newProps.onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (childValue !== undefined) {
          onValueChange(childValue);
        }
        // Call the original onClick if it exists.
        if (child.props.onClick) {
          child.props.onClick(e);
        }
      };
    }

    return React.cloneElement(child, newProps);
  });

  return (
    <div className={`inline-flex items-center ${className || ''}`}>
      {buttons}
    </div>
  );
};

export default ButtonGroup;
