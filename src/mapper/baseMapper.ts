import * as lodash from "lodash";
import { EntityCache } from "../cache";
import { CommonHelper, EntityHelper } from "../helper";
import { ISqlQuery } from "../model";
import { SqlProvider } from "../provider";

export abstract class BaseMapper<T> {
    protected readonly cache: EntityCache = EntityCache.getInstance();
    protected readonly sqlQuery: ISqlQuery;
    constructor(sqlQuery: ISqlQuery) {
        this.sqlQuery = sqlQuery;
    }

    public insert(o: T, cb: (err: any, result?: any) => void): void {
        const entityName = EntityHelper.getEntityName(o);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            if (cb) { cb(new Error("cannot find entity, please set @column to entity!")); }
            return;
        }

        const columnInfos = this.cache.getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            if (cb) { cb(new Error("cannot find entity, please set @column to entity!")); }
            return;
        }

        const sqlParam = SqlProvider.getInsert<T>(o, columnInfos, false);
        this.sqlQuery.query(sqlParam.sqlExpression, sqlParam.params, cb);
    }

    public insertSelective(o: T, cb: (err: any, result?: any) => void): void {
        const entityName = EntityHelper.getEntityName(o);
        if (CommonHelper.isNullOrUndefined(entityName)) {
            if (cb) { cb(new Error("cannot find entity, please set @column to entity!")); }
            return;
        }

        const columnInfos = this.cache.getColumnInfos(entityName);
        if (CommonHelper.isNullOrUndefined(columnInfos) || columnInfos.length === 0) {
            if (cb) { cb(new Error("cannot find entity, please set @column to entity!")); }
            return;
        }

        const sqlParam = SqlProvider.getInsert<T>(o, columnInfos, true);
        this.sqlQuery.query(sqlParam.sqlExpression, sqlParam.params, cb);
    }
}
