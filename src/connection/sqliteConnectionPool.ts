import { SqliteConnectionConfig } from "../model";
import { IConnection } from "./iConnection";
import { IConnectionPool } from "./iConnectionPool";
import { SqliteConnection } from "./sqliteConnection";

export class SqliteConnectionPool implements IConnectionPool {
  private readonly config: SqliteConnectionConfig;
  private readonly enableLog: boolean;
  constructor(config: SqliteConnectionConfig, enableLog: boolean = false) {
    this.config = config;
    this.enableLog = enableLog;
  }

  public getConnection(): Promise<IConnection> {
    try {
      const conn = new SqliteConnection(this.config.filepath, this.enableLog);
      return new Promise<IConnection>((resolve, reject) => resolve(conn));
    } catch (e) {
      return new Promise<IConnection>((resolve, reject) => reject(e));
    }
  }
}
