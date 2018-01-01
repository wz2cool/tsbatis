import { CommonHelper } from "../helper";
import { MysqlConnectionConfig } from "../model";
import { IConnection } from "./iConnection";
import { IConnectionPool } from "./iConnectionPool";
import { MysqlConnection } from "./mysqlConnection";

export class MysqlConnectionPool implements IConnectionPool {
    private readonly pool: any;
    private readonly enableLog: boolean;
    constructor(config: MysqlConnectionConfig, enableLog: boolean) {
        this.enableLog = enableLog;
        const mysql = this.getDriver();

        this.pool = mysql.createPool({
            host: config.host,
            port: config.port,
            database: config.database,
            user: config.user,
            password: config.password,
        });
    }

    public getConnection(): Promise<IConnection> {
        return new Promise<IConnection>((resolve, reject) => {
            this.pool.getConnection((err, sqlConn) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    const result = new MysqlConnection(sqlConn, this.enableLog);
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    private getDriver(): any {
        // tslint:disable-next-line:no-implicit-dependencies
        return require("mysql");
    }
}
