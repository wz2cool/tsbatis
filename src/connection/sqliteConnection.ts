import { CommonHelper } from "../helper";
import { DatabaseType } from "../model";
import { MappingProvider } from "../provider";
import { ISqlConnection } from "./iSqlConnection";

export class SqliteConnection implements ISqlConnection {
    private readonly db: any;
    constructor(db: any) {
        this.db = db;
    }

    public getDataBaseType(): DatabaseType {
        return DatabaseType.SQLITE;
    }

    public run(sql: string, params: any[], callback: (err: any, result?: any) => void) {
        this.db.run(sql, params, callback);
    }
    public select(sql: string, params: any[], callback: (err: any, result: any[]) => void) {
        this.db.all(sql, params, callback);
    }
    public selectEntities<T>(
        entityClass: { new(): T },
        sql: string,
        params: any[],
        callback: (err: any, result: T[]) => void) {
        this.db.all(sql, params, (err: any, result: any) => {
            if (CommonHelper.isNullOrUndefined(callback)) {
                return;
            }

            if (CommonHelper.isNullOrUndefined(err)) {
                const entities = MappingProvider.toEntities<T>(entityClass, result);
                callback(null, entities);
            } else {
                callback(err, []);
            }
        });
    }
}
