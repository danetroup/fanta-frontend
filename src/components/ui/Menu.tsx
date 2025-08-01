import React, { useState, useRef, useEffect, useCallback } from 'react';

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick, disabled }) => {
  // Added flex, items-center, and whitespace-nowrap to ensure proper alignment and prevent text wrapping.
  const baseStyles = 'flex items-center w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors duration-150 ease-in-out whitespace-nowrap';
  const themeStyles = 'hover:bg-primary/10 text-text';
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${themeStyles} ${disabled ? disabledStyles : ''}`}
      role="menuitem"
    >
      {children}
    </button>
  );
};

interface MenuProps {
  trigger: React.ReactNode; // The element that opens the menu (e.g., a button, an icon)
  children: React.ReactNode; // Menu items (MenuItem components)
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

const Menu: React.FC<MenuProps> = ({ trigger, children, position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref for the entire menu container
  const triggerRef = useRef<HTMLDivElement>(null); // Ref for the trigger element

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
      case 'bottom-left':
        return 'top-full left-0 mt-2';
      case 'bottom-right':
        return 'top-full right-0 mt-2';
      case 'top-left':
        return 'bottom-full left-0 mb-2';
      case 'top-right':
        return 'bottom-full right-0 mb-2';
      default:
        return 'top-full right-0 mt-2';
    }
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div onClick={toggleMenu} ref={triggerRef}>
        {trigger}
      </div>

      {isOpen && (
        <div
          // Added min-w-[12rem] for a comfortable minimum width and w-max to fit content.
          className={`origin-top-right absolute z-50 rounded-md shadow-lg bg-card border border-border ring-1 ring-black ring-opacity-5 focus:outline-none min-w-[12rem] w-max ${getPositionClasses()}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export { Menu, MenuItem };
