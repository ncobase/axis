import { Tenant, Tenants } from '@tone/types';

import { request } from '@/apis/request';
import { buildQueryString } from '@/helpers/common';

const ENDPOINT = '/account/tenants';

// get user belonged tenants or my tenants
export const getUserTenants = async (params: AnyObject): Promise<Tenants> => {
  const queryString = buildQueryString(params);
  return request.get(`${ENDPOINT}?${queryString}`);
};

// get user tenant detail
export const getUserTenant = async (id: string): Promise<Tenant> => {
  return request.get(`${ENDPOINT}/${id}`);
};
