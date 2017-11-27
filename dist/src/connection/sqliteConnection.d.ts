import { DatabaseType, Entity, RowBounds } from "../model";
import { IConnection } from "./iConnection";
export declare class SqliteConnection implements IConnection {
    private readonly db;
    private readonly enableLog;
    constructor(filepath: string, enableLog?: boolean);
    getDataBaseType(): DatabaseType;
    getRowBoundsExpression(rowBounds: RowBounds): string;
    run(sql: string, params: any[]): Promise<any>;
    select(sql: string, params: any[]): Promise<any[]>;
    selectCount(sql: string, params: any[]): Promise<number>;
    selectEntities<T extends Entity>(entityClass: new () => T, sql: string, params: any[]): Promise<T[]>;
    beginTransaction(): Promise<void>;
    rollback(): Promise<void>;
    commit(): Promise<void>;
    release(): Promise<void>;
    private serialize();
    private exec(sql);
    private getDriver();
    private log(log);
}
