import * as lodash from "lodash";
import { ISqlConnection } from "../connection";
import { CommonHelper, EntityHelper } from "../helper";
import { DatabaseType, DynamicQuery, Entity, Page, PageRowBounds, RowBounds } from "../model";
import { SqlTemplateProvider } from "../provider";

export abstract class BaseMapper<T extends Entity> {
    protected readonly sqlConnection: ISqlConnection;
    constructor(sqlQuery: ISqlConnection) {
        this.sqlConnection = sqlQuery;
    }

    public abstract getEntityClass(): { new(): T };

    public run(sql: string, params: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.sqlConnection.run(sql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectEntities(sql: string, params: any[]): Promise<T[]> {
        const entityClass = this.getEntityClass();
        return new Promise<T[]>((resolve, reject) => {
            this.sqlConnection.selectEntities<T>(entityClass, sql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectEntitiesRowBounds(sql: string, params: any[], rowBounds: RowBounds): Promise<T[]> {
        const paging = this.getPaging(rowBounds);
        const selectPagingSql = `${sql} ${paging}`;
        return this.selectEntities(selectPagingSql, params);
    }

    public async selectEntitiesPageRowBounds(
        sql: string, params: any[], pageRowBounds: PageRowBounds): Promise<Page<T>> {
        try {
            const entityClass = this.getEntityClass();
            const entities = await this.selectEntitiesRowBounds(sql, params, pageRowBounds);
            const selectCountSql = `SELECT COUNT(0) FROM (${sql}) AS t`;
            const total = await this.selectCount(selectCountSql, params);
            const page = new Page<T>(pageRowBounds.getPageNum(), pageRowBounds.getPageSize(), total, entities);
            return new Promise<Page<T>>((resolve, reject) => resolve(page));
        } catch (e) {
            return new Promise<Page<T>>((resolve, reject) => reject(e));
        }
    }

    public select(sql: string, params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.sqlConnection.select(sql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectCount(sql: string, params: any[]): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.sqlConnection.selectCount(sql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    private getPaging(rowBounds: RowBounds): string {
        const databaseType = this.sqlConnection.getDataBaseType();
        const offset = rowBounds.offset;
        const limit = rowBounds.limit;
        switch (databaseType) {
            case DatabaseType.MYSQL:
            case DatabaseType.SQLITE:
                return `limit ${offset}, ${limit}`;
            default:
                throw new Error(`don't support databaseType: ${DatabaseType[databaseType]}`);
        }
    }
}
