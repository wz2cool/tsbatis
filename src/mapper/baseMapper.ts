import * as lodash from "lodash";
import { ISqlConnection } from "../connection";
import { Entity, KeyValue, Page, PageRowBounds, RowBounds, SqlTemplate } from "../model";
import { BaseInternalMapper } from "./baseInternalMapper";

export abstract class BaseMapper<T extends Entity> extends BaseInternalMapper<T> {
    constructor(sqlConnection: ISqlConnection) {
        super(sqlConnection);
    }

    public selectEntities(sql: string, paramMap: { [key: string]: any }): Promise<T[]> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectEntitiesInternal(sqlTemplate.sqlExpression, sqlTemplate.params);
    }

    public selectEntitiesRowBounds(sql: string, paramMap: { [key: string]: any }, rowBounds: RowBounds): Promise<T[]> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectEntitiesRowBoundsInternal(sqlTemplate.sqlExpression, sqlTemplate.params, rowBounds);
    }

    public selectEntitiesPageRowBounds(
        sql: string, paramMap: { [key: string]: any }, pageRowBounds: PageRowBounds): Promise<Page<T>> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectEntitiesPageRowBoundsInternal(sqlTemplate.sqlExpression, sqlTemplate.params, pageRowBounds);
    }

    public selectCount(sql: string, paramMap: { [key: string]: any }): Promise<number> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectCountInternal(sqlTemplate.sqlExpression, sqlTemplate.params);
    }

    private getSqlTemplate(sql: string, paramMap: { [key: string]: any }): SqlTemplate {
        let expression = sql;
        const indexParams: Array<KeyValue<number, any>> = [];
        for (const key in paramMap) {
            if (paramMap.hasOwnProperty(key)) {
                const placehoulderKey = "$\{" + key + "\}";
                const paramKey = "#\{" + key + "\}";
                const indexOfParam = sql.indexOf(paramKey);
                if (sql.indexOf(placehoulderKey) >= 0) {
                    expression = expression.replace(placehoulderKey, paramMap[key]);
                } else if (indexOfParam >= 0) {
                    expression = expression.replace(paramKey, "?");
                    const keyValue = new KeyValue(indexOfParam, paramMap[key]);
                    indexParams.push(keyValue);
                }
            }
        }

        const sqlTemplate = new SqlTemplate();
        sqlTemplate.sqlExpression = expression;
        sqlTemplate.params = lodash.sortBy(indexParams, (x) => x.getKey()).map((x) => x.getValue());
        return sqlTemplate;
    }
}
