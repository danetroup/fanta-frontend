// src/components/ui/Drawer.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string;
  title?: string;
  className?: string;
  overlayDismiss?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = '320px',
  title,
  className,
  overlayDismiss = true,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [transitionedIn, setTransitionedIn] = useState(false);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const getTransitionClasses = useCallback(() => {
    switch (position) {
      case 'left':
        return {
          from: '-translate-x-full',
          to: 'translate-x-0',
          sizeClass: size.startsWith('w-') ? size : `w-[${size}]`,
          positionClass: 'left-0 top-0 h-full',
        };
      case 'right':
        return {
          from: 'translate-x-full',
          to: 'translate-x-0',
          sizeClass: size.startsWith('w-') ? size : `w-[${size}]`,
          positionClass: 'right-0 top-0 h-full',
        };
      case 'top':
        return {
          from: '-translate-y-full',
          to: 'translate-y-0',
          sizeClass: size.startsWith('h-') ? size : `h-[${size}]`,
          positionClass: 'left-0 top-0 w-full',
        };
      case 'bottom':
        return {
          from: 'translate-y-full',
          to: 'translate-y-0',
          sizeClass: size.startsWith('h-') ? size : `h-[${size}]`,
          positionClass: 'left-0 bottom-0 w-full',
        };
      default:
        return {
          from: 'translate-x-full',
          to: 'translate-x-0',
          sizeClass: size.startsWith('w-') ? size : `w-[${size}]`,
          positionClass: 'right-0 top-0 h-full',
        };
    }
  }, [position, size]);

  const { from, to, sizeClass, positionClass } = getTransitionClasses();

  // Manage mounting/unmounting and initial transition for opening
  useEffect(() => {
    let animationFrame: number;
    let timer: number; // <--- CHANGED FROM NodeJS.Timeout to number

    if (isOpen) {
      setShouldRender(true);
      animationFrame = requestAnimationFrame(() => {
        timer = setTimeout(() => {
          setTransitionedIn(true);
        }, 0);
      });
    } else {
      setTransitionedIn(false);
      timer = setTimeout(() => setShouldRender(false), 500);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [isOpen]);

  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (overlayDismiss && drawerContentRef.current && !drawerContentRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose, overlayDismiss]);

  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (shouldRender) {
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [shouldRender, handleEscapeKey]);


  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex
        ${transitionedIn ? 'opacity-100' : 'opacity-0'}
        transition-opacity duration-500 ease-in-out`}
      onClick={handleOverlayClick}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        ref={drawerContentRef}
        className={`fixed bg-card border border-border text-text shadow-xl
          ${positionClass} ${sizeClass}
          transform transition-transform duration-500 ease-out
          ${transitionedIn ? to : from}
          ${className || ''}`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-text hover:text-gray-500 transition-colors"
            aria-label="Close drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Drawer;