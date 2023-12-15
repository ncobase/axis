import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { MenuProps, MenusProps, MenuTreeReply } from '@/features/system/menu/schema';
import { paginateByCursor } from '@/helpers/pagination';

interface MenuKeys {
  all: () => readonly ['menuService'];
  create: () => readonly ['menuService', 'create'];
  get: (options?: { menu?: string }) => readonly ['menuService', 'menu', { menu?: string }];
  tree: (options?: {
    menu?: string;
    type?: string;
  }) => readonly ['menuService', 'tree', { id?: string; type?: string }];
  update: () => readonly ['menuService', 'update'];
  list: (
    url: string,
    options?: { [key: string]: string | number }
  ) => readonly ['menuService', 'menus', string, { [key: string]: unknown }];
}

export const menuKeys: MenuKeys = {
  all: () => ['menuService'],
  create: () => [...menuKeys.all(), 'create'],
  get: ({ menu = '' } = {}) => [...menuKeys.all(), 'menu', { menu }],
  tree: ({ menu = '', type = '' } = {}) => [...menuKeys.all(), 'tree', { menu, type }],
  update: () => [...menuKeys.all(), 'update'],
  list: (url, { cursor = '', limit = 20, type = '' } = {}) => [
    ...menuKeys.all(),
    'menus',
    url,
    { cursor, limit, type }
  ]
};

export const useCreateMenu = ({
  onSuccess,
  ...config
}: Partial<UseMutationOptions<MenuProps, AxiosError, Pick<MenuProps, keyof MenuProps>>>) => {
  return useMutation(formValues => Axios.post('/menus', formValues), {
    ...config,
    onSuccess: (data, ...rest) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(data);
      }
      onSuccess?.(data, ...rest);
    }
  });
};

export const useGetMenu = (
  menu?: string,
  {
    ...config
  }: UseQueryOptions<MenuProps, AxiosError, MenuProps, InferQueryKey<typeof menuKeys.get>> = {}
) => {
  return useQuery(menuKeys.get({ menu }), (): Promise<MenuProps> => Axios.get(`/menus/${menu}`), {
    ...config
  });
};

export const useGetMenuTree = (
  menu?: string,
  type?: string,
  {
    ...config
  }: UseQueryOptions<
    MenuTreeReply,
    AxiosError,
    MenuTreeReply,
    InferQueryKey<typeof menuKeys.tree>
  > = {}
) => {
  const result = useQuery(
    menuKeys.tree({ menu, type }),
    (): Promise<MenuTreeReply> =>
      Axios.get(`/trees/menus?menu=${menu}${type ? '&type=' + type : ''}`),
    {
      ...config
    }
  );

  const { content: menus } = result.data || {};

  return {
    menus
  };
};

export const useUpdateMenu = ({
  onSuccess,
  ...config
}: Partial<UseMutationOptions<MenuProps, AxiosError, Pick<MenuProps, keyof MenuProps>>>) => {
  return useMutation(formValues => Axios.put('/menus', formValues), {
    ...config,
    onSuccess: (data, ...rest) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log(data);
      }
      onSuccess?.(data, ...rest);
    }
  });
};

export const useListMenus = (
  dynamicParams: { [key: string]: string | number } = {},
  config: UseQueryOptions<
    MenusProps,
    AxiosError,
    MenusProps,
    InferQueryKey<typeof menuKeys.list>
  > = {}
) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(dynamicParams)) {
    params.append(key, String(value));
  }

  const url = '/menus?' + params.toString();
  const result = useQuery(menuKeys.list(url), (): Promise<MenusProps> => Axios.get(url), {
    ...config
  });

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
