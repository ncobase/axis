import { request } from '@/apis/request';
import { Menu, Menus, MenuTrees } from '@/features/system/menu/schema';
import { buildQueryString } from '@/helpers';

const ENDPOINT = '/menus';

// create
export const createMenu = async (payload: Menu): Promise<Menu> => {
  return request.post(ENDPOINT, { ...payload });
};

// get
export const getMenu = async (id: string): Promise<Menu> => {
  return request.get(`${ENDPOINT}/${id}`);
};

// update
export const updateMenu = async (payload: Menu): Promise<Menu> => {
  return request.put(`${ENDPOINT}/${payload.id}`, { ...payload });
};

// delete
export const deleteMenu = async (id: string): Promise<Menu> => {
  return request.delete(`${ENDPOINT}/${id}`);
};

// list
export const getMenus = async (params: any): Promise<Menus> => {
  const queryString = buildQueryString(params);
  return request.get(`${ENDPOINT}?${queryString}`);
};

// get menu tree
export const getMenuTree = async (menu: string, type?: string): Promise<MenuTrees> => {
  const queryParams = buildQueryString({ menu, type });
  return request.get(`/trees/menus?${queryParams}`);
};
