import * as lodash from "lodash";
import { ISqlConnection } from "../connection";
import { CommonHelper, EntityHelper } from "../helper";
import { DynamicQuery, Entity } from "../model";
import { SqlTemplateProvider } from "../provider";

export abstract class BaseMapper<T extends Entity> {
    protected readonly sqlConnection: ISqlConnection;
    constructor(sqlQuery: ISqlConnection) {
        this.sqlConnection = sqlQuery;
    }

    public abstract getEntityClass(): { new(): T };

    protected runInternal(sql: string, params: any[]): Promise<any> {
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

    protected selectEntitiesInternal(entityClass: { new(): T }, sql: string, params: any[]): Promise<T[]> {
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

    protected selectInternal(sql: string, params: any[]): Promise<any[]> {
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

    protected selectCountInternal(sql: string, params: any[]): Promise<number> {
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
}
