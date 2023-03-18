export interface Domain {
  id: string;
  name: string;
  slug: string;
  url: string;
  logo: string;
  logo_alt: string;
  copyright: string;
  disabled: boolean;
  created_by: string;
  created_at: number;
  updated_by: string;
  updated_at: number;
}

export interface Domains {
  content: Domain[];
  total: number;
}
