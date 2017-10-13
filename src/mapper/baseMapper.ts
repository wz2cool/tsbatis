import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper } from "../helper";
import { ISqlQuery } from "../model";
import { MappingProvider } from "../provider";

export abstract class BaseMapper<T> {
    protected readonly cache: EntityCache = EntityCache.getInstance();
    protected readonly sqlQuery: ISqlQuery;
    constructor(sqlQuery: ISqlQuery) {
        this.sqlQuery = sqlQuery;
    }

    public async Insert(o: T): Promise<number> {
        return new Promise<number>((reslove, reject) => {
            const entityName = EntityHelper.getEntityName(o);
            const columnInfos = this.cache.getColumnInfos(entityName);

            let query = "INSERT INTO ";
            query = query.concat(columnInfos[0].table);
            columnInfos.forEach((colInfo) => {
                
            })

            return null;
        });
    }
}
