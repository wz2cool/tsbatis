import * as _ from "lodash";
import { DatabaseType, Entity, RowBounds, SqlTemplate } from "../model";
import { MappingProvider } from "../provider";
import { IConnection } from "./iConnection";
import { ObjectUtils } from "ts-commons";

export class MysqlConnection implements IConnection {
    private readonly connection: any;
    private readonly enableLog: boolean;
    constructor(connection: any, enableLog: boolean = false) {
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
                if (ObjectUtils.isNullOrUndefined(err)) {
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
                if (ObjectUtils.isNullOrUndefined(err)) {
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
            console.log("select count start");
            this.connection.query(sql, params, (err, result) => {
                try {
                    if (ObjectUtils.isNullOrUndefined(err)) {
                        const count = _.values(result[0])[0] as number;
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
                    if (ObjectUtils.isNullOrUndefined(err)) {
                        const entities = MappingProvider.toEntities<T>(entityClass, result, true);
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

    public beginTransaction(): Promise<void> {
        this.log("beginTransaction...");
        return new Promise<void>((resolve, reject) => {
            this.connection.beginTransaction((err) => {
                if (ObjectUtils.isNullOrUndefined(err)) {
                    resolve();
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
                if (ObjectUtils.isNullOrUndefined(err)) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    public release(): Promise<void> {
        this.log("release...");
        return new Promise<void>((resolve, reject) => {
            try {
                this.connection.release();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    private log(log: string): void {
        if (!ObjectUtils.isNullOrUndefined(this.enableLog)
            && this.enableLog) {
            console.log(`[TSBATIS] ${log}`);
        }
    }
}
