import * as lodash from "lodash";
import { CommonHelper } from "../helper";
import { DatabaseType, Entity, RowBounds } from "../model";
import { MappingProvider } from "../provider";
import { IConnection } from "./iConnection";

// https://github.com/mapbox/node-sqlite3/issues/304
// create new db if start a transaction.
export class SqliteConnection implements IConnection {
    private readonly db: any;
    private readonly enableLog: boolean;
    constructor(filepath: string, enableLog: boolean = false) {
        this.enableLog = enableLog;
        const sqlite = this.getDriver();
        this.db = new sqlite.Database(filepath);
    }

    public getDataBaseType(): DatabaseType {
        return DatabaseType.SQLITE3;
    }

    public getRowBoundsExpression(rowBounds: RowBounds): string {
        const offset = rowBounds.offset;
        const limit = rowBounds.limit;
        return `limit ${offset}, ${limit}`;
    }

    public run(sql: string, params: any[]): Promise<any> {
        this.log(`run:\r\nsql: ${sql}\r\nparams: ${params}`);
        return new Promise<any>((resolve, reject) => {
            this.db.run(sql, params, (err, row) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(row);
                } else {
                    reject(err);
                }
            });
        });
    }
    public select(sql: string, params: any[]): Promise<any[]> {
        this.log(`select:\r\nsql: ${sql}\r\nparams: ${params}`);
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(sql, params, (err, result) => {
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
            this.db.all(sql, params, (err, result) => {
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
            this.db.all(sql, params, (err, result) => {
                try {
                    if (CommonHelper.isNullOrUndefined(err)) {
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

    public async beginTransaction(): Promise<void> {
        try {
            this.log(`beginTransaction...`);
            await this.serialize();
            await this.exec("BEGIN TRANSACTION");
            return new Promise<void>((resolve, reject) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public rollback(): Promise<void> {
        this.log(`rollback...`);
        return this.exec("ROLLBACK");
    }

    public commit(): Promise<void> {
        this.log(`commit...`);
        return this.exec("COMMIT");
    }

    public release(): Promise<void> {
        this.log(`release...`);
        return new Promise<void>((resolve, reject) => {
            this.db.close((err) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    public async rollbackAndRelease(): Promise<void> {
        try {
            await this.rollback();
            await this.release();
            return new Promise<void>((resolve, reject) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public async commitAndRelease(): Promise<void> {
        try {
            await this.commit();
            await this.release();
            return new Promise<void>((resolve, reject) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    private serialize(): Promise<void> {
        this.log(`serialize...`);
        return new Promise<void>((resolve, reject) => {
            this.db.serialize(() => resolve());
        });
    }

    private exec(sql: string): Promise<void> {
        this.log(`exec:\r\nsql: ${sql}`);
        return new Promise<void>((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    private getDriver(): any {
        // tslint:disable-next-line:no-implicit-dependencies
        return require("sqlite3");
    }

    private log(log: string): void {
        if (!CommonHelper.isNullOrUndefined(this.enableLog)
            && this.enableLog) {
            console.log(`[TSBATIS] ${log}`);
        }
    }
}
