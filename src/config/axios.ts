import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { XMdDomainKey, XMdTotalKey } from '@/constants/header';
import { ACCESS_TOKEN_KEY } from '@/pages/account/account.context';
import { DOMAIN_KEY } from '@/pages/system/domain/domain.context';
import { locals } from '@/utils/locals';
import { isBrowser } from '@/utils/ssr';

Axios.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    const isExternal = !!config?.url?.startsWith('http');
    const token = isBrowser ? locals.get(ACCESS_TOKEN_KEY) : '';
    const domain = isBrowser ? locals.get(DOMAIN_KEY) : '';
    const authHeaders = token && !isExternal ? { Authorization: `Bearer ${token}` } : {};
    const currentDomain = domain ? { [XMdDomainKey]: locals.get(DOMAIN_KEY) } : {};
    return {
      baseURL: import.meta.env.VITE_API_URL || '/api',
      ...config,
      headers: {
        ...currentDomain,
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
