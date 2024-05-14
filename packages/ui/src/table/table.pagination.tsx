import React from 'react';

import { cn } from '@tone/utils';

import { Button } from '../button';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../forms';
import { Icons } from '../icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

export interface IPaginationProps {
  className?: string;
  totalItems: number;
  pageSize: number;
  pageSizes: number[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  texts?: {
    firstPage?: string;
    previousPage?: string;
    nextPage?: string;
    lastPage?: string;
    pageText?: string;
    ofText?: string;
    goToText?: string;
    displayingText?: string;
    toText?: string;
    itemsText?: string;
    perPageText?: string;
  };
}

const defaultTexts = {
  firstPage: 'First Page',
  previousPage: 'Previous Page',
  nextPage: 'Next Page',
  lastPage: 'Last Page',
  pageText: 'Page',
  ofText: 'of',
  goToText: 'Go to',
  displayingText: 'Displaying',
  toText: 'to',
  itemsText: 'items',
  perPageText: 'Per Page'
};

export const Pagination: React.FC<IPaginationProps> = ({
  totalItems,
  pageSize = 10,
  pageSizes = [5, 10, 25, 50, 100],
  currentPage,
  onPageChange,
  onPageSizeChange,
  className,
  texts = {}
}) => {
  const {
    firstPage,
    previousPage,
    nextPage,
    lastPage,
    pageText,
    ofText,
    goToText,
    displayingText,
    toText,
    itemsText,
    perPageText
  } = { ...defaultTexts, ...texts };

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

  const handlePageSizeChange = (size: number) => {
    onPageSizeChange(size);
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
          <TooltipContent side='bottom'>{firstPage}</TooltipContent>
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
          <TooltipContent side='bottom'>{previousPage}</TooltipContent>
        </Tooltip>
      </div>
      <div className='flex items-center justify-center gap-x-1 text-slate-400'>
        {displayingText} <span className='font-bold'>{startIndex}</span> {toText}{' '}
        <span className='font-bold'>{endIndex}</span> {ofText}{' '}
        <span className='font-bold'>{totalItems}</span> {itemsText}
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
          <TooltipContent side='bottom'>{nextPage}</TooltipContent>
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
          <TooltipContent side='bottom'>{lastPage}</TooltipContent>
        </Tooltip>
        {pageSizes.length > 1 && (
          <div className='flex items-center'>
            <span className='text-slate-400 text-nowrap mr-2'>{perPageText}</span>
            <Select
              defaultValue={pageSizes.find(size => size === pageSize)?.toString()}
              onValueChange={(size: string) => handlePageSizeChange(parseInt(size, 10))}
            >
              <SelectTrigger className='py-1.5 bg-slate-50'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                {pageSizes.map(size => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {totalPages > 1 && (
          <form onSubmit={handleJumpToPage} className='flex items-center gap-x-3'>
            <span className='text-slate-400 text-nowrap'>
              {pageText} {currentPage} {ofText} {totalPages}, {goToText}
            </span>
            <Input
              type='number'
              name='pageInput'
              min='1'
              max={totalPages}
              defaultValue={currentPage.toString()}
              className='px-2 py-0.5 max-w-12'
            />
            <span className='text-slate-400'>{pageText}</span>
          </form>
        )}
      </div>
    </div>
  );
};
