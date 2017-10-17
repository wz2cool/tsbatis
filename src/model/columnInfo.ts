import { CommonHelper } from "../helper";

export class ColumnInfo {
    public isKey: boolean;
    public insertable: boolean;
    public property: string;
    public underscoreProperty: string;
    public propertyType: string;
    public entity: string;
    // column name
    public columnName: string;
    public table: string;

    public getQueryColumn() {
        return CommonHelper.isBlank(this.table)
            ? this.columnName : this.table + "." + this.columnName;
    }
}
