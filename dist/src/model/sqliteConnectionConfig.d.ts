import { DatabaseType } from "./databaseType";
import { IConnectionConfig } from "./iConnectionConfig";
export declare class SqliteConnectionConfig implements IConnectionConfig {
    filepath: string;
    getDatabaseType(): DatabaseType;
}
