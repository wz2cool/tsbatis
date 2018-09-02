import * as _ from "lodash";
import { DtoCache, EntityCache } from "../cache";
import { CommonHelper, DtoObjectHelper, EntityHelper } from "../helper";
import { DtoObject, Entity } from "../model";

export class MappingProvider {
    public static toDtoObject<T extends DtoObject>(
        dtoObjectClass: T | { new(): T }, jsonObj: any): T {
        const cache = DtoCache.getInstance();
        const dtoObjectName = DtoObjectHelper.getDtoObjectName(dtoObjectClass);
        const fieldInfos = cache.getFieldInfos(dtoObjectName);
        const dtoObject = DtoObjectHelper.createObject<T>(dtoObjectClass);
        fieldInfos.forEach((fieldInfo) => {
            const jsonValue = jsonObj[fieldInfo.name];
            const propertyType = fieldInfo.propertyType;
            const propertyValue = MappingProvider.toPropertyValue(jsonValue, propertyType);
            dtoObject[fieldInfo.property] = propertyValue;
        });
        return dtoObject;
    }

    public static toDtoObjects<T extends DtoObject>(
        dtoObjectClass: T | { new(): T }, jsonObjs: any[]): T[] {
        return _.map(jsonObjs, (jsonObj) => {
            return MappingProvider.toDtoObject<T>(dtoObjectClass, jsonObj);
        });
    }

    public static toEntity<T extends Entity>(
        entity: T | { new(): T }, dbObj: any, underscoreToCamelCase = false): T {
        const cache = EntityCache.getInstance();
        const entityName = EntityHelper.getEntityName(entity);
        const columnInfos = cache.getColumnInfos(entityName);
        const entityObj = EntityHelper.createObject<T>(entity);
        columnInfos.forEach((colInfo) => {
            const dbValue = underscoreToCamelCase ? dbObj[colInfo.underscoreProperty] : dbObj[colInfo.property];
            const propertyType = colInfo.propertyType;
            const propertyValue = MappingProvider.toPropertyValue(dbValue, propertyType);
            entityObj[colInfo.property] = propertyValue;
        });
        return entityObj;
    }

    public static toEntities<T extends Entity>(
        entity: T | { new(): T }, dbObjs: any[], underscoreToCamelCase = false): T[] {
        return _.map(dbObjs, (dbObj) => {
            return MappingProvider.toEntity<T>(entity, dbObj, underscoreToCamelCase);
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
