import { Entity } from "./entity";
export declare class Page<T extends Entity> {
    private pageNum;
    private pageSize;
    private total;
    private pages;
    private entities;
    constructor(pageNum: number, pageSize: number, total: number, entities: T[]);
    getPageNum(): number;
    getPageSize(): number;
    getTotal(): number;
    getPages(): number;
    getEntities(): T[];
    private calPages(pageSize, total);
}
