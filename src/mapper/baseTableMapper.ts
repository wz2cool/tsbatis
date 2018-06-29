import { Page } from "../model/page";
import { PageRowBounds } from "../model/pageRowBounds";
import { RowBounds } from "../model/rowBounds";
import { IConnection } from "../connection";
import { EntityHelper } from "../helper";
import { DatabaseType, DynamicQuery, FilterDescriptor, FilterOperator, RelationBase, TableEntity } from "../model";
import { SqlTemplateProvider } from "../provider";
import { BaseMybatisMapper } from "./baseMybatisMapper";
import * as lodash from "lodash";

export abstract class BaseTableMapper<T extends TableEntity> extends BaseMybatisMapper<T> {
  constructor(sqlConnection: IConnection) {
    super(sqlConnection);
  }

  public insert(o: T): Promise<number> {
    return this.insertInternal(o, false);
  }

  public insertSelective(o: T): Promise<number> {
    return this.insertInternal(o, true);
  }

  public updateByPrimaryKey(o: T): Promise<number> {
    return this.updateByPrimaryKeyInternal(o, false);
  }

  public updateByPrimaryKeySelective(o: Partial<T>): Promise<number> {
    const obj = EntityHelper.createObject(this.getEntityClass());
    const newExample = lodash.assign(obj, o);
    return this.updateByPrimaryKeyInternal(newExample, true);
  }

  public selectByExample(example: Partial<T>, relations: RelationBase[] = []): Promise<T[]> {
    try {
      const obj = EntityHelper.createObject(this.getEntityClass());
      const newExample = lodash.assign(obj, example);
      const sqlParam = SqlTemplateProvider.getSelect<T>(newExample);
      return super.selectEntities(sqlParam.sqlExpression, sqlParam.params, relations);
    } catch (e) {
      return new Promise<T[]>((resolve, reject) => reject(e));
    }
  }

  public selectRowBoundsByExample(example: Partial<T>, rowBounds: RowBounds, relations: RelationBase[] = []): Promise<T[]> {
    try {
      const obj = EntityHelper.createObject(this.getEntityClass());
      const newExample = lodash.assign(obj, example);
      const sqlParam = SqlTemplateProvider.getSelect<T>(newExample);
      return super.selectEntitiesRowBounds(sqlParam.sqlExpression, sqlParam.params, rowBounds, relations);
    } catch (e) {
      return new Promise<T[]>((resolve, reject) => reject(e));
    }
  }

  public selectPageRowBoundsByExample(example: Partial<T>, pageRowBounds: PageRowBounds, relations: RelationBase[] = []): Promise<Page<T>> {
    try {
      const obj = EntityHelper.createObject(this.getEntityClass());
      const newExample = lodash.assign(obj, example);
      const sqlParam = SqlTemplateProvider.getSelect<T>(newExample);
      return super.selectEntitiesPageRowBounds(sqlParam.sqlExpression, sqlParam.params, pageRowBounds, relations);
    } catch (e) {
      return new Promise<Page<T>>((resolve, reject) => reject(e));
    }
  }

  public async selectByPrimaryKey(key: any, relations: RelationBase[] = []): Promise<T> {
    try {
      const entityClass = this.getEntityClass();
      const sqlParam = SqlTemplateProvider.getSelectByPk<T>(entityClass, key);
      const entities = await super.selectEntities(sqlParam.sqlExpression, sqlParam.params, relations);
      const result = entities.length > 0 ? entities[0] : null;
      return new Promise<T>(resolve => resolve(result));
    } catch (e) {
      return new Promise<T>((resolve, reject) => reject(e));
    }
  }

  public selectByDynamicQuery(query: DynamicQuery<T>, relations: RelationBase[] = []): Promise<T[]> {
    try {
      const entityClass = this.getEntityClass();
      const sqlParam = SqlTemplateProvider.getSelectByDynamicQuery<T>(entityClass, query);
      return super.selectEntities(sqlParam.sqlExpression, sqlParam.params, relations);
    } catch (e) {
      return new Promise<T[]>((resolve, reject) => reject(e));
    }
  }

  public selectRowBoundsByDynamicQuery(query: DynamicQuery<T>, rowBounds: RowBounds, relations: RelationBase[] = []): Promise<T[]> {
    try {
      const entityClass = this.getEntityClass();
      const sqlParam = SqlTemplateProvider.getSelectByDynamicQuery<T>(entityClass, query);
      return super.selectEntitiesRowBounds(sqlParam.sqlExpression, sqlParam.params, rowBounds, relations);
    } catch (e) {
      return new Promise<T[]>((resolve, reject) => reject(e));
    }
  }

  public selectPageRowBoundsByDynamicQuery(query: DynamicQuery<T>, pageRowBounds: PageRowBounds, relations: RelationBase[] = []): Promise<Page<T>> {
    try {
      const entityClass = this.getEntityClass();
      const sqlParam = SqlTemplateProvider.getSelectByDynamicQuery<T>(entityClass, query);
      return super.selectEntitiesPageRowBounds(sqlParam.sqlExpression, sqlParam.params, pageRowBounds, relations);
    } catch (e) {
      return new Promise<Page<T>>((resolve, reject) => reject(e));
    }
  }

