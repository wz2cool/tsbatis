import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper } from "../helper";
import { ISqlQuery } from "../model";

export abstract class BaseMapper<T> {
    protected readonly cache: EntityCache = EntityCache.getInstance();
    protected readonly sqlQuery: ISqlQuery;
    constructor(sqlQuery: ISqlQuery) {
        this.sqlQuery = sqlQuery;
    }

    public Insert(o: T): Promise<number> {
        const entityName = EntityHelper.getEntityName(o);
        const properties = this.cache.getProperties(entityName);

        return null;
    }
}
