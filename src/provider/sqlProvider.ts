import * as lodash from "lodash";
import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper, FilterHelper } from "../helper";
import {
    ColumnInfo,
    CustomFilterDescriptor,
    DynamicQuery,
    FilterDescriptor,
    FilterDescriptorBase,
    FilterGroupDescriptor,
    SortDescriptor,
    SortDescriptorBase,
    SortDirection,
    SqlParam,
} from "../model";

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

    public static getSelectByKey<T>(o: T): SqlParam {
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
        const columnAsStr = SqlProvider.getColumnsAsUnderscoreProps(columnInfos);
        const whereStr = keyColumn.columnName + " = ?";
        const sqlExpression = `SELECT ${columnAsStr} FROM ${tableName}  WHERE ${whereStr}`;
        const params: any[] = [];
        params.push(o[keyColumn.property]);

        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    // public static getSelectByDynamicQuery<T>(query: DynamicQuery<T>): SqlParam {

    // }

    private static toFilterExpression<T>(
        entityClass: { new(): T }, filters: FilterDescriptorBase[]): SqlParam {
        if (CommonHelper.isNullOrUndefined(filters) || filters.length === 0) {
            return new SqlParam();
        }

        let expression: string;
        let params: any[] = [];
        filters.forEach((filter) => {
            const sqlParam = SqlProvider.toFilterExpressionByFilterDescriptorBase(entityClass, filter);
            if (sqlParam != null && CommonHelper.isNotBlank(sqlParam.sqlExpression)) {
                params = params.concat(sqlParam.params);

                expression = CommonHelper.isBlank(expression)
                    ? sqlParam.sqlExpression
                    : `${expression} ${filter.condition} ${sqlParam.sqlExpression}`;
            }
        });

        const result = new SqlParam();
        result.sqlExpression = expression;
        result.params = result.params.concat(params);
    }

    private static toFilterExpressionByFilterDescriptorBase<T>(
        entityClass: { new(): T }, filter: FilterDescriptorBase): SqlParam {
        if (filter instanceof FilterDescriptor) {
            return SqlProvider.toFilterExpressionByFilterDescriptor(entityClass, filter);
        } else if (filter instanceof FilterGroupDescriptor) {
            return SqlProvider.toFilterExpression(entityClass, filter.filters);
        } else if (filter instanceof CustomFilterDescriptor) {
            return SqlProvider.toFilterExpressionByCustomFilterDescriptor(entityClass, filter);
        } else {
            return new SqlParam();
        }
    }

    private static toFilterExpressionByFilterDescriptor<T>(
        entityClass: { new(): T }, filter: FilterDescriptor<T>): SqlParam {
        const value = filter.value;
        const operator = filter.operator;
        const propertyPath = filter.propertyPath;
        const entity = EntityHelper.getEntityName(entityClass);
        const columnInfo = EntityCache.getInstance().getColumnInfo(entity, propertyPath);
        return FilterHelper.getFilterExpression(operator, columnInfo, value);
    }

    private static toFilterExpressionByCustomFilterDescriptor<T>(
        entityClass: { new(): T }, filter: CustomFilterDescriptor): SqlParam {
        const sqlParam = new SqlParam();
        let expression = CommonHelper.isBlank(filter.expression) ? "" : filter.expression;
        for (let i = 0; i < filter.params.length; i++) {
            expression = expression.replace(`{${i}}`, "?");
        }
        sqlParam.params = sqlParam.params.concat(filter.params);
        return sqlParam;
    }

    private static getColumnsAsUnderscoreProps(columnInfos: ColumnInfo[]): string {
        return lodash.map(columnInfos, (s) => s.columnName + " AS " + s.underscoreProperty).join(", ");
    }

    private constructor() {
        // hide constructor
    }
}
