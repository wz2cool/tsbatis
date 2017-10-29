import { DatabaseType } from "./databaseType";
import { IConnectionConfig } from "./iConnectionConfig";

export class MysqlConnectionConfig implements IConnectionConfig {
    public host: string;
    public port: number = 3306;
    public user: string;
    public password: string;
    public database: string;

    public getDatabaseType(): DatabaseType {
        return DatabaseType.MYSQL;
    }
}
