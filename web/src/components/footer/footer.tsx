import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='py-5 text-center text-xs text-white/60'>
      Copyright ©{year} Youxun Interactive. All Rights Reserved. 京 ICP 备 19031278 号 - 3
    </div>
  );
};
