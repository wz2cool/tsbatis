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
        let propColMap = this.cache[columnInfo.entity];
        if (util.isNullOrUndefined(propColMap)) {
            propColMap = {};
            propColMap[columnInfo.property] = columnInfo;
            this.cache[columnInfo.entity] = propColMap;
        } else {
            propColMap[columnInfo.property] = columnInfo;
        }
    }

    public getColumnInfo(entity: string, property: string): ColumnInfo {
        const propColMap = this.cache[entity];
        if (util.isNullOrUndefined(propColMap)) {
            return null;
        }

        return propColMap[property];
    }

    public getColumnInfos(entity: string): ColumnInfo[] {
        const propColMap = this.cache[entity];
        if (util.isNullOrUndefined(propColMap)) {
            return null;
        }
        const result: ColumnInfo[] = [];
        for (const key in propColMap) {
            if (propColMap.hasOwnProperty(key)) {
                result.push(propColMap[key]);
            }
        }
        return result;
    }
}
