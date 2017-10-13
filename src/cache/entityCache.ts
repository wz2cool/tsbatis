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
        if (propColMap) {
            propColMap[columnInfo.property] = columnInfo;
        } else {
            propColMap = {};
            propColMap[columnInfo.property] = columnInfo;
            this.columnCache[columnInfo.entity] = propColMap;
        }
    }

    public getColumnInfo(entity: string, property: string): ColumnInfo {
        const propColMap = this.columnCache[entity];
        if (!propColMap) {
            return null;
        }

        const columnInfo = propColMap[property];
        if (!columnInfo) {
            return null;
        }

        return columnInfo;
    }

    public getColumnInfos(entity: string): ColumnInfo[] {
        const propColMap = this.columnCache[entity];
        if (!propColMap) {
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
        if (propArray) {
            const index = propArray.indexOf(property);
            if (index < 0) {
                propArray.push(property);
            }
        } else {
            propArray = [];
            propArray.push(property);
            this.propCache[entity] = propArray;
        }
    }

    public getProperties(entity: string): string[] {
        const propArray = this.propCache[entity];
        if (propArray) {
            return propArray;
        } else {
            return [];
        }
    }
}
