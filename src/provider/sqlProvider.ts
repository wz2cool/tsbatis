import * as lodash from "lodash";
import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper, FilterHelper } from "../helper";
import {
    ColumnInfo,
    CustomFilterDescriptor,
    CustomSortDescriptor,
    DynamicQuery,
    FilterDescriptor,
    FilterDescriptorBase,
    FilterGroupDescriptor,
    ITableEntity,
    SortDescriptor,
    SortDescriptorBase,
    SortDirection,
    SqlParam,
} from "../model";

export class SqlProvider {
    public static getInsert<T extends ITableEntity>(o: T, selective: boolean): SqlParam {
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

        const tableName = o.getTableName();
        const columnNamesStr = columnNames.join(",");
        const placeholderStr = placeholders.join(",");
        const sqlExpression = `INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${placeholderStr})`;

        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    public static getUpdateByKey<T extends ITableEntity>(o: T, selective: boolean): SqlParam {
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

        const tableName = o.getTableName();
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

    public static getSelectByKey<T extends ITableEntity>(o: T): SqlParam {
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

        const tableName = o.getTableName();
        const columnAsStr = SqlProvider.getColumnsAsUnderscoreProps(columnInfos);
        const whereStr = keyColumn.columnName + " = ?";
        const sqlExpression = `SELECT ${columnAsStr} FROM ${tableName} WHERE ${whereStr}`;
        const params: any[] = [];
        params.push(o[keyColumn.property]);

        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    // only for table entity
    public static getSelectByDynamicQuery<T extends ITableEntity>(
        entityClass: { new(): T }, query: DynamicQuery<T>): SqlParam {
        const entityName = EntityHelper.getEntityName(entityClass);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const columnInfos = EntityCache.getInstance().getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const table = (new entityClass()).getTableName();
        const filters = query.filters;
        const sorts = query.sorts;
        const filterSqlParam = SqlProvider.getFilterExpression<T>(entityClass, filters);
        const sortSqlParam = SqlProvider.getSortExpression<T>(entityClass, sorts);
        const columnStr = SqlProvider.getColumnsAsUnderscoreProps(columnInfos);
        let expression = `SELECT ${columnStr} FROM ${table}`;
        expression = CommonHelper.isBlank(filterSqlParam.sqlExpression)
            ? expression : `${expression} ${filterSqlParam.sqlExpression}`;
        expression = CommonHelper.isBlank(sortSqlParam.sqlExpression)
            ? expression : `${expression} ${sortSqlParam.sqlExpression}`;
        let params: any = [];
        params = params.concat(filterSqlParam.params);
        params = params.concat(sortSqlParam.params);

        const result = new SqlParam();
        result.sqlExpression = expression;
        result.params = params;
        return result;
    }

    public static getFilterExpression<T>(
        entityClass: { new(): T }, filters: FilterDescriptorBase[]): SqlParam {
        if (CommonHelper.isNullOrUndefined(filters) || filters.length === 0) {
            return new SqlParam();
        }

        let expression: string;
        let params: any[] = [];
        filters.forEach((filter) => {
            const sqlParam = SqlProvider.getFilterExpressionByFilterBase(entityClass, filter);
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
        return result;
    }

    public static getSortExpression<T>(entityClass: { new(): T }, sorts: SortDescriptorBase[]): SqlParam {
        if (CommonHelper.isNullOrUndefined(sorts) || sorts.length === 0) {
            return new SqlParam();
        }

        let expression: string;
        let params: any[] = [];
        sorts.forEach((sort) => {
            const sqlParam = SqlProvider.getSortExpressionBySortBase(entityClass, sort);
            if (sqlParam != null && CommonHelper.isNotBlank(sqlParam.sqlExpression)) {
                params = params.concat(sqlParam.params);

                expression = CommonHelper.isBlank(expression)
                    ? sqlParam.sqlExpression
                    : `${expression} ${sqlParam.sqlExpression}`;
            }
        });

        const result = new SqlParam();
        result.sqlExpression = expression;
        result.params = result.params.concat(params);
        return result;
    }

    public static getColumnsExpression<T>(entityClass: { new(): T }): string {
        const entityName = EntityHelper.getEntityName(entityClass);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const columnInfos = EntityCache.getInstance().getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        return SqlProvider.getColumnsAsUnderscoreProps(columnInfos);
    }

    //#region filter
    private static getFilterExpressionByFilterBase<T>(
        entityClass: { new(): T }, filter: FilterDescriptorBase): SqlParam {
        if (filter instanceof FilterDescriptor) {
            return SqlProvider.getFilterExpressionByFilterDescriptor(entityClass, filter);
        } else if (filter instanceof FilterGroupDescriptor) {
            return SqlProvider.getFilterExpression(entityClass, filter.filters);
        } else if (filter instanceof CustomFilterDescriptor) {
            return SqlProvider.getFilterExpressionByCustomFilterDescriptor(entityClass, filter);
        } else {
            return new SqlParam();
        }
    }

    private static getFilterExpressionByFilterDescriptor<T>(
        entityClass: { new(): T }, filter: FilterDescriptor<T>): SqlParam {
        const value = filter.value;
        const operator = filter.operator;
        const propertyPath = filter.propertyPath;
        const entity = EntityHelper.getEntityName(entityClass);
        const columnInfo = EntityCache.getInstance().getColumnInfo(entity, propertyPath);
        return FilterHelper.getFilterExpression(operator, columnInfo, value);
    }

    private static getFilterExpressionByCustomFilterDescriptor<T>(
        entityClass: { new(): T }, filter: CustomFilterDescriptor): SqlParam {
        const sqlParam = new SqlParam();
        let expression = CommonHelper.isBlank(filter.expression) ? "" : filter.expression;
        for (let i = 0; i < filter.params.length; i++) {
            expression = expression.replace(`{${i}}`, "?");
        }
        sqlParam.params = sqlParam.params.concat(filter.params);
        return sqlParam;
    }

    //#endregion

    //#region sort
    private static getSortExpressionBySortBase<T>(
        entityClass: { new(): T }, sort: SortDescriptorBase): SqlParam {
        if (sort instanceof SortDescriptor) {
            return SqlProvider.getSortExpressionBySortDescriptor(entityClass, sort);
        } else if (sort instanceof CustomSortDescriptor) {
            return SqlProvider.getSortExpressionByCustomSortDescriptor(entityClass, sort);
        } else {
            return new SqlParam();
        }
    }

    private static getSortExpressionBySortDescriptor<T>(
        entityClass: { new(): T }, sort: SortDescriptor<T>): SqlParam {
        const entity = EntityHelper.getEntityName(entityClass);
        const columnInfo = EntityCache.getInstance().getColumnInfo(entity, sort.propertyPath);
        const directionStr = SortDirection[sort.direction];
        const queryColumn = columnInfo.getQueryColumn();
        const expression = `${queryColumn} ${directionStr}`;
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = expression;
        return sqlParam;
    }

    private static getSortExpressionByCustomSortDescriptor<T>(
        entityClass: { new(): T }, sort: CustomSortDescriptor): SqlParam {
        const sqlParam = new SqlParam();
        let expression = CommonHelper.isBlank(sort.expression) ? "" : sort.expression;
        for (let i = 0; i < sort.params.length; i++) {
            expression = expression.replace(`{${i}}`, "?");
        }
        sqlParam.params = sqlParam.params.concat(sort.params);
        return sqlParam;
    }

    //#endregion

    private static getColumnsAsUnderscoreProps(columnInfos: ColumnInfo[]): string {
        return lodash.map(columnInfos, (s) => s.columnName + " AS " + s.underscoreProperty).join(", ");
    }

    private constructor() {
        // hide constructor
    }
}
