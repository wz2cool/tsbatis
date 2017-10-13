import * as lodash from "lodash";

import { CommonHelper, EntityHelper } from "../helper";
import { ISqlQuery } from "../model";
import { SqlProvider } from "../provider";

export abstract class BaseMapper<T> {
    protected readonly sqlQuery: ISqlQuery;
    constructor(sqlQuery: ISqlQuery) {
        this.sqlQuery = sqlQuery;
    }

    public insert(o: T, cb: (err: any, result?: any) => void): void {
        try {
            const sqlParam = SqlProvider.getInsert<T>(o, false);
            this.sqlQuery.query(sqlParam.sqlExpression, sqlParam.params, cb);
        } catch (e) {
            if (cb) { cb(e); }
        }
    }

    public insertSelective(o: T, cb: (err: any, result?: any) => void): void {
        try {
            const sqlParam = SqlProvider.getInsert<T>(o, true);
            this.sqlQuery.query(sqlParam.sqlExpression, sqlParam.params, cb);
        } catch (e) {
            if (cb) { cb(e); }
        }
    }

    public updateByKey(o: T, cb: (err: any, result?: any) => void): void {
        try {
            const sqlParam = SqlProvider.getUpdateByKey<T>(o, false);
            this.sqlQuery.query(sqlParam.sqlExpression, sqlParam.params, cb);
        } catch (e) {
            if (cb) { cb(e); }
        }
    }

    public updateSelectiveByKey(o: T, cb: (err: any, result?: any) => void): void {
        try {
            const sqlParam = SqlProvider.getUpdateByKey<T>(o, true);
            this.sqlQuery.query(sqlParam.sqlExpression, sqlParam.params, cb);
        } catch (e) {
            if (cb) { cb(e); }
        }
    }
}
