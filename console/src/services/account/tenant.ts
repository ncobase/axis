import { AnyObject, Tenant, Tenants } from '@tone/types';

import { buildQueryString } from '@/helpers/common';
import { request } from '@/services/request';

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
