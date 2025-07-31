import React from 'react';

interface AvatarProps {
  /** The URL of the image to display. */
  src?: string;
  /** The name of the user, used for generating initials as a fallback. */
  name: string;
  /** The size of the avatar. */
  size?: 'sm' | 'md' | 'lg';
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A component for displaying a user's avatar. It shows an image if a `src`
 * is provided, otherwise it falls back to the user's initials.
 */
const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-xl',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-secondary text-white ${sizeClasses[size]} ${className || ''}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        <span className="font-semibold">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
