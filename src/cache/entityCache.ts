import * as util from "util";
import { ColumnInfo } from "../model/columnInfo";

export class EntityCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new EntityCache();
    private readonly cache: { [entity: string]: { [property: string]: ColumnInfo } } = {};
    private constructor() {
        // hide constructor
    }

    public addColumnInfo(columnInfo: ColumnInfo): void {
        let propertyMap = this.cache[columnInfo.entity];
        if (util.isNullOrUndefined(propertyMap)) {
            propertyMap = {};
            propertyMap[columnInfo.property] = columnInfo;
            this.cache[columnInfo.entity] = propertyMap;
        } else {
            propertyMap[columnInfo.property] = columnInfo;
        }
    }

    public getColumnInfo(entity: string, property: string): ColumnInfo {
        const propertyMap = this.cache[entity];
        if (util.isNullOrUndefined(propertyMap)) {
            return null;
        }

        return propertyMap[property];
    }

    public getColumnInfos(entity: string): ColumnInfo[] {
        const propertyMap = this.cache[entity];
        if (util.isNullOrUndefined(propertyMap)) {
            return null;
        }
        this.cache.keys
    }
}
