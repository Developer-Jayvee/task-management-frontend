

export interface PaginationLinkData {
    first : string|null;
    last : string|null;
    next : string|null;
    prev : string|null;
}
export interface PaginationData<T = []> {
    data: T;
    links ?: PaginationLinkData;
    meta : {
        links ?: PaginationLinkData;
        current_page : number;
        from : number;
        last_page : number;
        path : string;
        per_page: number;
        to: number;
        total: number;
    }    
}