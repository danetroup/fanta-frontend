import React, { useState, useRef, useEffect, useCallback } from 'react';

// MenuDivider component (no changes needed)
const MenuDivider: React.FC = () => (
  <div className="my-1 h-px bg-border" role="separator" />
);

// MenuItem component
interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick, disabled, icon }) => {
  const baseStyles = 'flex items-center w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out whitespace-nowrap';
  // Replaced 'hover:bg-blue-500' with the theme-aware 'hover:bg-bg-hover'
  const themeStyles = 'hover:bg-bg-hover text-text';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${themeStyles} ${disabled ? disabledStyles : ''}`}
      role="menuitem"
    >
      {icon && <span className="mr-3 h-4 w-4 text-muted-foreground">{icon}</span>}
      {children}
    </button>
  );
};

// Menu component props (no changes needed)
interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}


// Menu Component
const Menu: React.FC<MenuProps> = ({ trigger, children, position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Removed the debugger statement
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left': return 'top-full left-0 mt-1';
      case 'bottom-right': return 'top-full right-0 mt-1';
      case 'top-left': return 'bottom-full left-0 mb-1';
      case 'top-right': return 'bottom-full right-0 mb-1';
      default: return 'top-full right-0 mt-2';
    }
  };

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={toggleMenu} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          className={`origin-top-right absolute z-50 rounded-md shadow-lg bg-card border border-border ring-1 ring-black ring-opacity-5 focus:outline-none min-w-[12rem] w-max ${getPositionClasses()}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-4" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};


export { Menu, MenuItem, MenuDivider };