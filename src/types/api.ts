export type PaginatedResponse<T> = {
  total: number;
  data: T[];
  current_page: number;
  per_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type ApiError = {
  message: string;
  status?: number;
};
