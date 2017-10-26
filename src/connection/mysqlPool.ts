import { injectable } from "inversify";
import * as lodash from "lodash";
import * as mysql from "mysql";
import "reflect-metadata";
import { CommonHelper } from "../helper";
import { DatabaseType, Entity, RowBounds, SqlTemplate } from "../model";
import { MappingProvider } from "../provider";
import { ISqlConnection } from "./iSqlConnection";
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
    public async beginTransaction(): Promise<ISqlConnection> {
        return new Promise<ISqlConnection>((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(new MysqlConnection(conn));
                } else {
                    reject(err);
                }
            });
        });
    }
    public rollback(): Promise<void> {
        throw new Error("Please use 'MysqlConnection' to rollback.");
    }
    public commit(): Promise<void> {
        throw new Error("Please use 'MysqlConnection' to commit.");
    }
}
