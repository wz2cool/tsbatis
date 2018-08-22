import { CommonHelper } from "../helper";
import { MysqlConnectionConfig } from "../model";
import { IConnection } from "./iConnection";
import { IConnectionPool } from "./iConnectionPool";
import { MysqlConnection } from "./mysqlConnection";

export class MysqlConnectionPool implements IConnectionPool {
  private pool: any;
  private readonly enableLog: boolean;
  private readonly config: MysqlConnectionConfig;
  private isInited: boolean = false;

  constructor(config: MysqlConnectionConfig, enableLog: boolean) {
    this.enableLog = enableLog;
    this.config = config;
  }

  public getConnection(): Promise<IConnection> {
    this.init();
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

  private async getDriver(): Promise<any> {
    // tslint:disable-next-line:no-implicit-dependencies
    return await import("mysql");
  }

  private async init() {
    if (this.isInited) return;

    const mysql = await this.getDriver();
    this.pool = mysql.createPool({
      host: this.config.host,
      port: this.config.port,
      database: this.config.database,
      user: this.config.user,
      password: this.config.password,
    });
    this.isInited = true;
  }
}
