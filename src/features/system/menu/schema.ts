export interface Menu {
  id: string;
  name?: string;
  label: string;
  icon?: any; // string is Tabler Icons
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
  children?: Menu[];
}

export interface MenuTreeReply extends Menu {}

export interface MenuTreeReply {
  content: Menu[];
}

export interface MenusReply {
  content: Menu[];
  total: number;
}
