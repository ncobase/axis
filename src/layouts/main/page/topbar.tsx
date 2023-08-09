import { randomId } from '@mantine/hooks';
import React from 'react';

import { getInitials } from '@/utils';

export interface TopbarProps extends React.PropsWithChildren {
  title?: string;
  operators?: React.JSX.Element[];
  extras?: React.JSX.Element[];
}

const TopbarWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className='px-4 h-12 bg-white shadow-sm align-middle items-center flex gap-4'>
    {children}
  </div>
);

export const Topbar: React.FC<TopbarProps> = ({ title, operators = [], extras = [], children }) => {
  if (children) return <TopbarWrapper>{children}</TopbarWrapper>;
  return (
    <TopbarWrapper>
      {title && (
        <div className='font-bold text-gray-800'>
          {title}
          <span className='pl-px ml-4 w-px bg-gray-200' />
        </div>
      )}
      <div className='gap-4 flex'>
        {operators.map((element, index) => (
          <React.Fragment key={getInitials(title) + randomId() + '_' + index.toString()}>
            {element}
          </React.Fragment>
        ))}
      </div>
      <div className='grow flex justify-end items-center gap-4'>
        {extras.map((element, index) => (
          <React.Fragment key={getInitials(title) + randomId() + '_' + index.toString()}>
            {element}
          </React.Fragment>
        ))}
      </div>
    </TopbarWrapper>
  );
};
