import { DatabaseType } from "./databaseType";
import { IConnectionConfig } from "./iConnectionConfig";

export class SqliteConnectionConfig implements IConnectionConfig {
    public filepath: string;

    public getDatabaseType(): DatabaseType {
        return DatabaseType.MYSQL;
    }
}