  public selectCountByExample(example: Partial<T>): Promise<number> {
    try {
      const obj = EntityHelper.createObject(this.getEntityClass());
      const newExample = lodash.assign(obj, example);
      const sqlParam = SqlTemplateProvider.getSelectCount<T>(newExample);
      return super.selectCount(sqlParam.sqlExpression, sqlParam.params);
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  public selectCountByDynamicQuery(query: DynamicQuery<T>): Promise<number> {
    try {
      const entityClass = this.getEntityClass();
      const sqlParam = SqlTemplateProvider.getSelectCountByDynamicQuery<T>(entityClass, query);
      return super.selectCount(sqlParam.sqlExpression, sqlParam.params);
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  public deleteByExample(example: Partial<T>): Promise<number> {
    try {
      const obj = EntityHelper.createObject(this.getEntityClass());
      const newExample = lodash.assign(obj, example);
      const sqlParam = SqlTemplateProvider.getDelete<T>(newExample);
      return this.deleteInternal(sqlParam.sqlExpression, sqlParam.params);
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  public deleteByPrimaryKey(key: any): Promise<number> {
    try {
      const entityClass = this.getEntityClass();
      const sqlParam = SqlTemplateProvider.getDeleteByPk<T>(entityClass, key);
      return this.deleteInternal(sqlParam.sqlExpression, sqlParam.params);
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  public deleteByDynamicQuery(query: DynamicQuery<T>): Promise<number> {
    try {
      const entityClass = this.getEntityClass();
      const sqlParam = SqlTemplateProvider.getDeleteByDynamicQuery<T>(entityClass, query);
      return this.deleteInternal(sqlParam.sqlExpression, sqlParam.params);
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  private async insertInternal(o: T, selective: boolean): Promise<number> {
    try {
      const sqlParam = SqlTemplateProvider.getInsert<T>(o, selective);
      const result = await super.run(sqlParam.sqlExpression, sqlParam.params);
      let insertId: number;
      let effectCount: number;
      const keyColumn = SqlTemplateProvider.getPkColumn<T>(o);

      if (this.connection.getDataBaseType() === DatabaseType.MYSQL) {
        if (keyColumn && keyColumn.autoIncrease) {
          insertId = Number(result.insertId);
        }
        effectCount = Number(result.affectedRows);
      } else if (this.connection.getDataBaseType() === DatabaseType.SQLITE3) {
        if (keyColumn && keyColumn.autoIncrease) {
          insertId = await this.getSeqIdForSqlite(o);
        }
        effectCount = await this.getEffectCountForSqlite();
      } else {
        insertId = 0;
        effectCount = 0;
      }

      // assgin id;
      if (keyColumn && keyColumn.autoIncrease) {
        o[keyColumn.property] = insertId;
      }
      return new Promise<number>((resolve, reject) => resolve(effectCount));
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  private async updateByPrimaryKeyInternal(o: T, selective: boolean): Promise<number> {
    try {
      const sqlParam = SqlTemplateProvider.getUpdateByPk<T>(o, selective);
      const result = await super.run(sqlParam.sqlExpression, sqlParam.params);
      let effectCount: number;
      if (this.connection.getDataBaseType() === DatabaseType.MYSQL) {
        effectCount = Number(result.affectedRows);
      } else if (this.connection.getDataBaseType() === DatabaseType.SQLITE3) {
        effectCount = await this.getEffectCountForSqlite();
      } else {
        effectCount = 0;
      }
      return new Promise<number>((resolve, reject) => resolve(effectCount));
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  private async deleteInternal(plainSql: string, params: any[]): Promise<number> {
    try {
      const result = await super.run(plainSql, params);
      let effectCount: number;
      if (this.connection.getDataBaseType() === DatabaseType.MYSQL) {
        effectCount = Number(result.affectedRows);
      } else if (this.connection.getDataBaseType() === DatabaseType.SQLITE3) {
        effectCount = await this.getEffectCountForSqlite();
      } else {
        effectCount = 0;
      }
      return new Promise<number>((resolve, reject) => resolve(effectCount));
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  private async getSeqIdForSqlite(o: T): Promise<number> {
    try {
      const testSql = "SELECT * FROM sqlite_sequence";
      const testResult = await super.select(testSql, []);
      const sql = "SELECT seq FROM sqlite_sequence WHERE name = ?";
      const tableName = o.getTableName();
      const result = await super.select(sql, [tableName]);
      return new Promise<number>((resolve, reject) => {
        if (result.length > 0) {
          const seqId = Number(result[0].seq);
          resolve(seqId);
        } else {
          reject(new Error("cannot find seqId"));
        }
      });
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }

  private async getEffectCountForSqlite(): Promise<number> {
    try {
      const entityClass = this.getEntityClass();
      const tableName = new entityClass().getTableName();
      const sql = `SELECT changes() as change FROM ${tableName}`;
      const result = await super.select(sql, []);
      return new Promise<number>((resolve, reject) => {
        const change = Number(result[0].change);
        resolve(change);
      });
    } catch (e) {
      return new Promise<number>((resolve, reject) => reject(e));
    }
  }
}
