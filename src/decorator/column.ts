import * as util from "util";
import { EntityCache } from "../cache/entityCache";
import { ColumnInfo } from "../model/columnInfo";

export function column(name: string, table: string) {
    const cache = EntityCache.getInstance();

    return (target: any, propertyKey: string) => {
        if (util.isNullOrUndefined(target)
            || util.isNullOrUndefined(target.constructor)
            || util.isNullOrUndefined(target.constructor.name)) {
            throw new Error("cannot find entity from target.constructor.name");
        }
        const entity = target.constructor.name;
        const columnInfo = new ColumnInfo();
        columnInfo.entity = entity;
        columnInfo.columnName = name;
        columnInfo.table = table;
        columnInfo.property = propertyKey;
        cache.addColumnInfo(columnInfo);
    };
}
