import * as lodash from "lodash";
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

    public async insert(o: T): Promise<any> {
        const entityName = EntityHelper.getEntityName(o);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            return new Promise<any>((reslove, reject) => {
                reject(new Error("cannot find entity, please set @column to entity!"));
            });
        }

        const columnInfos = this.cache.getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            return new Promise<any>((reslove, reject) => {
                reject(new Error("cannot find entity, please set @column to entity!"));
            });
        }

        const columnNames = lodash.map(columnInfos, (c) => c.columnName);
        const placeHolders = lodash.map(columnInfos, (c) => "?");

        const tableName = columnInfos[0].table;
        const columnNamesStr = columnInfos.join(",");
        const placeholderStr = placeHolders.join(",");
        const sqlExpression = `INSERT INTO ${tableName} (${columnNamesStr}) VALUES (${placeholderStr})`;

        const params = lodash.map(columnInfos, (c) => {
            const propValue = o[c.property];
            return CommonHelper.isNullOrUndefined(propValue) ? null : propValue;
        });

        const result = await this.sqlQuery.query(sqlExpression, params);
        return new Promise<any>((reslove) => {
            reslove(result);
        });
    }
}
