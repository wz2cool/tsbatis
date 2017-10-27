import * as lodash from "lodash";
import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper } from "../helper";
import { Entity } from "../model";

export class MappingProvider {
    public static toEntities<T extends Entity>(
        entity: T | { new(): T }, dbObjs: any[], underscoreToCamelCase = true): T[] {
        const cache = EntityCache.getInstance();
        const entityName = EntityHelper.getEntityName(entity);
        const columnInfos = cache.getColumnInfos(entityName);
        return lodash.map(dbObjs, (dbObj) => {
            const entityObj = EntityHelper.createObject<T>(entity);
            columnInfos.forEach((colInfo) => {
                const dbValue = underscoreToCamelCase ? dbObj[colInfo.underscoreProperty] : dbObj[colInfo.property];
                const propertyType = colInfo.propertyType;
                const propertyValue = MappingProvider.toPropertyValue(dbValue, propertyType);
                entityObj[colInfo.property] = propertyValue;
            });
            return entityObj;
        });
    }

    private static toPropertyValue(dbValue: any, propertyType: string): any {
        const usePropType = propertyType.toLowerCase();
        if (CommonHelper.isNullOrUndefined(dbValue)) {
            return null;
        }

        switch (usePropType) {
            case "number":
                return Number(dbValue);
            case "string":
                return String(dbValue);
            case "boolean":
                const numValue = Number(dbValue);
                if (isNaN(numValue)) {
                    return (dbValue + "").toLowerCase() === "true";
                } else {
                    return Boolean(numValue);
                }
            case "date":
                const value = new Date(dbValue);
                if ("Invalid Date" === value.toString()) {
                    throw new TypeError(`"${dbValue}" cannot be coverted to Date`);
                } else {
                    return value;
                }
            default:
                return dbValue;
        }
    }

    private constructor() {
        // hide constructor.
    }
}
