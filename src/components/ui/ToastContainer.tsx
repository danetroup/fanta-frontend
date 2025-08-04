// src/components/ui/ToastContainer.tsx
import React, { useState, useCallback, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import Toast, { type ToastType } from './Toast'; // <--- ADD 'type' keyword

// Define the shape of a Toast object for the state
interface ToastMessage {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

// Define the shape of the context value
interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  dismissToast: (id: string) => void;
}

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to consume the ToastContext
/**
 * @wizard
 * @name useToast
 * @description A React hook to easily add and dismiss toast notifications anywhere within a `ToastProvider`.
 * @tags hook, feedback, notification
 * @category feedback
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// ToastProvider component
/**
 * @wizard
 * @name ToastProvider
 * @description Provides a context and a hook (`useToast`) for displaying transient, non-disruptive notifications (toasts) across the application.
 * @tags feedback, notification, context, utility
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The React nodes that will have access to the `useToast` hook. Typically wraps the entire application.
 * @category feedback
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type?: ToastType, duration?: number) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9); // Simple unique ID
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const contextValue = React.useMemo(() => ({ addToast, dismissToast }), [addToast, dismissToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-50 w-72 max-w-full">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onDismiss={dismissToast}
            />
          ))}
        </div>,
        document.body // Portal toasts to the body
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider; // <--- CHANGE ToastContainer to ToastProvider