import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='py-5 text-center text-xs text-white/60'>
      Copyright ©{year} Youxun Interactive. All Rights Reserved. 京ICP备19031278号-3
    </div>
  );
};

export default Footer;
