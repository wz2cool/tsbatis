import * as _ from "lodash";
import "reflect-metadata";
import { EntityCache } from "../cache/entityCache";
import { CommonHelper } from "../helper";
import { ColumnInfo } from "../model/columnInfo";
import { ColumnOption } from "../model/columnOption";

export function column(option?: ColumnOption) {
  const cache = EntityCache.getInstance();
  return (target: any, propertyKey: string) => {
    if (
      CommonHelper.isNullOrUndefined(target) ||
      CommonHelper.isNullOrUndefined(target.constructor) ||
      CommonHelper.isNullOrUndefined(target.constructor.name)
    ) {
      throw new Error("cannot find entity from target.constructor.name");
    }

    let table: string = "";
    let columnName: string = "";
    let isKey: boolean = false;
    let autoIncrease: boolean = false;

    const entity = target.constructor.name;
    const propertyType = Reflect.getMetadata("design:type", target, propertyKey);
    const columnInfo = new ColumnInfo();

    if (option) {
      table = CommonHelper.isNullOrUndefined(option.table) ? "" : option.table;
      columnName = CommonHelper.isNullOrUndefined(option.columnName) ? propertyKey : option.columnName;
      isKey = CommonHelper.isNullOrUndefined(option.isPK) ? false : option.isPK;
      autoIncrease = CommonHelper.isNullOrUndefined(option.autoIncrease) ? false : option.autoIncrease;
    } else {
      columnName = propertyKey;
    }

    columnInfo.isPK = isKey;
    columnInfo.autoIncrease = autoIncrease;
    columnInfo.entity = entity;
    columnInfo.columnName = columnName;
    columnInfo.table = table;
    columnInfo.property = propertyKey;
    columnInfo.propertyType = propertyType.name;
    columnInfo.underscoreProperty = _.snakeCase(propertyKey);
    cache.cacheColumnInfo(columnInfo);
  };
}
