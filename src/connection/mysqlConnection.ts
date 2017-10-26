import { injectable } from "inversify";
import * as lodash from "lodash";
import * as mysql from "mysql";
import "reflect-metadata";
import { CommonHelper } from "../helper";
import { DatabaseType, Entity, RowBounds, SqlTemplate } from "../model";
import { MappingProvider } from "../provider";
import { ISqlConnection } from "./iSqlConnection";

export class MysqlConnection implements ISqlConnection {
    private readonly connection: mysql.IConnection;
    constructor(connection: mysql.IConnection) {
        this.connection = connection;
    }

    public getDataBaseType(): DatabaseType {
        return DatabaseType.MYSQL;
    }

    public getRowBoundsExpression(rowBounds: RowBounds): string {
        const offset = rowBounds.offset;
        const limit = rowBounds.limit;
        return `limit ${offset}, ${limit}`;
    }

    public run(sql: string, params: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.connection.query(sql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public select(sql: string, params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.connection.query(sql, params, (err, result) => {
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
            this.connection.query(sql, params, (err, result) => {
                try {
                    if (CommonHelper.isNullOrUndefined(err)) {
                        const count = lodash.values(result[0])[0] as number;
                        resolve(count);
                    } else {
                        reject(err);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
    public selectEntities<T extends Entity>(
        entityClass: new () => T, sql: string, params: any[]): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            this.connection.query(sql, params, (err, result) => {
                try {
                    if (CommonHelper.isNullOrUndefined(err)) {
                        const entities = MappingProvider.toEntities<T>(entityClass, result);
                        resolve(entities);
                    } else {
                        reject(err);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    public beginTransaction(): Promise<ISqlConnection> {
        return new Promise<ISqlConnection>((resolve, reject) => {
            this.connection.beginTransaction((err) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(this);
                } else {
                    reject(err);
                }
            });
        });
    }

    public rollback(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connection.rollback(() => {
                resolve();
            });
        });
    }

    public commit(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connection.commit((err) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }
}
