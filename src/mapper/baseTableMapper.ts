import * as lodash from "lodash";
import { ISqlConnection } from "../connection";
import { CommonHelper, EntityHelper } from "../helper";
import { DatabaseType, DynamicQuery, TableEntity } from "../model";
import { SqlTemplateProvider } from "../provider";
import { BaseMapper } from "./baseMapper";

export abstract class BaseTableMapper<T extends TableEntity> extends BaseMapper<T> {
    protected readonly sqlConnection: ISqlConnection;
    constructor(sqlConnection: ISqlConnection) {
        super(sqlConnection);
    }

    public insert(o: T, returnAutoIncreaseId: boolean = true): Promise<number> {
        return this.insertInternal(o, false, returnAutoIncreaseId);
    }

    public insertSelective(o: T, returnAutoIncreaseId: boolean = true): Promise<number> {
        return this.insertInternal(o, true, returnAutoIncreaseId);
    }

    // public insertSelective(o: T, cb: (err: any, result?: number) => void): void {
    //     try {
    //         const sqlParam = SqlTemplateProvider.getInsert<T>(o, true);
    //         this.sqlConnection.run(sqlParam.sqlExpression, sqlParam.params, cb);
    //     } catch (e) {
    //         if (cb) { cb(e); }
    //     }
    // }

    // public updateByKey(o: T, cb: (err: any, result?: any) => void): void {
    //     try {
    //         const sqlParam = SqlTemplateProvider.getUpdateByKey<T>(o, false);
    //         this.sqlConnection.query(sqlParam.sqlExpression, sqlParam.params, cb);
    //     } catch (e) {
    //         if (cb) { cb(e); }
    //     }
    // }

    // public updateSelectiveByKey(o: T, cb: (err: any, result?: any) => void): void {
    //     try {
    //         const sqlParam = SqlTemplateProvider.getUpdateByKey<T>(o, true);
    //         this.sqlConnection.query(sqlParam.sqlExpression, sqlParam.params, cb);
    //     } catch (e) {
    //         if (cb) { cb(e); }
    //     }
    // }

    // public selectByKey(o: T, cb: (err: any, result?: any) => void): void {
    //     try {
    //         const sqlParam = SqlTemplateProvider.getSelectByKey<T>(o);
    //         this.sqlConnection.query(sqlParam.sqlExpression, sqlParam.params, cb);
    //     } catch (e) {
    //         if (cb) { cb(e); }
    //     }
    // }

    // public selectByDynamicQuery(
    //     entityClass: { new(): T }, query: DynamicQuery<T>, cb: (err: any, result?: any) => void): void {
    //     try {
    //         const sqlParam = SqlTemplateProvider.getSelectByDynamicQuery<T>(entityClass, query);
    //         this.sqlConnection.query(sqlParam.sqlExpression, sqlParam.params, cb);
    //     } catch (e) {
    //         if (cb) { cb(e); }
    //     }
    // }

    private async insertInternal(o: T, selective: boolean, returnAutoIncreaseId: boolean): Promise<number> {
        try {
            const sqlParam = SqlTemplateProvider.getUpdateByKey<T>(o, selective);
            const result = await this.run(sqlParam.sqlExpression, sqlParam.params);
            if (!returnAutoIncreaseId) {
                return new Promise<number>((resolve, reject) => resolve());
            }

            if (this.sqlConnection.getDataBaseType() === DatabaseType.MYSQL) {
                return new Promise<number>((resolve, reject) => resolve(Number(result)));
            } else if (this.sqlConnection.getDataBaseType() === DatabaseType.SQLITE) {
                const seqId = await this.getSeqIdForSqlite(o);
                return new Promise<number>((resolve, reject) => resolve(Number(seqId)));
            }
        } catch (e) {
            return new Promise<number>((resolve, reject) => reject(e));
        }
    }

    private async getSeqIdForSqlite(o: T): Promise<number> {
        const sql = "SELECT seq FROM sqlite_sequence WHERE name = ?";
        const tableName = o.getTableName();
        const result = await this.select(sql, [tableName]);
        return new Promise<number>((resolve, reject) => {
            if (result.length > 0) {
                const seqId = Number(result[0].seq);
                resolve(seqId);
            } else {
                reject(new Error("cannot find seqId"));
            }
        });
    }
}
