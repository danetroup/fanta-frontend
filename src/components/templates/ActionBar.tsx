import React from 'react';

interface ActionBarProps {
  /** The content of the action bar, typically buttons. */
  children: React.ReactNode;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A persistent bar, typically at the bottom of a form or page,
 * used to group primary actions like 'Save' and 'Cancel'.
 */
const ActionBar: React.FC<ActionBarProps> = ({ children, className }) => {
  return (
    <div className={`flex items-center justify-end gap-4 p-4 bg-card-alt border-t border-border rounded-b-lg ${className || ''}`}>
      {children}
    </div>
  );
};

export default ActionBar;
