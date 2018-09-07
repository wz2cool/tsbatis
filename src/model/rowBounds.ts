import { ObjectUtils } from "ts-commons";

export class RowBounds {
    public static readonly NO_ROW_OFFSET: number = 0;
    public static readonly NO_ROW_LIMIT: number = 5000;
    public static readonly DEFAULT: RowBounds = new RowBounds();
    public offset: number;
    public limit: number;

    constructor(offset?: number, limit?: number) {
        this.offset = ObjectUtils.isNullOrUndefined(offset) ? RowBounds.NO_ROW_OFFSET : offset;
        this.limit = ObjectUtils.isNullOrUndefined(limit) ? RowBounds.NO_ROW_LIMIT : limit;
    }
}
