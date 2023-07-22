import React from 'react';

import profileBackground from '@/assets/images/profile-bg.jpg';
import { Page } from '@/layouts/main';
import { useAccount } from '@/pages/account/account.service';

export const Profile = () => {
  const { user = {}, profile = {} } = useAccount();

  return (
    <Page title='Profile' withLayout noWithContainer>
      <div className='h-56 -z-10 bg-blue-50 relative'>
        <img className='w-full h-full bg-cover' src={profileBackground} alt='' />
      </div>
      <div className='container mx-auto z-10 -mt-44 h-24'>
        <div className='h-56 p-6 mb-6 bg-white rounded-xl shadow-sm'>
          <div className='flex items-center justify-between'>{JSON.stringify(user)}</div>
        </div>
        <div className='h-56 p-6 mb-6 bg-white rounded-xl shadow-sm'>
          <div className='flex items-center justify-between'>{JSON.stringify(profile)}</div>
        </div>
      </div>
    </Page>
  );
};
