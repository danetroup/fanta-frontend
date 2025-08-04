import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: string; // e.g., '50%', '600px'
  title?: string;
  className?: string;
  overlayDismiss?: boolean;
}

/**
 * @wizard
 * @name Drawer
 * @description A sliding panel that typically appears from the edge of the screen, used for additional content or forms.
 * @tags layout, modal, slide-in, ui
 * @props
 * - name: isOpen
 * type: boolean
 * description: Controls the visibility of the drawer.
 * - name: onClose
 * type: () => void
 * description: Callback function triggered when the drawer should close (e.g., on overlay click, escape key, or close button).
 * - name: children
 * type: React.ReactNode
 * description: The content to be displayed inside the drawer.
 * - name: position
 * type: 'left' | 'right' | 'top' | 'bottom'
 * description: The edge of the screen from which the drawer will slide in.
 * default: 'right'
 * - name: size
 * type: string
 * description: The width (for left/right) or height (for top/bottom) of the drawer (e.g., '50%', '400px').
 * default: '320px'
 * - name: title
 * type: string
 * description: An optional title displayed in the drawer's header.
 * - name: className
 * type: string
 * description: Additional CSS classes for custom styling of the drawer's content panel.
 * - name: overlayDismiss
 * type: boolean
 * description: If true, clicking outside the drawer (on the overlay) will close it.
 * default: true
 * @category layout
 */

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

  // This function now only returns classes for positioning and transitions.
  // Size is handled separately via inline styles for reliability.
  const getTransitionClasses = useCallback(() => {
    switch (position) {
      case 'left':
        return { from: '-translate-x-full', to: 'translate-x-0', positionClass: 'left-0 top-0 h-full' };
      case 'right':
        return { from: 'translate-x-full', to: 'translate-x-0', positionClass: 'right-0 top-0 h-full' };
      case 'top':
        return { from: '-translate-y-full', to: 'translate-y-0', positionClass: 'left-0 top-0 w-full' };
      case 'bottom':
        return { from: 'translate-y-full', to: 'translate-y-0', positionClass: 'left-0 bottom-0 w-full' };
      default:
        return { from: 'translate-x-full', to: 'translate-x-0', positionClass: 'right-0 top-0 h-full' };
    }
  }, [position]);

  // This function generates the inline style object for the drawer's size.
  const getDrawerStyles = useCallback((): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (position === 'left' || position === 'right') {
      style.width = size;
      style.maxWidth = '100vw'; // Ensure it doesn't exceed viewport width
    } else {
      style.height = size;
      style.maxHeight = '100vh'; // Ensure it doesn't exceed viewport height
    }
    return style;
  }, [position, size]);

  const { from, to, positionClass } = getTransitionClasses();
  const drawerStyles = getDrawerStyles();

  // Manage mounting/unmounting and transitions
  useEffect(() => {
    let animationFrame: number;
    let timer: number;

    if (isOpen) {
      setShouldRender(true);
      animationFrame = requestAnimationFrame(() => {
        timer = window.setTimeout(() => {
          setTransitionedIn(true);
        }, 10);
      });
    } else {
      setTransitionedIn(false);
      timer = window.setTimeout(() => setShouldRender(false), 500); // Match transition duration
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
        style={drawerStyles} // Apply the size using an inline style
        className={`fixed bg-card border border-border text-text shadow-xl flex flex-col
          ${positionClass}
          transform transition-transform duration-500 ease-out
          ${transitionedIn ? to : from}
          ${className || ''}`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-4 border-b border-border flex-shrink-0">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-text-light hover:text-text transition-colors"
            aria-label="Close drawer"
          >
            <Icon name="x" size={24} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-grow p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
