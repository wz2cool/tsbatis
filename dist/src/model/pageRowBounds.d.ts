import { RowBounds } from "./rowBounds";
export declare class PageRowBounds extends RowBounds {
    private readonly pageNum;
    private readonly pageSize;
    constructor(pageNum: number, pageSize: number);
    getPageNum(): number;
    getPageSize(): number;
}
