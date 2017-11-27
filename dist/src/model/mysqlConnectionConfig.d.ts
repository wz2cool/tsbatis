import { DatabaseType } from "./databaseType";
import { IConnectionConfig } from "./iConnectionConfig";
export declare class MysqlConnectionConfig implements IConnectionConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    getDatabaseType(): DatabaseType;
}
