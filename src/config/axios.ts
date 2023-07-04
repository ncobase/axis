import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { XMdTenantKey, XMdTotalKey } from '@/constants/header';
import { ACCESS_TOKEN_KEY } from '@/pages/account/account.context';
import { TENANT_KEY } from '@/pages/system/tenant/tenant.context';
import { locals } from '@/utils/locals';
import { isBrowser } from '@/utils/ssr';

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
