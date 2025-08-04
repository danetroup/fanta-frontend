import React from 'react';

/**
 * Props for the Card component.
 * Allows for customization of background, border, padding, and shadow.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom Tailwind CSS class for the background.
   * @default 'bg-card'
   */
  background?: string;
  /**
   * Custom Tailwind CSS class for the border.
   * @default 'border border-border'
   */
  border?: string;
  /**
   * Custom Tailwind CSS class for padding.
   * @default undefined (no padding is applied by default)
   * @example 'p-4', 'p-6'
   */
  padding?: string;
  /**
   * Custom Tailwind CSS class for the box-shadow.
   * @default undefined (no shadow is applied by default)
   * @example 'shadow-md', 'shadow-lg'
   */
  shadow?: string;
}

/**
 * A flexible card component with customizable styles.
 * It serves as a container for content, adapting to the current theme
 * while allowing for style overrides via props.
 */
/**
 * @wizard
 * @name Card
 * @description A versatile container component with customizable background, border, padding, and shadow, adapting to the current theme.
 * @tags layout, ui, container, box
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The content to be displayed inside the card.
 * - name: background
 * type: string
 * description: Custom Tailwind CSS class for the card's background (e.g., 'bg-blue-100'). Overrides default.
 * default: 'bg-card'
 * - name: border
 * type: string
 * description: Custom Tailwind CSS class for the card's border (e.g., 'border-2 border-red-500'). Overrides default.
 * default: 'border border-border'
 * - name: padding
 * type: string
 * description: Custom Tailwind CSS class for the card's padding (e.g., 'p-4', 'px-6 py-4').
 * - name: shadow
 * type: string
 * description: Custom Tailwind CSS class for the card's box-shadow (e.g., 'shadow-md', 'shadow-lg').
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the card container.
 * @category layout
 */
const Card: React.FC<CardProps> = ({
  children,
  className,
  background,
  border,
  padding,
  shadow,
  ...props
}) => {
  // Default styles from the theme that can be overridden by props.
  const defaultBackground = 'bg-card';
  const defaultBorder = 'border border-border';

  // Base style is always applied for consistency.
  const baseStyles = 'rounded-lg';

  // Build the list of classes.
  // - Use the provided prop value if it exists.
  // - Otherwise, use the theme-based default.
  // - The user can pass an empty string (e.g., border="") to remove a default style.
  // - Additional classes from the `className` prop are always appended.
  const finalClassName = [
    baseStyles,
    background !== undefined ? background : defaultBackground,
    border !== undefined ? border : defaultBorder,
    padding, // Only added if the prop is provided
    shadow,  // Only added if the prop is provided
    className, // Allows for further customization and overrides
  ]
    .filter(Boolean) // Remove any falsy values (null, undefined, '')
    .join(' ');

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
