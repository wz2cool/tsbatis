import * as sqlite3 from "sqlite3";
import { CommonHelper } from "../helper";
import { DatabaseType, Entity, RowBounds } from "../model";
import { IConnection } from "./iConnection";

export class SqliteConnection implements IConnection {
    private readonly db: sqlite3.Database;
    private readonly enableLog: boolean;
    constructor(filepath: string, enableLog: boolean = false) {
        this.enableLog = enableLog;
        const sqlite = this.getDriver();
        this.db = new sqlite.Database(filepath);
    }

    public getDataBaseType(): DatabaseType {
        return DatabaseType.SQLITE;
    }
    public getRowBoundsExpression(rowBounds: RowBounds): string {
        throw new Error("Method not implemented.");
    }
    public run(sql: string, params: any[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public select(sql: string, params: any[]): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    public selectCount(sql: string, params: any[]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    public selectEntities<T extends Entity>(entityClass: new () => T, sql: string, params: any[]): Promise<T[]> {
        throw new Error("Method not implemented.");
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
