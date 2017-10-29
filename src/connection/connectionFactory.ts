import { IConnectionConfig, MysqlConnectionConfig, SqliteConnectionConfig } from "../model";
import { IConnection } from "./iConnection";
import { IConnectionPool } from "./iConnectionPool";
import { MysqlConnectionPool } from "./mysqlConnectionPool";

export class ConnectionFactory {
    private readonly pool: IConnectionPool;
    private readonly enableLog: boolean;
    constructor(config: IConnectionConfig, enableLog: boolean = false) {
        if (config instanceof MysqlConnectionConfig) {
            this.pool = new MysqlConnectionPool(config, enableLog);
        } else {
            throw new Error(`don't support ${config.getDatabaseType()}`);
        }
    }

    public getConnection(): Promise<IConnection> {
        return this.pool.getConnection();
    }
}
