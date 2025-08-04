// src/components/ui/Modal.tsx
import React, { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string; // For additional styling on the modal content itself
}

/**
 * @wizard
 * @name Modal
 * @description A dialog box that appears on top of the current page, requiring user interaction to dismiss.
 * @tags ui, overlay, dialog, popup
 * @props
 * - name: isOpen
 * type: boolean
 * description: Controls the visibility of the modal.
 * - name: onClose
 * type: () => void
 * description: Callback function triggered when the modal should close (e.g., on escape key press or close button click).
 * - name: children
 * type: React.ReactNode
 * description: The main content to be displayed inside the modal's body.
 * - name: title
 * type: string
 * description: An optional title displayed in the modal's header.
 * - name: footer
 * type: React.ReactNode
 * description: Optional content to be displayed in the modal's footer, typically action buttons.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the modal's content panel.
 * @category layout
 */


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, footer, className }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg mx-auto rounded-lg shadow-xl overflow-hidden bg-card border border-border text-text ${className || ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          {title && <h3 id="modal-title" className="text-xl font-semibold">{title}</h3>}
          <button
            onClick={onClose}
            className="text-text hover:text-gray-500 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div className="p-4 border-t border-border flex justify-end space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body // Portal the modal to the body
  );
};

export default Modal;