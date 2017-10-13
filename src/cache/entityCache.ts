import { CommonHelper } from "../helper";
import { ColumnInfo } from "../model/columnInfo";

export class EntityCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new EntityCache();
    private readonly columnCache: { [entity: string]: { [property: string]: ColumnInfo } } = {};
    private readonly propCache: { [entity: string]: string[] } = {};
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
        const result: ColumnInfo[] = [];
        for (const key in propColMap) {
            if (propColMap.hasOwnProperty(key)) {
                result.push(propColMap[key]);
            }
        }
        return result;
    }

    public cacheProperty(entity: string, property: string) {
        let propArray = this.propCache[entity];
        if (CommonHelper.isNullOrUndefined(propArray)) {
            propArray = [];
            propArray.push(property);
            this.propCache[entity] = propArray;
        } else {
            const index = propArray.indexOf(property);
            if (index < 0) {
                propArray.push(property);
            }
        }
    }

    public getProperties(entity: string): string[] {
        const propArray = this.propCache[entity];
        if (CommonHelper.isNullOrUndefined(propArray)) {
            return [];
        } else {
            return propArray;
        }
    }
}
