// src/components/ui/Toast.tsx
import React, { useEffect, useState } from 'react';
import Card from './Card'; // Re-use our Card component for toast styling

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string; // Unique ID for the toast
  message: string;
  type?: ToastType;
  duration?: number; // How long toast is visible in ms (0 for sticky)
  onDismiss: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type = 'info', duration = 3000, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss functionality
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Start fade-out animation
        const dismissTimer = setTimeout(() => onDismiss(id), 300); // Allow fade-out transition (300ms) before dismissing
        return () => clearTimeout(dismissTimer);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onDismiss]);

  // Determine styling based on toast type
  const typeStyles = {
    success: 'bg-green-600 border-green-700 text-white',
    error: 'bg-red-600 border-red-700 text-white',
    info: 'bg-primary border-primary text-white',
    warning: 'bg-orange-500 border-orange-600 text-white',
  };

  return (
    <Card className={`p-4 mb-2 flex items-center shadow-lg transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    } ${typeStyles[type]}`}>
      {/* Icon based on type (simple text for now) */}
      <div className="mr-3 text-xl">
        {type === 'success' && '✓'}
        {type === 'error' && '✕'}
        {type === 'info' && 'i'}
        {type === 'warning' && '⚠'}
      </div>
      <div className="flex-1 text-base">{message}</div>
      <button onClick={() => onDismiss(id)} className="ml-3 text-white text-xl hover:text-gray-200">
        &times;
      </button>
    </Card>
  );
};

export default Toast;