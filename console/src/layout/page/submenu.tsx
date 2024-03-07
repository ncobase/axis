import React from 'react';

import { IconPlus } from '@tabler/icons-react';
import { Menu } from '@tone/types';
import { useLocation, useNavigate } from 'react-router-dom';

import { useListMenus } from '@/features/system/menu/service';
import { usePageContext } from '@/layout';
import { useTheme } from '@/themes';

interface SubmenuProps extends React.PropsWithChildren {}

export const Submenu: React.FC<SubmenuProps> = () => {
  const { other } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { layout, topbar } = usePageContext();

  const headerMenus = useListMenus({ type: 'header' }).menus ?? [];
  const pathArray = pathname.split('/').filter(part => part !== '');
  const parentMenu = headerMenus.find(menu => menu.slug === pathArray[0]);
  const sidebarMenus = (
    useListMenus({
      type: 'sidebar',
      parent: parentMenu?.id || null
    }).menus ?? []
  ).filter((menu: Menu) => !menu.hidden);

  let visibleSidebarMenus: any = [];

  if (pathArray.length > 1) {
    const sidebarMenu = sidebarMenus.find(
      menu => menu.slug === [pathArray[0], pathArray[1]].join('-')
    );
    visibleSidebarMenus = (
      useListMenus({
        type: 'submenu',
        parent: sidebarMenu?.id || null
      }).menus ?? []
    ).filter(menu => !menu.hidden || !menu.disabled);
  }

  if (!visibleSidebarMenus.length) return null;

  return (
    <div
      className='fixed z-20 w-44 h-full max-w-sm/2 p-5 bg-white shadow-sm overflow-auto text-xs text-slate-600 font-medium'
      style={{
        width: other.layout.submenu.width,
        top: layout ? other.layout.header.height : 0,
        marginTop: topbar ? other.layout.topbar.height : 0
      }}
    >
      <div className='text-slate-600 font-bold border-b pb-2 mb-2 border-dashed border-slate-200'>
        <span>模型</span>
        <button className='float-right text-blue-600'>
          <IconPlus size='16' />
        </button>
      </div>
      <button
        className='px-3 py-2 mb-2 bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span className='text-blue-600'>用户</span>
      </button>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>权限</span>
      </button>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>角色</span>
      </button>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>站点</span>
      </button>
      <div className='text-slate-600 font-bold border-b pb-2 my-2 border-dashed border-slate-200'>
        <span>组件</span>
        <button className='float-right text-blue-600'>
          <IconPlus size='16' />
        </button>
      </div>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>元素</span>
      </button>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>布局</span>
      </button>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>模板</span>
      </button>
      <div className='text-slate-600 font-bold border-b pb-2 my-2 border-dashed border-slate-200'>
        <span>效率</span>
        <button className='float-right text-blue-600'>
          <IconPlus size='16' />
        </button>
      </div>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>流程</span>
      </button>
      <button
        className='px-3 py-2 mb-2 hover:bg-slate-100 w-full text-left cursor-pointer rounded'
        onClick={() => navigate('user')}
      >
        <span>大小</span>
      </button>
    </div>
  );
};
