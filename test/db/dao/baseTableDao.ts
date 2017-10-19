import * as sqlite3 from "sqlite3";
import { CommonHelper } from "../../../src/helper";
import { DynamicQuery, TableEntity } from "../../../src/model";
import { MappingProvider, SqlProvider } from "../../../src/provider";
import { User } from "../entity/user";

export class BaseTableDao<T extends TableEntity> {
    protected readonly db: sqlite3.Database;
    constructor(db: sqlite3.Database) {
        this.db = db;
    }
    public insert(o: T): Promise<number> {
        return this.insertAndReturnId(o, false);
    }

    public insertSelective(o: T): Promise<number> {
        return this.insertAndReturnId(o, true);
    }

    public deleteByKey(o: T): Promise<void> {
        const deleteTemplate = SqlProvider.getDeleteByKey<T>(o);
        return this.dbRun(deleteTemplate.sqlExpression, deleteTemplate.params);
    }

    public deleteByDynamicQuery(entityClass: { new(): T }, dynamicQuery: DynamicQuery<T>): Promise<void> {
        const deleteTemplate = SqlProvider.getDeleteByDynamicQuery(entityClass, dynamicQuery);
        return this.dbRun(deleteTemplate.sqlExpression, deleteTemplate.params);
    }

    public updateByKey(o: T): Promise<void> {
        const updateTemplate = SqlProvider.getUpdateByKey<T>(o, false);
        return this.dbRun(updateTemplate.sqlExpression, updateTemplate.params);
    }

    public updateSeletiveByKey(o: T): Promise<void> {
        const updateTemplate = SqlProvider.getUpdateByKey<T>(o, true);
        return this.dbRun(updateTemplate.sqlExpression, updateTemplate.params);
    }

    public selectByKey(o: T): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            const updateTemplate = SqlProvider.getSelectByKey<T>(o);
            this.db.all(updateTemplate.sqlExpression, updateTemplate.params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (CommonHelper.isArray(result)) {
                        resolve(MappingProvider.toEntities<T>(o, result));
                    } else {
                        reject(new Error(`cannot resolve result: ${result}`));
                    }
                }
            });
        });
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
        const insertTemplate = SqlProvider.getInsert<T>(o, selective);
        return this.dbRun(insertTemplate.sqlExpression, insertTemplate.params);
    }

    private dbRun(sql: string, params: any[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, params, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private dbAll(sql: string, params: any[]): Promise<T[]> {

    }
}
