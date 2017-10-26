import { injectable } from "inversify";
import * as lodash from "lodash";
import "reflect-metadata";
import { ISqlConnection } from "../connection";
import {
    Entity,
    FilterDescriptorBase,
    KeyValue,
    Page,
    PageRowBounds,
    RelationBase,
    RowBounds,
    SortDescriptorBase,
    SqlTemplate,
} from "../model";
import { SqlTemplateProvider } from "../provider";
import { BaseMapper } from "./baseMapper";

@injectable()
export abstract class BaseMybatisMapper<T extends Entity> extends BaseMapper<T> {
    constructor(sqlConnection: ISqlConnection) {
        super(sqlConnection);
    }

    public mybatisSelect(sql: string, paramMap: { [key: string]: any }): Promise<any> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.select(sqlTemplate.sqlExpression, sqlTemplate.params);
    }

    public mybatisSelectEntities(
        sql: string,
        paramMap: { [key: string]: any },
        relations: Array<RelationBase<T>> = []): Promise<T[]> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectEntities(sqlTemplate.sqlExpression, sqlTemplate.params, relations);
    }

    public mybatisSelectEntitiesRowBounds(
        sql: string,
        paramMap: { [key: string]: any },
        rowBounds: RowBounds,
        relations: Array<RelationBase<T>> = []): Promise<T[]> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectEntitiesRowBounds(sqlTemplate.sqlExpression, sqlTemplate.params, rowBounds, relations);
    }

    public mybatisSelectEntitiesPageRowBounds(
        sql: string,
        paramMap: { [key: string]: any },
        pageRowBounds: PageRowBounds,
        relations: Array<RelationBase<T>> = []): Promise<Page<T>> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectEntitiesPageRowBounds(
            sqlTemplate.sqlExpression, sqlTemplate.params, pageRowBounds, relations);
    }

    public mybatisSelectCount(sql: string, paramMap: { [key: string]: any }): Promise<number> {
        const sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return super.selectCount(sqlTemplate.sqlExpression, sqlTemplate.params);
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
