export interface PaginationOptions {
  limit?: number;
  offset?: number;
  cursor?: string;
  sort?: string;
}
export interface PaginationResult<T> {
  items: T[];
  total: number;
  next: string | null;
  has_next: boolean;
}
