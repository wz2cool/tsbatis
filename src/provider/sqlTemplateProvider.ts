import * as lodash from "lodash";
import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper, FilterHelper } from "../helper";
import {
    ColumnInfo,
    CustomFilterDescriptor,
    CustomSortDescriptor,
    DynamicQuery,
    Entity,
    FilterDescriptor,
    FilterDescriptorBase,
    FilterGroupDescriptor,
    SortDescriptor,
    SortDescriptorBase,
    SortDirection,
    SqlTemplate,
    TableEntity,
} from "../model";

export class SqlTemplateProvider {
    public static getInsert<T extends TableEntity>(o: T, selective: boolean): SqlTemplate {
        const columnInfos = SqlTemplateProvider.getColumnInfos(o);
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
        const placeholderStr = placeholders.join(", ");
        const sqlExpression = `INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${placeholderStr})`;

        const sqlParam = new SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    public static getDeleteByKey<T extends TableEntity>(entityClass: { new(): T }, key: any): SqlTemplate {
        const columnInfos = SqlTemplateProvider.getColumnInfos(entityClass);
        const keyColumn = lodash.find(columnInfos, (s) => s.isKey);
        if (CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }

        const tableName = new entityClass().getTableName();
        const keyColumnName = keyColumn.columnName;
        const expression = `DELETE FROM ${tableName} WHERE ${keyColumnName} = ?`;
        const sqlParam = new SqlTemplate();
        sqlParam.sqlExpression = expression;
        sqlParam.params.push(key);
        return sqlParam;
    }

    public static getDelete<T extends TableEntity>(example: T): SqlTemplate {
        const query = this.generateDynamicQueryByExample<T>(example);
        const entityClass = EntityHelper.getEntityClass<T>(example);
        return this.getDeleteByDynamicQuery<T>(entityClass, query);
    }

    public static getDeleteByDynamicQuery<T extends TableEntity>(
        entityClass: { new(): T }, query: DynamicQuery<T>): SqlTemplate {
        const columnInfos = SqlTemplateProvider.getColumnInfos(new entityClass());
        const table = (new entityClass()).getTableName();
        const deleteSql = `DELETE FROM ${table}`;
        return this.getSqlByDynamicQuery<T>(entityClass, deleteSql, query);
    }

    public static getUpdateByKey<T extends TableEntity>(o: T, selective: boolean): SqlTemplate {
        const columnInfos = SqlTemplateProvider.getColumnInfos(o);
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
            if (selective && CommonHelper.isNullOrUndefined(propValue)) {
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

        const sqlParam = new SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    public static getSelectByKey<T extends TableEntity>(entityClass: { new(): T }, key: any): SqlTemplate {
        const columnInfos = SqlTemplateProvider.getColumnInfos(entityClass);
        const keyColumn = lodash.find(columnInfos, (s) => s.isKey);
        if (CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }

        const tableName = new entityClass().getTableName();
        const columnAsStr = SqlTemplateProvider.getColumnsAsUnderscoreProps(columnInfos);
        const whereStr = keyColumn.columnName + " = ?";
        const sqlExpression = `SELECT ${columnAsStr} FROM ${tableName} WHERE ${whereStr}`;
        const params: any[] = [];
        params.push(key);

        const sqlParam = new SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    public static getSelect<T extends TableEntity>(example: T): SqlTemplate {
        const query = this.generateDynamicQueryByExample<T>(example);
        const entityClass = EntityHelper.getEntityClass<T>(example);
        return this.getSelectByDynamicQuery<T>(entityClass, query);
    }

    public static getSelectCountByKey<T extends TableEntity>(
        entityClass: { new(): T }, key: any): SqlTemplate {
        const columnInfos = SqlTemplateProvider.getColumnInfos(entityClass);
        const keyColumn = lodash.find(columnInfos, (s) => s.isKey);
        if (CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }

        const tableName = new entityClass().getTableName();
        const whereStr = keyColumn.columnName + " = ?";
        const sqlExpression = `SELECT COUNT(0) FROM ${tableName} WHERE ${whereStr}`;
        const params: any[] = [];
        params.push(key);

        const sqlParam = new SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    }

    public static getSelectCount<T extends TableEntity>(example: T): SqlTemplate {
        const query = this.generateDynamicQueryByExample<T>(example);
        const entityClass = EntityHelper.getEntityClass<T>(example);
        return this.getSelectCountByDynamicQuery<T>(entityClass, query);
    }

    public static getSelectByDynamicQuery<T extends TableEntity>(
        entityClass: { new(): T }, query: DynamicQuery<T>): SqlTemplate {
        const selectSql = this.getSelectSql(entityClass);
        return SqlTemplateProvider.getSqlByDynamicQuery<T>(entityClass, selectSql, query);
    }

    public static getSelectCountByDynamicQuery<T extends TableEntity>(
        entityClass: { new(): T }, query: DynamicQuery<T>): SqlTemplate {
        const selectSql = this.getSelectCountSql(entityClass);
        return SqlTemplateProvider.getSqlByDynamicQuery<T>(entityClass, selectSql, query);
    }

    public static getSelectSql<T extends TableEntity>(entityClass: { new(): T }) {
        const columnInfos = SqlTemplateProvider.getColumnInfos(new entityClass());
        const table = (new entityClass()).getTableName();
        const columnStr = SqlTemplateProvider.getColumnsAsUnderscoreProps(columnInfos);
        const selectSql = `SELECT ${columnStr} FROM ${table}`;
        return selectSql;
    }

    public static getSelectCountSql<T extends TableEntity>(entityClass: { new(): T }) {
        const table = (new entityClass()).getTableName();
        const selectSql = `SELECT COUNT(0) FROM ${table}`;
        return selectSql;
    }

    public static getSqlByDynamicQuery<T extends Entity>(
        entityClass: { new(): T }, sql: string, dynamicQuery: DynamicQuery<T>): SqlTemplate {
        if (CommonHelper.isNullOrUndefined(dynamicQuery)) {
            return new SqlTemplate();
        }

        const filterSqlParam = SqlTemplateProvider.getFilterExpression<T>(entityClass, dynamicQuery.filters);
        const sortSqlParam = SqlTemplateProvider.getSortExpression<T>(entityClass, dynamicQuery.sorts);
        let expression = sql;
        expression = CommonHelper.isBlank(filterSqlParam.sqlExpression)
            ? expression : `${expression} WHERE ${filterSqlParam.sqlExpression}`;
        expression = CommonHelper.isBlank(sortSqlParam.sqlExpression)
            ? expression : `${expression} ORDER BY ${sortSqlParam.sqlExpression}`;
        let params: any = [];
        params = params.concat(filterSqlParam.params);
        params = params.concat(sortSqlParam.params);

        const result = new SqlTemplate();
        result.sqlExpression = expression;
        result.params = params;
        return result;
    }

    public static getFilterExpression<T extends Entity>(
        entityClass: { new(): T }, filters: FilterDescriptorBase[]): SqlTemplate {
        if (CommonHelper.isNullOrUndefined(filters) || filters.length === 0) {
            return new SqlTemplate();
        }

        let expression: string;
        let params: any[] = [];
        filters.forEach((filter) => {
            const sqlParam = SqlTemplateProvider.getFilterExpressionByFilterBase(entityClass, filter);
            if (sqlParam != null && CommonHelper.isNotBlank(sqlParam.sqlExpression)) {
                params = params.concat(sqlParam.params);

                expression = CommonHelper.isBlank(expression)
                    ? sqlParam.sqlExpression
                    : `${expression} ${filter.condition} ${sqlParam.sqlExpression}`;
            }
        });

        const result = new SqlTemplate();
        result.sqlExpression = expression;
        result.params = result.params.concat(params);
        return result;
    }

    public static getSortExpression<T extends Entity>(
        entityClass: { new(): T }, sorts: SortDescriptorBase[]): SqlTemplate {
        if (CommonHelper.isNullOrUndefined(sorts) || sorts.length === 0) {
            return new SqlTemplate();
        }

        let expression: string;
        let params: any[] = [];
        sorts.forEach((sort) => {
            const sqlParam = SqlTemplateProvider.getSortExpressionBySortBase(entityClass, sort);
            if (sqlParam != null && CommonHelper.isNotBlank(sqlParam.sqlExpression)) {
                params = params.concat(sqlParam.params);

                expression = CommonHelper.isBlank(expression)
                    ? sqlParam.sqlExpression
                    : `${expression} ${sqlParam.sqlExpression}`;
            }
        });

        const result = new SqlTemplate();
        result.sqlExpression = expression;
        result.params = result.params.concat(params);
        return result;
    }

    public static getColumnsExpression<T extends Entity>(entityClass: { new(): T }): string {
        const entityName = EntityHelper.getEntityName(entityClass);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const columnInfos = EntityCache.getInstance().getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        return SqlTemplateProvider.getColumnsAsUnderscoreProps(columnInfos);
    }

    private static getColumnInfos<T extends Entity>(o: T | { new(): T }): ColumnInfo[] {
        const entityName = EntityHelper.getEntityName(o);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        const columnInfos = EntityCache.getInstance().getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            throw new Error("cannot find entity, please set @column to entity!");
        }

        return columnInfos;
    }

    //#region filter
    private static getFilterExpressionByFilterBase<T extends Entity>(
        entityClass: { new(): T }, filter: FilterDescriptorBase): SqlTemplate {
        if (filter instanceof FilterDescriptor) {
            return SqlTemplateProvider.getFilterExpressionByFilterDescriptor(entityClass, filter);
        } else if (filter instanceof FilterGroupDescriptor) {
            return SqlTemplateProvider.getFilterExpression(entityClass, filter.filters);
        } else if (filter instanceof CustomFilterDescriptor) {
            return SqlTemplateProvider.getFilterExpressionByCustomFilterDescriptor(entityClass, filter);
        } else {
            return new SqlTemplate();
        }
    }

    private static getFilterExpressionByFilterDescriptor<T extends Entity>(
        entityClass: { new(): T }, filter: FilterDescriptor<T>): SqlTemplate {
        const value = filter.value;
        const operator = filter.operator;
        const propertyPath = filter.propertyPath;
        const entity = EntityHelper.getEntityName(entityClass);
        const columnInfo = EntityCache.getInstance().getColumnInfo(entity, propertyPath);
        return FilterHelper.getFilterExpression(operator, columnInfo, value);
    }

    private static getFilterExpressionByCustomFilterDescriptor<T extends Entity>(
        entityClass: { new(): T }, filter: CustomFilterDescriptor): SqlTemplate {
        const sqlParam = new SqlTemplate();
        let expression = CommonHelper.isBlank(filter.expression) ? "" : filter.expression;
        for (let i = 0; i < filter.params.length; i++) {
            expression = expression.replace(`{${i}}`, "?");
        }
        sqlParam.params = sqlParam.params.concat(filter.params);
        return sqlParam;
    }

    //#endregion

    //#region sort
    private static getSortExpressionBySortBase<T extends Entity>(
        entityClass: { new(): T }, sort: SortDescriptorBase): SqlTemplate {
        if (sort instanceof SortDescriptor) {
            return SqlTemplateProvider.getSortExpressionBySortDescriptor(entityClass, sort);
        } else if (sort instanceof CustomSortDescriptor) {
            return SqlTemplateProvider.getSortExpressionByCustomSortDescriptor(entityClass, sort);
        } else {
            return new SqlTemplate();
        }
    }

    private static getSortExpressionBySortDescriptor<T extends Entity>(
        entityClass: { new(): T }, sort: SortDescriptor<T>): SqlTemplate {
        const entity = EntityHelper.getEntityName(entityClass);
        const columnInfo = EntityCache.getInstance().getColumnInfo(entity, sort.propertyPath);
        const directionStr = SortDirection[sort.direction];
        const queryColumn = columnInfo.getQueryColumn();
        const expression = `${queryColumn} ${directionStr}`;
        const sqlParam = new SqlTemplate();
        sqlParam.sqlExpression = expression;
        return sqlParam;
    }

    private static getSortExpressionByCustomSortDescriptor<T extends Entity>(
        entityClass: { new(): T }, sort: CustomSortDescriptor): SqlTemplate {
        const sqlParam = new SqlTemplate();
        let expression = CommonHelper.isBlank(sort.expression) ? "" : sort.expression;
        for (let i = 0; i < sort.params.length; i++) {
            expression = expression.replace(`{${i}}`, "?");
        }
        sqlParam.params = sqlParam.params.concat(sort.params);
        return sqlParam;
    }

    //#endregion

    private static getColumnsAsUnderscoreProps(columnInfos: ColumnInfo[]): string {
        return lodash.map(columnInfos, (s) => s.getQueryColumn() + " AS " + s.underscoreProperty).join(", ");
    }

    private static generateDynamicQueryByExample<T>(example: T): DynamicQuery<T> {
        const dynamicQuery = DynamicQuery.createIntance<T>();
        for (const prop in example) {
            if (example.hasOwnProperty(prop)
                && !CommonHelper.isNullOrUndefined(example[prop])) {
                const filter = new FilterDescriptor();
                filter.propertyPath = prop;
                filter.value = example[prop];
                dynamicQuery.addFilters(filter);
            }
        }
        return dynamicQuery;
    }

    private constructor() {
        // hide constructor
    }
}
