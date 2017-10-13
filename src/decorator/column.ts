import * as lodash from "lodash";
import "reflect-metadata";
import { EntityCache } from "../cache/entityCache";
import { ColumnInfo } from "../model/columnInfo";

export function column(name: string, table: string) {
    const cache = EntityCache.getInstance();

    return (target: any, propertyKey: string) => {
        if (!target
            || !target.constructor
            || !target.constructor.name) {
            throw new Error("cannot find entity from target.constructor.name");
        }
        const entity = target.constructor.name;
        const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        const columnInfo = new ColumnInfo();
        columnInfo.entity = entity;
        columnInfo.columnName = name;
        columnInfo.table = table;
        columnInfo.property = propertyKey;
        columnInfo.propertyType = propertyType.name;
        columnInfo.underscoreProperty = lodash.snakeCase(propertyKey);
        cache.cacheColumnInfo(columnInfo);
        cache.cacheProperty(entity, propertyKey);
    };
}
