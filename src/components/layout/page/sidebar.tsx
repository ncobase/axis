import React from 'react';

import { useTheme } from '@/themes';

interface SidebarProps extends React.PropsWithChildren {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { other } = useTheme();

  return (
    <div
      className='w-44 h-full max-w-sm/2 bg-white -z-10'
      style={{ width: other.layout.sidebar.width }}
    >
      Sidebar
    </div>
  );
};
