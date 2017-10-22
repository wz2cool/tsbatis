import { Entity } from "./entity";
import { RowBounds } from "./rowBounds";

export class Page<T extends Entity> {
    private pageNum: number;
    private pageSize: number;
    private total: number;
    private pages: number;
    private entities: T[];

    constructor(rowBounds: RowBounds, total: number, entities: T[]) {
        // this.pageNum = pageNum;
        // this.pageSize = pageSize;
        // this.total = total;
        // this.entities = entities;
        // calculate pages
    }

    public getPageNum(): number {
        return this.pageNum;
    }

    public getPageSize(): number {
        return this.pageSize;
    }

    public getTotal(): number {
        return this.total;
    }

    public getPages(): number {
        return this.pages;
    }

    public getEntities(): T[] {
        return this.entities;
    }
}
