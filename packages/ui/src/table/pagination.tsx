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
    const pageInput = e.currentTarget.pageInput.value;
    const pageNumber = parseInt(pageInput, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between px-2 py-4 shadow-[0_-1px_2px_0_rgba(0,0,0,0.03)]',
        className
      )}
    >
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
          <TooltipContent side='bottom'>第一页</TooltipContent>
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
          <TooltipContent side='bottom'>上一页</TooltipContent>
        </Tooltip>
      </div>
      <div className='flex items-center justify-center gap-x-1 text-slate-400'>
        显示<span className='font-bold'>{startIndex}</span>至
        <span className='font-bold'>{endIndex}</span>
        条记录，共 <span className='font-bold'>{totalItems}</span> 条
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
          <TooltipContent side='bottom'>下一页</TooltipContent>
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
          <TooltipContent side='bottom'>最后一页</TooltipContent>
        </Tooltip>
        {totalPages > 1 && (
          <form onSubmit={handleJumpToPage} className='flex items-center gap-x-3'>
            <span className='text-slate-400'>共 {totalPages} 页，跳转至</span>
            <Input
              type='number'
              name='pageInput'
              min='1'
              max={totalPages}
              defaultValue={currentPage.toString()}
              aria-hidden
              className='px-2 py-0.5 w-12'
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type='submit' variant='slate' size='ratio'>
                  <Icons name='IconArrowForwardUp' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='bottom'>跳转</TooltipContent>
            </Tooltip>
          </form>
        )}
      </div>
    </div>
  );
};
