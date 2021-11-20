import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { X_MD_Total } from '@/constants/header';
// import { TOKEN_KEY } from '@/pages/auth/context';
import { locals } from '@/utils/locals';
import { isBrowser } from '@/utils/ssr';

Axios.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    const isExternal = !!config?.url?.startsWith('http');
    const token = isBrowser ? locals.get('access_token') : null;
    const authHeaders = token && !isExternal ? { Authorization: `Bearer ${token}` } : {};
    return {
      baseURL: import.meta.env.VITE_API_URL || '/api',
      ...config,
      headers: {
        ...authHeaders,
        ...config.headers
      }
    };
  },
  error => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers?.[X_MD_Total]) {
      return {
        content: response.data,
        total: response.headers[X_MD_Total]
      };
    }
    return response.data;
  },
  error => Promise.reject(error)
);
