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

/**
 * @wizard
 * @name ActionBar
 * @description A persistent bar, typically at the bottom of a form or page, used to group primary actions like 'Save' and 'Cancel'.
 * @tags layout, form, actions, buttons, ui
 * @props
 * - name: children
 * type: React.ReactNode
 * description: The content of the action bar, typically `Button` components.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the action bar container.
 * @category layout
 */

const ActionBar: React.FC<ActionBarProps> = ({ children, className }) => {
  return (
    <div className={`flex items-center justify-end gap-4 p-4 bg-card-alt border-t border-border rounded-b-lg ${className || ''}`}>
      {children}
    </div>
  );
};

export default ActionBar;
