import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  /** The content to display inside the tooltip. */
  content: React.ReactNode;
  /** The element that triggers the tooltip. Must be a single React element. */
  children: React.ReactElement;
  /** Position of the tooltip relative to the trigger element. */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Additional classes for the tooltip content box. */
  className?: string;
  /** Delay in milliseconds before the tooltip appears. */
  delay?: number;
  /** A Tailwind CSS class to control the width of the tooltip (e.g., 'w-64'). */
  width?: string;
}

// Define the type for the props we will be adding to the trigger element.
interface TriggerProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  'aria-describedby': string;
}

/**
 * An improved Tooltip component that is accessible, animated, and includes a delay.
 * It attaches event handlers directly to the child element for robustness.
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className,
  delay = 200,
  width = 'w-auto',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // --- Event Handlers with Delay ---
  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsMounted(true);
      window.setTimeout(() => setIsVisible(true), 10);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
    timeoutRef.current = window.setTimeout(() => {
      setIsMounted(false);
    }, 200); // Match transition duration
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- Positioning and Arrow Styles ---
  const getPositionClasses = () => {
    switch (position) {
      case 'top': return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom': return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left': return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right': return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default: return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = () => {
    // This color should match the tooltip's background color for a seamless look.
    const arrowColor = 'border-gray-800'; 
    switch (position) {
      case 'top': return `bottom-[-5px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-[${arrowColor}]`;
      case 'bottom': return `top-[-5px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-[${arrowColor}]`;
      case 'left': return `right-[-5px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-[${arrowColor}]`;
      case 'right': return `left-[-5px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-[${arrowColor}]`;
      default: return '';
    }
  };

  // --- Clone Child to Add Handlers ---
  const triggerProps: TriggerProps = {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    'aria-describedby': 'tooltip',
  };

  const triggerElement = React.cloneElement(children, triggerProps);

  return (
    <div className="relative inline-block">
      {triggerElement}
      {isMounted && (
        <div
          id="tooltip"
          role="tooltip"
          className={`absolute z-50 p-2 text-sm rounded-md shadow-lg transition-opacity duration-200 ${getPositionClasses()} ${width} max-w-xs ${className || ''} bg-gray-800 text-white pointer-events-none ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          {content}
          {/* Arrow Element - a larger border makes it more pronounced */}
          <div className={`absolute h-0 w-0 border-[5px] ${getArrowClasses()}`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
