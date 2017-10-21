import * as lodash from "lodash";
import { CommonHelper } from "../helper";
import { ColumnInfo } from "../model/columnInfo";

export class EntityCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new EntityCache();
    private static entityClassCache: { [entity: string]: { new(): any } } = {};
    private readonly columnCache: { [entity: string]: { [property: string]: ColumnInfo } } = {};
    private constructor() {
        // hide constructor
    }

    public cacheColumnInfo(columnInfo: ColumnInfo): void {
        let propColMap = this.columnCache[columnInfo.entity];
        if (CommonHelper.isNullOrUndefined(propColMap)) {
            propColMap = {};
            propColMap[columnInfo.property] = columnInfo;
            this.columnCache[columnInfo.entity] = propColMap;
        } else {
            propColMap[columnInfo.property] = columnInfo;
        }
    }

    public getColumnInfo(entity: string, property: string): ColumnInfo {
        const propColMap = this.columnCache[entity];
        if (CommonHelper.isNullOrUndefined(propColMap)) {
            return null;
        }

        const columnInfo = propColMap[property];
        if (CommonHelper.isNullOrUndefined(columnInfo)) {
            return null;
        }

        return columnInfo;
    }

    public getColumnInfos(entity: string): ColumnInfo[] {
        const propColMap = this.columnCache[entity];
        if (CommonHelper.isNullOrUndefined(propColMap)) {
            return [];
        }
        return lodash.values(propColMap);
    }

    public getProperties(entity: string): string[] {
        const columnInfos = this.getColumnInfos(entity);
        if (CommonHelper.isNullOrUndefined(columnInfos)
            || columnInfos.length === 0) {
            return [];
        }
        return lodash.map(columnInfos, (c) => c.property);
    }
}
