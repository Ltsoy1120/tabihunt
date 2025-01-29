import React from 'react';
import Button from '../../../../components/UI/buttons/Button';
import './style.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  first: boolean
  last: boolean
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, first, last }) => {

  const getPageNumbers = () => {
    const pages: Array<number | JSX.Element> = [1];
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (currentPage > 3) pages.push(<h1>...</h1>);
    if (startPage < 2) startPage = 2;
    if (endPage > totalPages - 1) endPage = totalPages - 1;
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push(<h1>...</h1>);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };
  const pageNumbers = getPageNumbers();

  return (
    <div className="paginationReport">
      <Button
        onClick={() => onPageChange(Math.max(currentPage, 1))}
        disabled={first}
        endIcon="arrow-down"
      >
        {""}
      </Button>
      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            className={page === currentPage + 1 ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="pagination-ellipsis">
            {page}
          </span>
        )
      )}
      <Button
        onClick={() => onPageChange(Math.min(currentPage + 2, totalPages))}
        disabled={last}
        endIcon="arrow-down"
      >
        {""}
      </Button>
    </div>
  );
};

export default Pagination;
