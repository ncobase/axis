import React, { Fragment } from 'react';

import { usePageContext } from '@/components/layout';
import { useTheme } from '@/themes';
import { randomId } from '@/utils';

export interface TopbarProps extends React.PropsWithChildren {
  title?: string;
  operators?: React.JSX.Element[];
  extras?: React.JSX.Element[];
}

const TopbarWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { other } = useTheme();
  const { layout } = usePageContext();
  return (
    <div
      className='fixed z-10 w-full px-4 h-12 bg-white shadow-sm align-middle items-center flex gap-4 overflow-hidden'
      style={{
        height: other.layout.topbar.height,
        top: layout ? other.layout.header.height : 0
      }}
    >
      {children}
    </div>
  );
};

export const Topbar: React.FC<TopbarProps> = ({ title, operators = [], extras = [], children }) => {
  if (children) return <TopbarWrapper>{children}</TopbarWrapper>;
  return (
    <TopbarWrapper>
      {title && (
        <div className='font-bold text-slate-600'>
          {title}
          <span className='pl-px ml-4 w-px bg-slate-200' />
        </div>
      )}
      <div className='gap-4 flex'>
        {operators.map(element => (
          <Fragment key={randomId()}>{element}</Fragment>
        ))}
      </div>
      <div className='grow flex justify-end items-center gap-4'>
        {extras.map(element => (
          <Fragment key={randomId()}>{element}</Fragment>
        ))}
      </div>
    </TopbarWrapper>
  );
};
