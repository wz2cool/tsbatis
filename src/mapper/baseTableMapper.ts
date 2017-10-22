import * as lodash from "lodash";
import { ISqlConnection } from "../connection";
import { CommonHelper, EntityHelper } from "../helper";
import { DatabaseType, DynamicQuery, FilterDescriptor, FilterOperator, TableEntity } from "../model";
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

    public updateByKey(o: T): Promise<void> {
        return this.updateByKeyInternal(o, false);
    }

    public updateByKeySelective(o: T): Promise<void> {
        return this.updateByKeyInternal(o, true);
    }

    public select(example: T): Promise<T[]> {
        try {
            const sqlParam = SqlTemplateProvider.getSelect<T>(example);
            const entityClass = EntityHelper.getEntityClass<T>(example);
            return this.selectEntitiesInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<T[]>((resolve, reject) => reject(e));
        }
    }

    public selectByKey(key: any): Promise<T[]> {
        try {
            const entityClass = this.getEntityClass();
            const sqlParam = SqlTemplateProvider.getSelectByKey<T>(entityClass, key);
            return this.selectEntitiesInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<T[]>((resolve, reject) => reject(e));
        }
    }

    public selectByDynamicQuery(query: DynamicQuery<T>): Promise<T[]> {
        try {
            const entityClass = this.getEntityClass();
            const sqlParam = SqlTemplateProvider.getSelectByDynamicQuery<T>(entityClass, query);
            return this.selectEntitiesInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<T[]>((resolve, reject) => reject(e));
        }
    }

    public selectCount(example: T): Promise<number> {
        try {
            const sqlParam = SqlTemplateProvider.getSelectCount<T>(example);
            return this.selectCountInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<number>((resolve, reject) => reject(e));
        }
    }

    public selectCountByKey(key: any): Promise<number> {
        try {
            const entityClass = this.getEntityClass();
            const sqlParam = SqlTemplateProvider.getSelectByKey<T>(entityClass, key);
            return this.selectCountInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<number>((resolve, reject) => reject(e));
        }
    }

    public selectCountByDynamicQuery(query: DynamicQuery<T>): Promise<T[]> {
        try {
            const entityClass = this.getEntityClass();
            const sqlParam = SqlTemplateProvider.getSelectCountByDynamicQuery<T>(entityClass, query);
            return this.selectEntitiesInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<T[]>((resolve, reject) => reject(e));
        }
    }

    public delete(example: T): Promise<void> {
        try {
            const sqlParam = SqlTemplateProvider.getDelete<T>(example);
            return this.runInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public deleteByKey(key: any): Promise<number> {
        try {
            const entityClass = this.getEntityClass();
            const sqlParam = SqlTemplateProvider.getDeleteByKey<T>(entityClass, key);
            return this.runInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<number>((resolve, reject) => reject(e));
        }
    }

    public deleteByDynamicQuery(query: DynamicQuery<T>): Promise<void> {
        try {
            const entityClass = this.getEntityClass();
            const sqlParam = SqlTemplateProvider.getDeleteByDynamicQuery<T>(entityClass, query);
            return this.runInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    private async insertInternal(o: T, selective: boolean, returnAutoIncreaseId: boolean): Promise<number> {
        try {
            const sqlParam = SqlTemplateProvider.getInsert<T>(o, selective);
            const result = await this.runInternal(sqlParam.sqlExpression, sqlParam.params);
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

    private updateByKeyInternal(o: T, selective: boolean): Promise<void> {
        try {
            const sqlParam = SqlTemplateProvider.getUpdateByKey<T>(o, selective);
            return this.runInternal(sqlParam.sqlExpression, sqlParam.params);
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    private async getSeqIdForSqlite(o: T): Promise<number> {
        const sql = "SELECT seq FROM sqlite_sequence WHERE name = ?";
        const tableName = o.getTableName();
        const result = await this.selectInternal(sql, [tableName]);
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
