import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ACCESS_TOKEN_KEY } from '@/features/account/context';
import { TENANT_KEY } from '@/features/system/tenant/context';
import { XMdTenantKey } from '@/helpers/constants';
import { locals } from '@/helpers/locals';
import { isBrowser } from '@/helpers/ssr';

export class Request {
  private instance: AxiosInstance;
  private baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_URL || '/api',
    timeout: 30000
  };

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create({
      ...this.baseConfig,
      ...config,
      headers: this.getHeaders()
    });
  }

  private getHeaders() {
    const token = isBrowser ? locals.get(ACCESS_TOKEN_KEY) : '';
    const tenant = isBrowser ? locals.get(TENANT_KEY) : '';
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const currentTenant = tenant ? { [XMdTenantKey]: locals.get(TENANT_KEY) } : {};
    return {
      ...currentTenant,
      ...authHeaders
    };
  }

  private handleRequestError(err: AxiosError): void {
    const axiosError = err as AxiosError;
    let message = '';

    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 401:
          message = '请求授权错误 (401)';
          break;
        default:
          message = `请求错误 (${axiosError.response.status})!`;
      }
      console.info('axios 错误：', message);
    }

    // 全局错误提示
    throw axiosError;
  }

  protected async request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R>> {
    try {
      return (await this.instance.request({ ...config, responseType: 'json' })) as AxiosResponse<R>;
    } catch (err) {
      this.handleRequestError(err as AxiosError);
      throw err;
    }
  }

  public async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R>> {
    return this.request<T, R>({ ...config, method: 'get', url });
  }

  public async post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R>> {
    return this.request<T, R>({ ...config, method: 'post', url, data });
  }

  public async put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R>> {
    return this.request<T, R>({ ...config, method: 'put', url, data });
  }

  public async delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<R>> {
    return this.request<T, R>({ ...config, method: 'delete', url });
  }
}

export const request = new Request({});
