import { ColumnInfo } from "../model/columnInfo";

export class EntityCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new EntityCache();
    private readonly cache: { [entity: string]: ColumnInfo } = {};
    private constructor() {
        // hide constructor
    }

    public add(entity: string, columnInfo: ColumnInfo) {
        this.cache[entity] = columnInfo;
    }
}
