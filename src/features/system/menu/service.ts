import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FetchError } from 'ofetch';

import { createMenu, getMenu, getMenus, getMenuTree, updateMenu } from '@/apis/menu/menu';
import { Menu, Menus, MenuTrees } from '@/features/system/menu/schema';
import { paginateByCursor } from '@/helpers/pagination';

interface MenuKeys {
  all: () => readonly ['menuService'];
  create: () => readonly ['menuService', 'create'];
  get: (options?: { menu?: string }) => readonly ['menuService', 'menu', { menu?: string }];
  tree: (options?: AnyObject) => readonly ['menuService', 'tree', AnyObject];
  update: () => readonly ['menuService', 'update'];
  list: (options?: AnyObject) => readonly ['menuService', 'menus', AnyObject];
}

export const menuKeys: MenuKeys = {
  all: () => ['menuService'],
  create: () => [...menuKeys.all(), 'create'],
  get: ({ menu = '' } = {}) => [...menuKeys.all(), 'menu', { menu }],
  tree: ({ menu = '', type = '' } = {}) => [...menuKeys.all(), 'tree', { menu, type }],
  update: () => [...menuKeys.all(), 'update'],
  list: ({ cursor = '', limit = 20, type = '' } = {}) => [
    ...menuKeys.all(),
    'menus',
    { cursor, limit, type }
  ]
};

export const useCreateMenu = (
  config: Partial<UseMutationOptions<Menu, FetchError, Pick<Menu, keyof Menu>>> = {}
) => {
  return useMutation((payload: Pick<Menu, keyof Menu>) => createMenu(payload), config);
};

export const useGetMenu = (
  menu: string,
  config: UseQueryOptions<Menu, FetchError, Menu, InferQueryKey<typeof menuKeys.get>> = {}
) => {
  return useQuery(menuKeys.get({ menu }), (): Promise<Menu> => getMenu(menu), config);
};

export const useGetMenuTree = (
  menu: string,
  type?: string,
  config: UseQueryOptions<
    MenuTrees,
    FetchError,
    MenuTrees,
    InferQueryKey<typeof menuKeys.tree>
  > = {}
) => {
  const result = useQuery(
    menuKeys.tree({ menu, type }),
    (): Promise<MenuTrees> => getMenuTree(menu, type),
    config
  );

  const { content: menus } = result.data || {};

  return {
    menus
  };
};

export const useUpdateMenu = (
  config: Partial<UseMutationOptions<Menu, FetchError, Pick<Menu, keyof Menu>>> = {}
) => {
  return useMutation((payload: Pick<Menu, keyof Menu>) => updateMenu(payload), config);
};

export const useListMenus = (
  dynamicParams: AnyObject,
  config: UseQueryOptions<Menus, FetchError, Menus, InferQueryKey<typeof menuKeys.list>> = {}
) => {
  console.log(dynamicParams);

  const result = useQuery(
    menuKeys.list({ ...dynamicParams }),
    (): Promise<Menus> => getMenus(dynamicParams),
    config
  );

  const { content: menus } = result.data || {};
  const { cursor = '', limit = 20 } = dynamicParams;

  const { rs, hasNextPage, nextCursor } =
    (menus && paginateByCursor(menus, cursor as string, limit as number)) || ({} as any);

  return {
    menus: rs,
    hasNextPage,
    nextCursor,
    ...result
  };
};
