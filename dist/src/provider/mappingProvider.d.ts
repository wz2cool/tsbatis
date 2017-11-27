import { Entity } from "../model";
export declare class MappingProvider {
    static toEntities<T extends Entity>(entity: T | {
        new (): T;
    }, dbObjs: any[], underscoreToCamelCase?: boolean): T[];
    private static toPropertyValue(dbValue, propertyType);
    private constructor();
}
