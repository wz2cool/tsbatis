import { injectable } from "inversify";
import * as lodash from "lodash";
import * as mysql from "mysql";
import "reflect-metadata";
import { CommonHelper } from "../helper";
import { DatabaseType, Entity, RowBounds, SqlTemplate } from "../model";
import { MappingProvider } from "../provider";
import { ITransactionConnection } from "./iTransactionConnection";

export class MysqlConnection implements ITransactionConnection {
    private readonly connection: mysql.IConnection;
    private readonly enableLog: boolean;
    constructor(connection: mysql.IConnection, enableLog: boolean = false) {
        this.connection = connection;
        this.enableLog = enableLog;
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
        this.log(`run:\r\nsql: ${sql}\r\nparams: ${params}`);
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
        this.log(`select:\r\nsql: ${sql}\r\nparams: ${params}`);
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
        this.log(`selectCount:\r\nsql: ${sql}\r\nparams: ${params}`);
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
        this.log(`selectEntities:\r\nsql: ${sql}\r\nparams: ${params}`);
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

    public beginTransaction(): Promise<ITransactionConnection> {
        this.log("beginTransaction...");
        return new Promise<ITransactionConnection>((resolve, reject) => {
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
        this.log("rollback...");
        return new Promise<void>((resolve, reject) => {
            this.connection.rollback(() => {
                resolve();
            });
        });
    }

    public commit(): Promise<void> {
        this.log("commit...");
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

    private log(log: string): void {
        if (this.enableLog) {
            console.log(`[TSBATIS] ${log}`);
        }
    }
}
