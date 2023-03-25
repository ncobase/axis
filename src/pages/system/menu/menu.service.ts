import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';

import { MenuProps, MenusProps } from '@/pages/system/menu/menu.types';
import { paginateByCursor } from '@/utils/pagination';

interface MenuKeys {
  all: () => readonly ['menuService'];
  create: () => readonly ['menuService', 'create'];
  get: (options?: { id?: string }) => readonly ['menuService', 'menu', { id?: string }];
  update: () => readonly ['menuService', 'update'];
  list: (
    url: string,
    options?: { cursor?: string; limit?: number }
  ) => readonly ['menuService', 'menus', string, { cursor?: string; limit?: number }];
}

export const menuKeys: MenuKeys = {
  all: () => ['menuService'],
  create: () => [...menuKeys.all(), 'create'],
  get: ({ id = '' } = {}) => [...menuKeys.all(), 'menu', { id }],
  update: () => [...menuKeys.all(), 'update'],
  list: (url, { cursor = '', limit = 20 } = {}) => [
    ...menuKeys.all(),
    'menus',
    url,
    { cursor, limit }
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
  id?: string,
  {
    enabled = !!id,
    ...config
  }: UseQueryOptions<MenuProps, AxiosError, MenuProps, InferQueryKey<typeof menuKeys.get>> = {}
) => {
  const result = useQuery(
    menuKeys.get({ id }),
    (): Promise<MenuProps> => Axios.get(`/menus/${id}`),
    {
      enabled,
      ...config
    }
  );
  const { data: menu, ...rest } = result;
  return {
    menu,
    ...rest
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
  { cursor = '', limit = 20 } = {},
  config: UseQueryOptions<
    MenusProps,
    AxiosError,
    MenusProps,
    InferQueryKey<typeof menuKeys.list>
  > = {},
  url = `/menus?cursor=${cursor ?? ''}&limit=${limit ?? 20}`
) => {
  const result = useQuery(menuKeys.list(url), (): Promise<MenusProps> => Axios.get(url), {
    ...config
  });

  const { content: menus } = result.data || {};
  const { rs, hasNextPage, nextCursor } =
    (menus && paginateByCursor(menus, cursor, limit)) || ({} as any);

  return {
    menus: rs,
    hasNextPage,
    nextCursor,
    ...result
  };
};
