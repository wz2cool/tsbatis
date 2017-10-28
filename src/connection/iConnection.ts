import { DatabaseType, Entity, RowBounds, SqlTemplate } from "../model";
import { ITransactionConnection } from "./iTransactionConnection";

export interface IConnection {
    getDataBaseType(): DatabaseType;
    getRowBoundsExpression(rowBounds: RowBounds): string;
    run(sql: string, params: any[]): Promise<any>;
    select(sql: string, params: any[]): Promise<any[]>;
    selectCount(sql: string, params: any[]): Promise<number>;
    selectEntities<T extends Entity>(
        entityClass: { new(): T },
        sql: string,
        params: any[]): Promise<T[]>;

    beginTransaction(): Promise<ITransactionConnection>;
}
