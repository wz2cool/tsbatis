import { DatabaseType, Entity } from "../model";

export abstract class ISqlConnection {
    public abstract getDataBaseType(): DatabaseType;

    public abstract run(sql: string, params: any[], callback: (err: any, result?: any) => void);
    public abstract select(sql: string, params: any[], callback: (err: any, result: any[]) => void);
    public abstract selectEntities<T extends Entity>(
        entityClass: { new(): T },
        sql: string,
        params: any[],
        callback: (err: any, result: T[]) => void);
}
