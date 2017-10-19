import * as lodash from "lodash";
import { EntityCache } from "../cache";
import { EntityHelper } from "../helper";

export class MappingProvider {
    public static toEntities<T>(entity: T | { new(): T }, dbObjs: any[]): T[] {
        const cache = EntityCache.getInstance();
        const entityName = EntityHelper.getEntityName(entity);
        const columnInfos = cache.getColumnInfos(entityName);

        return lodash.map(dbObjs, (dbObj) => {
            const entityObj: T = typeof entity === "function" ? new entity() : entity.constructor();
            columnInfos.forEach((colInfo) => {
                if (dbObj.hasOwnProperty(colInfo.underscoreProperty)) {
                    const dbValue = dbObj[colInfo.underscoreProperty];
                    const propertyType = colInfo.propertyType;
                    const propertyValue = MappingProvider.toPropertyValue(dbValue, propertyType);
                    entityObj[colInfo.property] = propertyValue;
                }
            });
            return entityObj;
        });
    }

    private static toPropertyValue(dbValue: any, propertyType: string): any {
        const usePropType = propertyType.toLocaleLowerCase();
        switch (usePropType) {
            case "number":
                return Number(dbValue);
            case "string":
                return String(dbValue);
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
