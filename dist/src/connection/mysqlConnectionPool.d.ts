import { MysqlConnectionConfig } from "../model";
import { IConnection } from "./iConnection";
import { IConnectionPool } from "./iConnectionPool";
export declare class MysqlConnectionPool implements IConnectionPool {
    private readonly pool;
    private readonly enableLog;
    constructor(config: MysqlConnectionConfig, enableLog: boolean);
    getConnection(): Promise<IConnection>;
    private getDriver();
}
