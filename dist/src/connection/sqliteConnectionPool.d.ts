import { SqliteConnectionConfig } from "../model";
import { IConnection } from "./iConnection";
import { IConnectionPool } from "./iConnectionPool";
export declare class SqliteConnectionPool implements IConnectionPool {
    private readonly config;
    private readonly enableLog;
    constructor(config: SqliteConnectionConfig, enableLog?: boolean);
    getConnection(): Promise<IConnection>;
}
