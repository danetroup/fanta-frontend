// src/components/ui/Pagination.tsx
import React, { useCallback, useMemo } from 'react';
import Button from './Button'; // Re-use our Button component

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number; // Maximum number of page buttons to display
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5, // Default to 5 visible page buttons
}) => {
  const getPageNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    const delta = Math.floor(maxPageButtons / 2); // Half of visible buttons on each side of current page

    let startPage = Math.max(1, currentPage - delta);
    let endPage = Math.min(totalPages, currentPage + delta);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...'); // Ellipsis for beginning
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...'); // Ellipsis for end
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxPageButtons]);

  const handlePageClick = useCallback((page: number | '...') => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  }, [onPageChange]);

  const handlePrevClick = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNextClick = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  if (totalPages <= 1) {
    return null; // Don't render pagination if only one or no pages
  }

  return (
    <nav className="flex justify-center items-center space-x-2 p-4">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {getPageNumbers.map((page, index) => (
        <Button
          key={index} // Use index as key for '...' to avoid duplicate keys, typically not ideal but acceptable for simple pagination
          variant={page === currentPage ? 'primary' : 'outline'}
          size="sm"
          onClick={() => handlePageClick(page)}
          disabled={page === '...'}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </nav>
  );
};

export default Pagination;