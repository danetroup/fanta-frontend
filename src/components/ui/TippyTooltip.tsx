import React from 'react';
import Tippy, { type TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Recommended for base styles

// Assuming you import the custom theme in your main CSS file, e.g., src/index.css
// import '../../styles/tippy-theme.css'; 

/**
 * A wrapper around the Tippy.js library to provide a standardized,
 * theme-aware tooltip for the Fanta Frontend project.
 *
 * This component abstracts the Tippy.js setup and applies our custom 'fanta' theme.
 */
const TippyTooltip: React.FC<TippyProps> = ({ children, content, ...props }) => {
  return (
    <Tippy
      content={content}
      // Apply our custom theme
      theme="fanta"
      // Sensible defaults that can be overridden by props
      animation="fade"
      duration={200}
      delay={[200, 200]} // [show, hide] delay
      placement="top"
      {...props}
    >
      {/* Tippy requires a single child element to attach to */}
      <span>{children}</span>
    </Tippy>
  );
};

export default TippyTooltip;
