import { injectable } from "inversify";
import * as lodash from "lodash";
import * as mysql from "mysql";
import "reflect-metadata";
import { CommonHelper } from "../helper";
import { DatabaseType, Entity, RowBounds, SqlTemplate } from "../model";
import { MappingProvider } from "../provider";
import { ISqlConnection } from "./iSqlConnection";
import { ITransactionConnection } from "./iTransactionConnection";
import { MysqlConnection } from "./mysqlConnection";

@injectable()
export class MysqlPool implements ISqlConnection {
    private readonly pool: mysql.IPool;
    private readonly enableLog: boolean;
    constructor(pool: mysql.IPool, enableLog = false) {
        this.pool = pool;
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
            this.pool.query(sql, params, (err, result) => {
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
            this.pool.query(sql, params, (err, result) => {
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
            this.pool.query(sql, params, (err, result) => {
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
            this.pool.query(sql, params, (err, result) => {
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
            this.pool.getConnection((err, conn) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(new MysqlConnection(conn));
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
