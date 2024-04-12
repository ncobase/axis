import React from 'react';

import { cn } from '@tone/utils';

import { Button } from '../button';
import { Icons } from '../icon';

interface IPaginationProps {
  className?: string;
  totalItems: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  className
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div
      className={cn(
        'flex items-center justify-between px-2 py-4 shadow-[0_-1px_2px_0_rgba(0,0,0,0.03)]',
        className
      )}
    >
      <div className='flex items-center justify-between gap-3'>
        <Button
          variant='slate'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isFirstPage}
        >
          <Icons name='IconChevronsLeft' />
        </Button>
      </div>
      <div className='flex items-center justify-center gap-x-1 text-slate-600'>
        第<span className='font-bold'>{currentPage}</span> 页 共{' '}
        <span className='font-bold'>{totalPages}</span> 页
      </div>
      <div className='flex items-center justify-between gap-3'>
        <Button
          variant='slate'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLastPage}
        >
          <Icons name='IconChevronsRight' />
        </Button>
      </div>
    </div>
  );
};
