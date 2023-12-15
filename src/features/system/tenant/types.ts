export interface Tenant {
  id: string;
  name: string;
  slug: string;
  url: string;
  logo: string;
  logo_alt: string;
  copyright: string;
  disabled: boolean;
  created_by: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
}

export interface Tenants {
  content: Tenant[];
  total: number;
}
