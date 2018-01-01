import * as lodash from "lodash";
import "reflect-metadata";
import { EntityCache } from "../cache/entityCache";
import { CommonHelper } from "../helper";
import { ColumnInfo } from "../model/columnInfo";

export function column(name: string, isPrimaryKey?: boolean, autoIncrease?: boolean);
export function column(
    name: string,
    table: string);
export function column(name: string, a2?, a3?) {
    const cache = EntityCache.getInstance();
    return (target: any, propertyKey: string) => {
        if (CommonHelper.isNullOrUndefined(target)
            || CommonHelper.isNullOrUndefined(target.constructor)
            || CommonHelper.isNullOrUndefined(target.constructor.name)) {
            throw new Error("cannot find entity from target.constructor.name");
        }

        let table = "";
        let isKey = false;
        let autoIncrease = false;
        if (typeof a2 === "string") {
            table = a2;
        } else if (typeof a2 === "boolean") {
            isKey = a2;
        }

        if (typeof a3 === "boolean") {
            autoIncrease = a3;
        }

        const entity = target.constructor.name;
        const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        const columnInfo = new ColumnInfo();
        columnInfo.isPK = isKey;
        columnInfo.autoIncrease = autoIncrease;
        columnInfo.entity = entity;
        columnInfo.columnName = name;
        columnInfo.table = table;
        columnInfo.property = propertyKey;
        columnInfo.propertyType = propertyType.name;
        columnInfo.underscoreProperty = lodash.snakeCase(propertyKey);
        cache.cacheColumnInfo(columnInfo);
    };
}
