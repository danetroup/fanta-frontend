import React from 'react';

// A simple SVG spinner component for the loading state
const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`animate-spin -ml-1 mr-3 h-5 w-5 text-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);


// Define the props for the Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button.
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'accent' | 'ghost' | 'link';
  /**
   * The size of the button.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * An icon to display before the button text.
   */
  iconBefore?: React.ReactNode;
  /**
   * An icon to display after the button text.
   */
  iconAfter?: React.ReactNode;
  /**
   * If true, the button will be in a loading state.
   * @default false
   */
  loading?: boolean;
  /**
   * If true, the button will take up the full width of its container.
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * A versatile button component with multiple variants, sizes, and icon support.
 * It's designed to be flexible and theme-aware.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  iconBefore,
  iconAfter,
  loading = false,
  fullWidth = false,
  ...props
}) => {
  // Base styles are applied to all buttons for consistency.
  const baseStyles = 'appearance-none inline-flex items-center justify-center font-semibold rounded-md shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

  // Styles for each button variant, now fully theme-aware.
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:brightness-110 active:brightness-105 focus:ring-primary disabled:hover:brightness-100',
    secondary: 'bg-secondary text-secondary-foreground hover:brightness-110 active:brightness-105 focus:ring-secondary disabled:hover:brightness-100',
    danger: 'bg-danger text-danger-foreground hover:brightness-110 active:brightness-95 focus:ring-danger disabled:hover:brightness-100',
    outline: 'border border-border text-text hover:bg-primary/10 hover:text-primary focus:ring-primary disabled:hover:bg-transparent disabled:hover:text-text',
    accent: 'bg-accent text-accent-foreground hover:brightness-110 active:brightness-105 focus:ring-accent disabled:hover:brightness-100',
    ghost: 'bg-transparent text-text hover:bg-border focus:ring-primary disabled:hover:bg-transparent',
    link: 'bg-transparent text-primary hover:underline focus:ring-primary underline-offset-4 shadow-none disabled:hover:no-underline',
  };

  // Padding and font size styles for different button sizes.
  const isIconOnly = !children;
  const sizeStyles = {
    sm: `text-sm ${isIconOnly ? 'p-1.5' : 'py-1 px-2'}`,
    md: `text-base ${isIconOnly ? 'p-2' : 'py-2 px-4'}`,
    lg: `text-lg ${isIconOnly ? 'p-3' : 'py-3 px-6'}`,
  };

  // Add the w-full class if the fullWidth prop is true.
  const fullWidthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidthClass} ${className || ''}`}
      disabled={props.disabled || loading} // Disable the button when loading
      {...props}
    >
      {/* Show a spinner when in the loading state */}
      {loading && <Spinner />}

      {/* Hide icons and text when loading */}
      {!loading && (
        <>
          {iconBefore && (
            <span className={children ? 'mr-2' : ''}>
              {iconBefore}
            </span>
          )}
          
          {children}

          {iconAfter && (
            <span className={children ? 'ml-2' : ''}>
              {iconAfter}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;