import { IProduct } from "./product";

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    pageCount: number;
    data: IProduct[];
}