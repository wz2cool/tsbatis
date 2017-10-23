import { injectable } from "inversify";
import * as lodash from "lodash";
import "reflect-metadata";
import { ISqlConnection } from "../connection";
import { CommonHelper, EntityHelper } from "../helper";
import {
    DatabaseType,
    Entity,
    FilterDescriptorBase,
    KeyValue,
    Page,
    PageRowBounds,
    RowBounds,
    SortDescriptorBase,
    SqlTemplate,
} from "../model";
import { SqlTemplateProvider } from "../provider";

@injectable()
export abstract class BaseMapper<T extends Entity> {
    protected readonly sqlConnection: ISqlConnection;
    constructor(sqlQuery: ISqlConnection) {
        this.sqlConnection = sqlQuery;
    }

    public abstract getEntityClass(): { new(): T };

    public getColumnExpression(): string {
        return SqlTemplateProvider.getColumnsExpression(this.getEntityClass());
    }

    public getFilterExpression(filters: FilterDescriptorBase[]): SqlTemplate {
        return SqlTemplateProvider.getFilterExpression(this.getEntityClass(), filters);
    }

    public getSortExpression(sorts: SortDescriptorBase[]): SqlTemplate {
        return SqlTemplateProvider.getSortExpression(this.getEntityClass(), sorts);
    }

    public run(plainSql: string, params: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.sqlConnection.run(plainSql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectEntities(plainSql: string, params: any[]): Promise<T[]> {
        const entityClass = this.getEntityClass();
        return new Promise<T[]>((resolve, reject) => {
            this.sqlConnection.selectEntities<T>(entityClass, plainSql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectEntitiesRowBounds(plainSql: string, params: any[], rowBounds: RowBounds): Promise<T[]> {
        const paging = this.getPaging(rowBounds);
        const selectPagingSql = `${plainSql} ${paging}`;
        return this.selectEntities(selectPagingSql, params);
    }

    public async selectEntitiesPageRowBounds(
        plainSql: string, params: any[], pageRowBounds: PageRowBounds): Promise<Page<T>> {
        try {
            const entityClass = this.getEntityClass();
            const entities = await this.selectEntitiesRowBounds(plainSql, params, pageRowBounds);
            const selectCountSql = `SELECT COUNT(0) FROM (${plainSql}) AS t`;
            const total = await this.selectCount(selectCountSql, params);
            const page = new Page<T>(pageRowBounds.getPageNum(), pageRowBounds.getPageSize(), total, entities);
            return new Promise<Page<T>>((resolve, reject) => resolve(page));
        } catch (e) {
            return new Promise<Page<T>>((resolve, reject) => reject(e));
        }
    }

    public select(plainSql: string, params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.sqlConnection.select(plainSql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectCount(plainSql: string, params: any[]): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.sqlConnection.selectCount(plainSql, params, (err, result) => {
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
                const databaseTypeStr = DatabaseType[databaseType as number];
                const err = `don't support databaseType: ${databaseTypeStr}`;
                throw new Error(err);
        }
    }
}
