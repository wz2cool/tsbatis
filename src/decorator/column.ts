import "reflect-metadata";
import { ObjectUtils, StringUtils } from "ts-commons";
import { EntityCache } from "../cache/entityCache";
import { ColumnInfo } from "../model/columnInfo";
import { ColumnOption } from "../model/columnOption";

export function column(option?: ColumnOption) {
  const cache = EntityCache.getInstance();
  return (target: any, propertyKey: string) => {
    if (
      ObjectUtils.isNullOrUndefined(target) ||
      ObjectUtils.isNullOrUndefined(target.constructor) ||
      ObjectUtils.isNullOrUndefined(target.constructor.name)
    ) {
      throw new Error("cannot find entity from target.constructor.name");
    }

    let table: string = "";
    let columnName: string = "";
    let isKey: boolean = false;
    let autoIncrease: boolean = false;

    const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
    const columnInfo = new ColumnInfo();

    if (option) {
      table = ObjectUtils.isNullOrUndefined(option.table) ? "" : option.table;
      columnName = ObjectUtils.isNullOrUndefined(option.columnName) ? propertyKey : option.columnName;
      isKey = ObjectUtils.isNullOrUndefined(option.isPK) ? false : option.isPK;
      autoIncrease = ObjectUtils.isNullOrUndefined(option.autoIncrease) ? false : option.autoIncrease;
    } else {
      columnName = propertyKey;
    }

    columnInfo.isPK = isKey;
    columnInfo.autoIncrease = autoIncrease;
    columnInfo.columnName = columnName;
    columnInfo.table = table;
    columnInfo.property = propertyKey;
    columnInfo.propertyType = propertyType.name;
    columnInfo.underscoreProperty = StringUtils.snakeCase(propertyKey);
    columnInfo.targetConstructor = target.constructor;
    cache.cacheColumnInfo(columnInfo);
  };
}
