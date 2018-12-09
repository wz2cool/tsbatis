import { ObjectUtils } from "ts-commons";
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
      database: config.database,
      host: config.host,
      password: config.password,
      port: config.port,
      user: config.user,
    });
  }

  public getConnection(): Promise<IConnection> {
    return new Promise<IConnection>((resolve, reject) => {
      this.pool.getConnection((err, sqlConn) => {
        if (ObjectUtils.isNullOrUndefined(err)) {
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
    // tslint:disable-next-line:no-eval
    return eval(`require("mysql")`);
  }
}
