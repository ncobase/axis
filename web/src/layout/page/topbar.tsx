import React from 'react';

import { randomId } from '@/helpers/common';
import { usePageContext } from '@/layout';
import { useTheme } from '@/themes';

export interface TopbarProps extends React.PropsWithChildren {
  title?: string;
  actions?: React.JSX.Element[];
  extras?: React.JSX.Element[];
}

const TWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { other } = useTheme();
  const { layout, sidebar } = usePageContext();

  const topbarHeight = other.layout.topbar.height;
  const headerHeight = layout ? other.layout.header.height : 0;
  const sidebarWidth = sidebar ? other.layout.sidebar.width : 0;

  return (
    <div
      className='fixed z-30 px-4 h-12 bg-white shadow-sm align-middle items-center flex gap-4 overflow-hidden'
      style={{
        height: topbarHeight,
        top: headerHeight,
        left: sidebarWidth,
        right: 0
      }}
    >
      {children}
    </div>
  );
};

export const Topbar: React.FC<TopbarProps> = ({ title, actions = [], extras = [], children }) => {
  if (children) return <TWrapper>{children}</TWrapper>;
  return (
    <TWrapper>
      {title && (
        <div className='font-bold text-slate-600'>
          {title}
          {(!!actions.length || !!extras.length) && (
            <span className='pl-px ml-4 w-px bg-slate-200' />
          )}
        </div>
      )}
      {!!actions.length && (
        <div className='gap-4 flex'>
          {actions.map(element => (
            <React.Fragment key={randomId()}>{element}</React.Fragment>
          ))}
        </div>
      )}
      {!!extras.length && (
        <div className='grow flex justify-end items-center gap-4'>
          {extras.map(element => (
            <React.Fragment key={randomId()}>{element}</React.Fragment>
          ))}
        </div>
      )}
    </TWrapper>
  );
};
