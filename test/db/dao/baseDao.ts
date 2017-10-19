import * as sqlite3 from "sqlite3";
import { CommonHelper } from "../../../src/helper";
import { TableEntity } from "../../../src/model";
import { MappingProvider, SqlProvider } from "../../../src/provider";
import { User } from "../entity/user";

export class BaseDao<T extends TableEntity> {
    protected readonly db: sqlite3.Database;
    constructor(db: sqlite3.Database) {
        this.db = db;
    }

    public async insert(o: T): Promise<number> {
        try {
            await this.insertInternal(o);
            const id = await this.getSeqId(o);
            return new Promise<number>((resolve) => resolve(id));
        } catch (e) {
            return new Promise<number>((resolve, reject) => reject(e));
        }
    }

    public deleteByKey(o: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const deleteTemplate = SqlProvider.getDeleteByKey<T>(o);
            this.db.run(deleteTemplate.sqlExpression, deleteTemplate.params,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }

    public updateByKey(o: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateTemplate = SqlProvider.getUpdateByKey<T>(o, true);
            this.db.run(updateTemplate.sqlExpression, updateTemplate.params,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }

    public selectByKey(o: T): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            const updateTemplate = SqlProvider.getSelectByKey<T>(o);
            this.db.all(updateTemplate.sqlExpression, updateTemplate.params,
                (err, result) => {
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

    // insert and return id;
    private insertInternal(o: T): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const insertTemplate = SqlProvider.getInsert<T>(o, true);
            this.db.run(insertTemplate.sqlExpression, insertTemplate.params,
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }

}
