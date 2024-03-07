import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Menu, Menus, MenuTrees } from '@tone/types';
import { FetchError } from 'ofetch';

import { createMenu, getMenu, getMenus, getMenuTree, updateMenu } from '@/apis/menu/menu';
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
  get: ({ menu } = {}) => [...menuKeys.all(), 'menu', { menu }],
  tree: (queryKey = {}) => [...menuKeys.all(), 'tree', queryKey],
  update: () => [...menuKeys.all(), 'update'],
  list: (queryKey = {}) => [...menuKeys.all(), 'menus', queryKey]
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
  return {
    menus: result.data as MenuTrees
  };
};

export const useUpdateMenu = (
  config: Partial<UseMutationOptions<Menu, FetchError, Pick<Menu, keyof Menu>>> = {}
) => {
  return useMutation((payload: Pick<Menu, keyof Menu>) => updateMenu(payload), config);
};

export const useListMenus = (
  queryKey: AnyObject = {},
  config: UseQueryOptions<Menus, FetchError, Menus, InferQueryKey<typeof menuKeys.list>> = {}
) => {
  const result = useQuery(
    menuKeys.list(queryKey),
    (): Promise<Menus> => getMenus(queryKey),
    config
  );

  const { content: menus = [] } = result.data || {};
  const { cursor, limit } = queryKey;

  const { rs, hasNextPage, nextCursor } =
    (menus && paginateByCursor(menus, cursor as string, limit as number)) || ({} as any);

  return {
    menus: rs,
    hasNextPage,
    nextCursor,
    ...result
  };
};
