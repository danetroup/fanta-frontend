import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

// The useScrollSpy hook remains the same
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

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface SideNavProps {
  navItems: NavItem[];
  sectionIds: string[];
  className?: string;
}
/**
 * @wizard
 * @name SideNav
 * @description A sticky side navigation component, ideal for documentation sites or complex applications, with support for nested links and scroll-spy.
 * @tags navigation, layout, ui, menu
 * @props
 * - name: navItems
 * type: NavItem[]
 * description: An array of navigation item objects, defining the structure of the side navigation menu.
 * - name: sectionIds
 * type: string[]
 * description: An array of HTML element IDs that the scroll-spy should observe to highlight active navigation items.
 * - name: className
 * type: string
 * description: Optional additional CSS classes for custom styling of the side navigation container.
 * @category navigation
 */

const SideNav: React.FC<SideNavProps> = ({ navItems, sectionIds, className }) => {
  const activeAnchorId = useScrollSpy(sectionIds, { rootMargin: '0% 0% -80% 0%' });
  const location = useLocation();

  const renderNav = (items: NavItem[], isChild = false) => (
    <ul className={isChild ? 'pl-4 mt-2 space-y-2' : 'space-y-4'}>
      {items.map(item => {
        const isPageLink = item.href.startsWith('/');
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
    // The className is updated here to allow for scrolling
    <nav className={`sticky top-24 w-56 h-[calc(100vh-7rem)] overflow-y-auto pr-4 ${className || ''}`}>
      {renderNav(navItems)}
    </nav>
  );
};

export default SideNav;