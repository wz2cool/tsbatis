import * as sqlite3 from "sqlite3";
import { CommonHelper } from "../../../src/helper";
import { DynamicQuery, TableEntity } from "../../../src/model";
import { MappingProvider, SqlTemplateProvider } from "../../../src/provider";
import { BaseDao } from "./baseDao";

export abstract class BaseTableDao<T extends TableEntity> extends BaseDao<T> {
    constructor(db: sqlite3.Database) {
        super(db);
    }
    public insert(o: T): Promise<number> {
        return this.insertAndReturnId(o, false);
    }

    public insertSelective(o: T): Promise<number> {
        return this.insertAndReturnId(o, true);
    }

    public deleteByKey(o: T): Promise<void> {
        return this.dbRun(SqlTemplateProvider.getDeleteByKey<T>(o));
    }

    public deleteByDynamicQuery(entityClass: { new(): T }, dynamicQuery: DynamicQuery<T>): Promise<void> {
        return this.dbRun(SqlTemplateProvider.getDeleteByDynamicQuery(entityClass, dynamicQuery));
    }

    public updateByKey(o: T): Promise<void> {
        return this.dbRun(SqlTemplateProvider.getUpdateByKey<T>(o, false));
    }

    public updateSeletiveByKey(o: T): Promise<void> {
        return this.dbRun(SqlTemplateProvider.getUpdateByKey<T>(o, true));
    }

    public selectByKey(o: T): Promise<T[]> {
        return this.dbAll(o, SqlTemplateProvider.getSelectByKey<T>(o));
    }

    public selectByDynamicQuery(entityClass: { new(): T }, dynamicQuery: DynamicQuery<T>): Promise<T[]> {
        return this.dbAll(entityClass, SqlTemplateProvider.getSelectByDynamicQuery(entityClass, dynamicQuery));
    }

    // for sqlite
    private getSeqId(o: T): Promise<number> {
        return new Promise((reslove, reject) => {
            const tableName = o.getTableName();
            this.db.each("SELECT seq FROM sqlite_sequence WHERE name = ?",
                tableName, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        reslove(result.seq);
                    }
                });
        });
    }

    private async insertAndReturnId(o: T, selective: boolean): Promise<number> {
        try {
            await this.insertInternal(o, false);
            const id = await this.getSeqId(o);
            return new Promise<number>((resolve) => resolve(id));
        } catch (e) {
            return new Promise<number>((resolve, reject) => reject(e));
        }
    }

    // insert and return id;
    private insertInternal(o: T, selective: boolean): Promise<void> {
        return this.dbRun(SqlTemplateProvider.getInsert<T>(o, selective));
    }
}
