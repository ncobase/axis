import React from 'react';

export interface MenuProps {}

import MenuItem from '@/components/menu/item';

const Menu: React.FC<MenuProps> = () => {
  return (
    <>
      <div>Menu</div>
      <MenuItem />
    </>
  );
};

export default Menu;
