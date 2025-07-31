import React, { lazy, Suspense } from 'react';
import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// Define the props for our custom Icon component
interface IconProps extends Omit<LucideProps, 'name'> {
  name: keyof typeof dynamicIconImports;
  className?: string;
}

/**
 * A dynamic Icon component that lazy-loads icons from the 'lucide-react' library.
 * This approach ensures that only the icons being used are included in the final bundle,
 * which is excellent for performance.
 *
 * @param name The name of the icon to display (e.g., 'user', 'settings').
 * @param className Optional additional CSS classes.
 * @param props Other props to pass to the Lucide icon component (e.g., size, color).
 */
const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  // Lazy load the icon component based on the name prop
  const LucideIcon = lazy(() => dynamicIconImports[name]());

  return (
    <Suspense fallback={<span className="inline-block h-6 w-6" />}>
      <LucideIcon className={className} {...props} />
    </Suspense>
  );
};

export default Icon;
