import * as sqlite3 from "sqlite3";
import { DatabaseType, Entity, RowBounds } from "../model";
import { IConnection } from "./iConnection";

export class SqliteConnection implements IConnection {

    private readonly db: sqlite3.Database;
    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    public getDataBaseType(): DatabaseType {
        throw new Error("Method not implemented.");
    }
    public getRowBoundsExpression(rowBounds: RowBounds): string {
        throw new Error("Method not implemented.");
    }
    public run(sql: string, params: any[]): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public select(sql: string, params: any[]): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    public selectCount(sql: string, params: any[]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    public selectEntities<T extends Entity>(entityClass: new () => T, sql: string, params: any[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    public beginTransaction(): Promise<void> {
        const constructor = (this.db as any).constructor;
        throw new Error("Method not implemented.");
    }
    public rollback(): Promise<void> {
        // remember close db.
        throw new Error("Method not implemented.");
    }
    public commit(): Promise<void> {
        // remember close db.
        throw new Error("Method not implemented.");
    }
}
