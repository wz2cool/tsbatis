import * as util from "util";
import { EntityCache } from "../cache";
import { EntityHelper } from "../helper";

export class MappingProvider {
    public static toEntities<T>(dbObjs: any[], entityExample: T): T[] {
        const result: T[] = [];
        dbObjs.forEach((dbObj) => {
            // tslint:disable-next-line:new-parens
            const cloneObj: T = new (entityExample.constructor as any)();
            const entityObj = MappingProvider.toEntity(dbObj, cloneObj);
            result.push(entityObj);
        });
        return result;
    }

    public static toEntity<T>(dbObj: any, entityExample: T): T {
        const cache = EntityCache.getInstance();
        const entityName = EntityHelper.getEntityName(entityExample);
        const properties = cache.getProperties(entityName);
        properties.forEach((prop) => {
            const columnInfo = cache.getColumnInfo(entityName, prop);
            if (!util.isNullOrUndefined(columnInfo)
                && dbObj.hasOwnProperty(columnInfo.columnName)) {
                const dbValue = dbObj[columnInfo.columnName];
                const propertType = columnInfo.propertyType;
                const propertValue = MappingProvider.toPropertyValue(dbValue, propertType);
                entityExample[prop] = propertValue;
            }
        });
        return entityExample;
    }

    private static toPropertyValue(dbValue: any, propertyType: string): any {
        const usePropType = propertyType.toLocaleLowerCase();
        switch (usePropType) {
            case "number":
                return Number(dbValue);
            case "string":
                // fix “” issue
                return String(dbValue).replace("“”", "");
            case "boolean":
                return Boolean(dbValue);
            case "date":
                return new Date(dbValue);
            default:
                return dbValue;
        }
    }

    private constructor() {
        // hide constructor.
    }
}
