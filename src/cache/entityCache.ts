import { ObjectUtils } from "ts-commons";
import { ColumnInfo } from "../model/columnInfo";

export class EntityCache {
  public static getInstance() {
    return this.instance;
  }

  private static instance = new EntityCache();
  private readonly columnCache: Map<any, { [property: string]: ColumnInfo }> = new Map<
    any,
    { [property: string]: ColumnInfo }
  >();
  private constructor() {
    // hide constructor
  }

  public cacheColumnInfo(columnInfo: ColumnInfo): void {
    let propColMap = this.columnCache.get(columnInfo.targetConstructor);
    if (ObjectUtils.isNullOrUndefined(propColMap)) {
      propColMap = {};
      propColMap[columnInfo.property] = columnInfo;
      this.columnCache.set(columnInfo.targetConstructor, propColMap);
    } else {
      propColMap[columnInfo.property] = columnInfo;
    }
  }

  // tslint:disable-next-line:ban-types
  public getColumnInfo(targetConstructor: Function, property: string): ColumnInfo {
    const propColMap = this.columnCache.get(targetConstructor);
    if (ObjectUtils.isNullOrUndefined(propColMap)) {
      return null;
    }

    const columnInfo = propColMap[property];
    if (ObjectUtils.isNullOrUndefined(columnInfo)) {
      return null;
    }

    return columnInfo;
  }

  // tslint:disable-next-line:ban-types
  public getColumnInfos(targetConstructor: Function): ColumnInfo[] {
    const propColMap = this.columnCache.get(targetConstructor);
    if (ObjectUtils.isNullOrUndefined(propColMap)) {
      return [];
    }
    return ObjectUtils.values(propColMap);
  }

  // tslint:disable-next-line:ban-types
  public getProperties(targetConstructor: Function): string[] {
    const columnInfos = this.getColumnInfos(targetConstructor);
    if (ObjectUtils.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
      return [];
    }
    return columnInfos.map(c => c.property);
  }
}
