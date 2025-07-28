// src/components/ui/Tooltip.tsx
import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: React.ReactNode; // The content to display inside the tooltip
  children: React.ReactNode; // The element that triggers the tooltip
  position?: 'top' | 'bottom' | 'left' | 'right'; // Position relative to children
  className?: string; // Additional classes for the tooltip content box
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null); // Ref for the trigger element
  const tooltipRef = useRef<HTMLDivElement>(null); // Ref for the tooltip content

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      <div ref={triggerRef}>{children}</div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 p-2 text-sm rounded-md shadow-lg transition-opacity duration-300 ${getPositionClasses()} ${className || ''} bg-card border border-border text-text opacity-100 pointer-events-none`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;