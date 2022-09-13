/* eslint-disable react/no-array-index-key */
import cn from 'classnames';
import { usePagination } from '../../hooks/usePagination';
import { IPaginationProps } from './Pagination.interface';
import './Pagination.scss';

function Pagination({
  onPageChange,
  pageSize,
  currentPage,
  total,
  className,
  siblingCount = 1,
}: IPaginationProps) {
  const DOTS = '...';

  const paginationRange = usePagination({
    currentPage,
    total,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 1) {
    return null;
  }

  const onNext = () => {
    if (currentPage < 30) {
      const newPage = currentPage + 1;
      onPageChange(newPage);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      onPageChange(newPage);
    }
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={cn('pagination-ul', className)}>
      <li
        className={cn('pagination-ul__item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}>
        <div className={cn('pagination-arrow', 'left')} />
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS || typeof pageNumber === 'string') {
          return (
            <li className={cn('pagination-ul__item', 'dots')} key={i}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            className={cn('pagination-ul__item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={i}>
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cn('pagination-ul__item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}>
        <div className={cn('pagination-arrow', 'right')} />
      </li>
    </ul>
  );
}

export default Pagination;
