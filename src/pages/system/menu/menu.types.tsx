export interface MenuProps {
  id?: string;
  name?: string;
  label: string;
  icon?: string;
  slug?: string;
  path: string;
  type?: string;
  target?: string;
  certified?: boolean;
  perms?: string;
  hidden?: boolean;
  order?: number;
  disabled?: boolean;
  properties?: object;
  created_by?: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
}

export interface MainMenuProps extends MenuProps {
  children?: MenuProps[];
}

export interface MenusProps {
  content: MenuProps[];
  total: number;
}
