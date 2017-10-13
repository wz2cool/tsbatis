import { ISqlQuery } from "../model";

export abstract class BaseMapper<T> {

    protected readonly sqlQuery: ISqlQuery;
    constructor(entity: { new(): T }, sqlQuery: ISqlQuery) {
        this.sqlQuery = sqlQuery;
        // a
    }

    public Insert(o: T): Promise<number> {

    }
}
