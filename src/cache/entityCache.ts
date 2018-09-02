import * as _ from "lodash";
import { CommonHelper } from "../helper";
import { ColumnInfo } from "../model/columnInfo";

export class EntityCache {
  public static getInstance() {
    return this.instance;
  }

  private static instance = new EntityCache();
  private readonly columnCache: Map<any, { [property: string]: ColumnInfo }> = new Map<any, { [property: string]: ColumnInfo }>();
  private constructor() {
    // hide constructor
  }

  public cacheColumnInfo(columnInfo: ColumnInfo): void {
    let propColMap = this.columnCache.get(columnInfo.targetConstructor);
    if (CommonHelper.isNullOrUndefined(propColMap)) {
      propColMap = {};
      propColMap[columnInfo.property] = columnInfo;
      this.columnCache.set(columnInfo.targetConstructor, propColMap);
    } else {
      propColMap[columnInfo.property] = columnInfo;
    }
  }

  public getColumnInfo(targetConstructor: Function, property: string): ColumnInfo {
    const propColMap = this.columnCache.get(targetConstructor);
    if (CommonHelper.isNullOrUndefined(propColMap)) {
      return null;
    }

    const columnInfo = propColMap[property];
    if (CommonHelper.isNullOrUndefined(columnInfo)) {
      return null;
    }

    return columnInfo;
  }

  public getColumnInfos(targetConstructor: Function): ColumnInfo[] {
    const propColMap = this.columnCache.get(targetConstructor);
    if (CommonHelper.isNullOrUndefined(propColMap)) {
      return [];
    }
    return _.values(propColMap);
  }

  public getProperties(targetConstructor: Function): string[] {
    const columnInfos = this.getColumnInfos(targetConstructor);
    if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
      return [];
    }
    return _.map(columnInfos, c => c.property);
  }
}
