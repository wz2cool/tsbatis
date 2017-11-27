import { ColumnInfo } from "../model/columnInfo";
export declare class EntityCache {
    static getInstance(): EntityCache;
    private static instance;
    private readonly columnCache;
    private constructor();
    cacheColumnInfo(columnInfo: ColumnInfo): void;
    getColumnInfo(entity: string, property: string): ColumnInfo;
    getColumnInfos(entity: string): ColumnInfo[];
    getProperties(entity: string): string[];
}
