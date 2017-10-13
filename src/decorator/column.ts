import * as lodash from "lodash";
import "reflect-metadata";
import { EntityCache } from "../cache/entityCache";
import { CommonHelper } from "../helper";
import { ColumnInfo } from "../model/columnInfo";

export function column(
    name: string,
    table: string,
    isKey: boolean = false,
    insertable: boolean = true) {
    const cache = EntityCache.getInstance();

    return (target: any, propertyKey: string) => {
        if (CommonHelper.isNullOrUndefined(target)
            || CommonHelper.isNullOrUndefined(target.constructor)
            || CommonHelper.isNullOrUndefined(target.constructor.name)) {
            throw new Error("cannot find entity from target.constructor.name");
        }
        const entity = target.constructor.name;
        const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        const columnInfo = new ColumnInfo();
        columnInfo.isKey = isKey;
        columnInfo.insertable = insertable;
        columnInfo.entity = entity;
        columnInfo.columnName = name;
        columnInfo.table = table;
        columnInfo.property = propertyKey;
        columnInfo.propertyType = propertyType.name;
        columnInfo.underscoreProperty = lodash.snakeCase(propertyKey);
        cache.cacheColumnInfo(columnInfo);
    };
}
