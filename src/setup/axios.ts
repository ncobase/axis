import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ACCESS_TOKEN_KEY } from '@/features/account/context';
import { TENANT_KEY } from '@/features/system/tenant/context';
import { XMdTenantKey, XMdTotalKey } from '@/helpers/constants';
import { locals } from '@/helpers/locals';
import { isBrowser } from '@/helpers/ssr';

Axios.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    const isExternal = !!config?.url?.startsWith('http');
    const token = isBrowser ? locals.get(ACCESS_TOKEN_KEY) : '';
    const tenant = isBrowser ? locals.get(TENANT_KEY) : '';
    const authHeaders = token && !isExternal ? { Authorization: `Bearer ${token}` } : {};
    const currentTenant = tenant ? { [XMdTenantKey]: locals.get(TENANT_KEY) } : {};
    return {
      baseURL: import.meta.env.VITE_API_URL || '/api',
      ...config,
      headers: {
        ...currentTenant,
        ...authHeaders,
        ...config.headers
      }
    };
  },
  error => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers?.[XMdTotalKey]) {
      return {
        content: response.data,
        total: response.headers[XMdTotalKey]
      };
    }
    return response.data;
  },
  error => Promise.reject(error)
);
