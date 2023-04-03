export interface IPagination<T> {
    pageIndex: number;
    pageSize: number;
    count: number;
    pageCount: number;
    data: T[];
}