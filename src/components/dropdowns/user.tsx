import { createPopper } from '@popperjs/core';
import React from 'react';

import avatar from '@/assets/images/avatar.svg';

interface UserDropdownProps {}

const UserDropdown: React.FC<UserDropdownProps> = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef<any>();
  const popoverDropdownRef = React.createRef<any>();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start'
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className='text-blueGray-600 block'
        href='/'
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
        ref={btnDropdownRef}
      >
        <div className='items-center flex'>
          <span className='w-9 h-9 text-sm text-white bg-blueGray-300 inline-flex items-center justify-center rounded-full'>
            <img
              alt='...'
              className='w-full rounded-full align-middle border-none shadow-lg'
              src={avatar}
            />
          </span>
        </div>
      </a>
    </>
  );
};
export default UserDropdown;
