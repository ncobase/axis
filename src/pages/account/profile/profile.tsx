import { Group } from '@mantine/core';
import React from 'react';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { DIcon } from '@/components/icon/icon';
import { Page } from '@/layouts/main';
import { useAccount } from '@/pages/account/account.service';
import { useTheme } from '@/themes';

export const Profile = () => {
  const { colors } = useTheme();
  const { user, profile, isLoading } = useAccount();

  return (
    <Page title='Profile' withLayout size='lg'>
      <div className='p-6 pb-0 mt-3 mb-6 bg-white rounded-xl shadow-sm'>
        <Group>
          <div className='relative'>
            <AvatarButton
              isLoading={isLoading}
              src={profile?.thumbnail}
              title={profile?.display_name || user?.username || ''}
              alt={profile?.display_name || user?.username || ''}
              size={120}
              radius='md'
            />
            {/*<div className='absolute none left-0 bottom-1.5 right-0 bg-white/30 text-center align-middle text-white'>*/}
            {/*  edit*/}
            {/*</div>*/}
          </div>
          <div>
            <span className='font-bold text-md text-slate-800'>
              {profile?.first_name?.concat(' ').concat(profile?.last_name || '')}
            </span>
            <Group mt={16} spacing={26}>
              <Group spacing={5}>
                <DIcon name='IconShieldCheck' color={colors.gray[5]} />
              </Group>
              <Group spacing={5}>
                <DIcon name='IconMapPin' color={colors.gray[5]} />
                <span className='text-xs text-slate-400'>{user?.phone}</span>
              </Group>
              <Group spacing={5}>
                <DIcon name='IconAt' color={colors.gray[5]} />
                <span className='text-xs text-slate-400'>{user?.email}</span>
              </Group>
              <Group spacing={5}>
                <DIcon name='IconPhoneCall' color={colors.gray[5]} />
                <span className='text-xs text-slate-400'>{user?.phone}</span>
              </Group>
            </Group>
            <Group mt={16} spacing={38}>
              <div className='border border-dashed border-slate-300 px-5 py-2 rounded-xl text-xs text-slate-400 text-center'>
                <span className='font-bold'>123</span>
                <div>项目</div>
              </div>
              <div className='border border-dashed border-slate-300 px-5 py-2 rounded-xl text-xs text-slate-400 text-center'>
                <span className='font-bold'>920,233.00</span>
                <div>销售额</div>
              </div>
              <div className='border border-dashed border-slate-300 px-5 py-2 rounded-xl text-xs text-slate-400 text-center'>
                <span className='font-bold'>320,233.00</span>
                <div>呆账</div>
              </div>
              <div className='border border-dashed border-slate-300 px-5 py-2 rounded-xl text-xs text-slate-400 text-center'>
                <span className='font-bold'>89%</span>
                <div>成功率</div>
              </div>
            </Group>
          </div>
        </Group>
        <div className='mt-10'>
          <button className='py-2 px-3 bg-transparent border-0 text-md border-b-2 border-b-blue-500 text-blue-500 mr-5 hover:text-blue-500 cursor-pointer'>
            基本信息
          </button>
          <button className='py-2 px-3 bg-transparent border-0 text-md border-b-2 border-b-transparent text-slate-500 mr-5 hover:text-blue-500 cursor-pointer'>
            支付信息
          </button>
          <button className='py-2 px-3 bg-transparent border-0 text-md border-b-2 border-b-transparent text-slate-500 mr-5 hover:text-blue-500 cursor-pointer'>
            地址信息
          </button>
          <button className='py-2 px-3 bg-transparent border-0 text-md border-b-2 border-b-transparent text-slate-500 mr-5 hover:text-blue-500 cursor-pointer'>
            设置
          </button>
        </div>
      </div>
      <div className='p-6 mb-6 bg-white rounded-xl shadow-sm'>
        <div className='grid gap-2 grid-cols-6 pb-5'>
          <div className='col-span-full'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>显示名称</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.display_name}
            </div>
          </div>
          <div className='col-span-full'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>简介</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.short_bio}
            </div>
          </div>
          <div className='col-span-3'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>名</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.first_name}
            </div>
          </div>
          <div className='col-span-3'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>姓</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.last_name}
            </div>
          </div>
          <div className='col-span-full'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>语言</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.language}
            </div>
          </div>
          <div className='col-span-full'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>关于</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.about || '-'}
            </div>
          </div>
          <div className='col-span-full'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>职称</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.about || '架构师、项目/开发经理'}
            </div>
          </div>
          <div className='col-span-full'>
            <span className='block text-sm font-medium leading-6 text-slate-900'>权限</span>
            <div className='border-b border-slate-100 pt-2 pb-3 text-slate-600'>
              {profile?.about || '日常办公、销售合同、部门人事'}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};
