import { RowBounds } from "./rowBounds";

export class PageRowBounds extends RowBounds {
    private readonly pageNum: number;
    private readonly pageSize: number;

    // (pageNum = 1) is first page.
    constructor(pageNum: number, pageSize: number) {
        const usePageNume = pageNum < 1 ? 1 : pageNum;
        super((usePageNume - 1) * pageSize, pageSize);
    }

    public getPageNum(): number {
        return this.pageNum;
    }

    public getPageSize(): number {
        return this.pageSize;
    }
}
