import * as lodash from "lodash";
import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper } from "../helper";
import { ColumnInfo, SqlParam } from "../model";

export class SqlProvider {
    public static getInsert<T>(o: T, selective: boolean): SqlParam {
        const entityName = EntityHelper.getEntityName(o);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const columnInfos = EntityCache.getInstance().getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const columnNames: string[] = [];
        const placeholders: string[] = [];
        const params: any[] = [];
        columnInfos.forEach((colInfo) => {
            if (!colInfo.insertable) {
                return;
            }

            let propValue = o[colInfo.property];
            if (selective && CommonHelper.isNullOrUndefined(propValue)) {
                return;
            }
            propValue = CommonHelper.isNullOrUndefined(propValue) ? null : propValue;
            params.push(propValue);
            columnNames.push(colInfo.columnName);
            placeholders.push("?");
        });

        const tableName = columnInfos[0].table;
        const columnNamesStr = columnNames.join(",");
        const placeholderStr = placeholders.join(",");
        const sqlExpression = `INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${placeholderStr})`;

        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    public static getUpdateByKey<T>(o: T, selective: boolean): SqlParam {
        const entityName = EntityHelper.getEntityName(o);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const columnInfos = EntityCache.getInstance().getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const keyColumn = lodash.find(columnInfos, (s) => s.isKey);
        if (CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }

        const tableName = columnInfos[0].table;
        const sets: string[] = [];
        const params: any[] = [];
        columnInfos.forEach((colInfo) => {
            if (colInfo.property === keyColumn.property) {
                // don't update key column.
                return;
            }

            let propValue = o[colInfo.property];
            if (selective && propValue) {
                return;
            }

            propValue = CommonHelper.isNullOrUndefined(propValue) ? null : propValue;
            sets.push(colInfo.columnName + " = ?");
            params.push(propValue);
        });
        const setStr = sets.join(", ");
        const whereStr = keyColumn.columnName + " = ?";
        params.push(o[keyColumn.property]);
        const sqlExpression = `UPDATE ${tableName} SET ${setStr} WHERE ${whereStr}`;

        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    public static getSelectByKey<T>(o: T, columnInfos: ColumnInfo[]): SqlParam {
        const keyColumn = lodash.find(columnInfos, (s) => s.isKey);
        if (CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }
    }

    public static getColumnsAsUnderscoreProps(columnInfos: ColumnInfo[]): string {
        return lodash.map(columnInfos, (s) => s.columnName + " AS " + s.underscoreProperty).join(", ");
    }

    private constructor() {
        // hide constructor
    }
}
