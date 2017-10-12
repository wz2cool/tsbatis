import * as util from "util";
import { EntityCache } from "../cache/entityCache";
import { ColumnInfo } from "../model/columnInfo";

export function column(name: string, table: string) {
    const cache = EntityCache.getInstance();

    return (target: any, propertyKey: string) => {
        const entityConstructor = target.constructor;

        if (util.isNullOrUndefined(entityConstructor)) {
            console.error("cannot find entity from target.constructor");
            return;
        }
        const entity = entityConstructor.name;
        if (util.isNullOrUndefined(entity)) {
            console.error("cannot find entity from entityConstructor.name");
            return;
        }

        const columnInfo = new ColumnInfo();
        columnInfo.columnName = name;
        columnInfo.table = table;
        columnInfo.property = propertyKey;
        cache.add(entity, columnInfo);
    };
}
