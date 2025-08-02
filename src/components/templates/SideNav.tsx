import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// The useScrollSpy hook remains the same, as it's for in-page navigation
const useScrollSpy = (ids: string[], options: IntersectionObserverInit) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = ids.map(id => document.getElementById(id)).filter(el => el);
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, options);
    
    elements.forEach(el => observer.current?.observe(el));
    return () => observer.current?.disconnect();
  }, [ids, options]);

  return activeId;
};

// The generic SideNav component
export interface NavItem {
  label: string;
  href: string; // Can be '/page-path' or '#anchor-id'
  children?: NavItem[];
}

interface SideNavProps {
  navItems: NavItem[];
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ navItems, className }) => {
  // Get IDs for scroll spying (only anchor links)
  const anchorIds = navItems.flatMap(item => 
    item.href.startsWith('#') ? [item.href.substring(1)] : []
  );
  const activeAnchorId = useScrollSpy(anchorIds, { rootMargin: '0% 0% -80% 0%' });
  
  // Get current location for page link active state
  const location = useLocation();

  const renderNav = (items: NavItem[], isChild = false) => (
    <ul className={isChild ? 'pl-4 mt-2 space-y-2' : 'space-y-4'}>
      {items.map(item => {
        const isPageLink = item.href.startsWith('/');
        const isAnchorLink = item.href.startsWith('#');
        
        // Determine active state based on link type
        const isActive = isPageLink 
          ? location.pathname === item.href 
          : activeAnchorId === item.href.substring(1);

        const linkClasses = `block transition-colors duration-200 ${
          isChild 
          ? `text-sm ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-text'}`
          : `font-medium ${isActive ? 'text-primary' : 'text-text hover:text-primary'}`
        }`;

        return (
          <li key={item.href}>
            {isPageLink ? (
              <Link to={item.href} className={linkClasses}>{item.label}</Link>
            ) : (
              <a href={item.href} className={linkClasses}>{item.label}</a>
            )}
            {item.children && renderNav(item.children, true)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav className={`sticky top-24 w-56 ${className || ''}`}>
      {renderNav(navItems)}
    </nav>
  );
};

export default SideNav;