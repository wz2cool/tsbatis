import { injectable } from "inversify";
import "reflect-metadata";
import { CommonHelper } from "../helper";
import { DatabaseType } from "../model";
import { MappingProvider } from "../provider";
import { ISqlConnection } from "./iSqlConnection";

@injectable()
export class SqliteConnection implements ISqlConnection {
    private readonly db: any;
    constructor(db: any) {
        this.db = db;
    }

    public getDataBaseType(): DatabaseType {
        return DatabaseType.SQLITE;
    }

    public run(sql: string, params: any[], callback: (err: any, result?: any) => void) {
        console.log("sql: ", sql);
        console.log("params: ", params);
        this.db.run(sql, params, callback);
    }
    public select(sql: string, params: any[], callback: (err: any, result: any[]) => void) {
        console.log("sql: ", sql);
        console.log("params: ", params);
        this.db.all(sql, params, callback);
    }
    public selectEntities<T>(
        entityClass: { new(): T },
        sql: string,
        params: any[],
        callback: (err: any, result: T[]) => void) {
        console.log("sql: ", sql);
        console.log("params: ", params);
        this.db.all(sql, params, (err: any, result: any) => {
            if (CommonHelper.isNullOrUndefined(callback)) {
                return;
            }

            if (CommonHelper.isNullOrUndefined(err)) {
                const entities = MappingProvider.toEntities<T>(entityClass, result);
                console.log(entities);
                callback(null, entities);
            } else {
                callback(err, []);
            }
        });
    }
    public selectCount(sql: string, params: any[], callback: (err: any, result: number) => void) {
        this.db.all(sql, params, (err: any, result: any) => {
            if (CommonHelper.isNullOrUndefined(callback)) {
                return;
            }

            if (CommonHelper.isNullOrUndefined(err)) {
                callback(null, 1);
            } else {
                callback(err, 1);
            }
        });
    }
}
