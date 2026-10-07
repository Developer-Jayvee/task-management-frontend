export interface DetailedPaginationLinksData {
  active: boolean;
  label : string;
  page : number;
  url : string;
}
export interface PaginationLinkData {
  first: DetailedPaginationLinksData | null;
  last: DetailedPaginationLinksData | null;
  next: DetailedPaginationLinksData | null;
  prev: DetailedPaginationLinksData | null;
}

export interface PaginationMetaData {
  links?: Array<DetailedPaginationLinksData>;
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
export interface PaginationData<T = []> {
  data: T;
  links?: PaginationLinkData;
  meta: PaginationMetaData;
}
