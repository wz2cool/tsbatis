import { StringUtils } from "ts-commons";

export class ColumnInfo {
  public isPK: boolean;
  public autoIncrease: boolean;
  public property: string;
  public underscoreProperty: string;
  public propertyType: string;
  // column name
  public columnName: string;
  public table: string;
  public targetConstructor: Function;

  public getQueryColumn() {
    return StringUtils.isBlank(this.table) ? this.columnName : this.table + "." + this.columnName;
  }
}
