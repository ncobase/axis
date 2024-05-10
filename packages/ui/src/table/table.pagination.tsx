import React from 'react';

import { cn } from '@tone/utils';

import { Button } from '../button';
import { Input } from '../forms';
import { Icons } from '../icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

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
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handleJumpToPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { pageInput } = e.currentTarget;
    const pageNumber = parseInt(pageInput.value, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const classes = cn(
    'flex items-center justify-between px-2 py-4 shadow-[0_-1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );

  return (
    <div className={classes}>
      <div className='flex items-center justify-between gap-3'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='slate'
              size='ratio'
              onClick={() => handlePageChange(1)}
              disabled={isFirstPage}
            >
              <Icons name='IconChevronLeftPipe' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>First Page</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='slate'
              size='ratio'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isFirstPage}
            >
              <Icons name='IconChevronLeft' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Previous Page</TooltipContent>
        </Tooltip>
      </div>
      <div className='flex items-center justify-center gap-x-1 text-slate-400'>
        Displaying <span className='font-bold'>{startIndex}</span> to{' '}
        <span className='font-bold'>{endIndex}</span> of{' '}
        <span className='font-bold'>{totalItems}</span> items
      </div>
      <div className='flex items-center justify-between gap-3'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='slate'
              size='ratio'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isLastPage}
            >
              <Icons name='IconChevronRight' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Next Page</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='slate'
              size='ratio'
              onClick={() => handlePageChange(totalPages)}
              disabled={isLastPage}
            >
              <Icons name='IconChevronRightPipe' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Last Page</TooltipContent>
        </Tooltip>
        {totalPages > 1 && (
          <form onSubmit={handleJumpToPage} className='flex items-center gap-x-3'>
            <span className='text-slate-400 text-nowrap'>
              Page {currentPage} of {totalPages}, Go to
            </span>
            <Input
              type='number'
              name='pageInput'
              min='1'
              max={totalPages}
              defaultValue={currentPage.toString()}
              className='px-2 py-0.5 max-w-12'
            />
            <span className='text-slate-400'>page</span>
          </form>
        )}
      </div>
    </div>
  );
};
