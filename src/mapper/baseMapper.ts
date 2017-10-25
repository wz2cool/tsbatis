import { injectable } from "inversify";
import * as lodash from "lodash";
import "reflect-metadata";
import { EntityCache } from "../cache";
import { ISqlConnection } from "../connection";
import { CommonHelper, EntityHelper } from "../helper";
import {
    AssociationRelation,
    CollectionRelation,
    DatabaseType,
    DynamicQuery,
    Entity,
    FilterDescriptorBase,
    KeyValue,
    Page,
    PageRowBounds,
    RelationBase,
    RowBounds,
    SortDescriptorBase,
    SqlTemplate,
} from "../model";
import { SqlTemplateProvider } from "../provider";

@injectable()
export abstract class BaseMapper<T extends Entity> {
    protected readonly sqlConnection: ISqlConnection;
    protected readonly entityCache = EntityCache.getInstance();
    constructor(sqlQuery: ISqlConnection) {
        this.sqlConnection = sqlQuery;
    }

    public abstract getEntityClass(): { new(): T };

    public getColumnExpression(): string {
        return SqlTemplateProvider.getColumnsExpression(this.getEntityClass());
    }

    public getFilterExpression(filters: FilterDescriptorBase[]): SqlTemplate {
        return SqlTemplateProvider.getFilterExpression(this.getEntityClass(), filters);
    }

    public getSortExpression(sorts: SortDescriptorBase[]): SqlTemplate {
        return SqlTemplateProvider.getSortExpression(this.getEntityClass(), sorts);
    }

    public run(plainSql: string, params: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.sqlConnection.run(plainSql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectEntities(plainSql: string, params: any[]): Promise<T[]> {
        const entityClass = this.getEntityClass();
        return this.selectEntitiesInternal<T>(entityClass, plainSql, params);
    }

    public selectEntitiesRowBounds(plainSql: string, params: any[], rowBounds: RowBounds): Promise<T[]> {
        return this.selectEntitiesRowBoundInternal<T>(this.getEntityClass(), plainSql, params, rowBounds);
    }

    public async selectEntitiesPageRowBounds(
        plainSql: string, params: any[], pageRowBounds: PageRowBounds): Promise<Page<T>> {
        try {
            const entityClass = this.getEntityClass();
            const entities = await this.selectEntitiesRowBounds(plainSql, params, pageRowBounds);
            const selectCountSql = `SELECT COUNT(0) FROM (${plainSql}) AS t`;
            const total = await this.selectCount(selectCountSql, params);
            const page = new Page<T>(pageRowBounds.getPageNum(), pageRowBounds.getPageSize(), total, entities);
            return new Promise<Page<T>>((resolve, reject) => resolve(page));
        } catch (e) {
            return new Promise<Page<T>>((resolve, reject) => reject(e));
        }
    }

    public select(plainSql: string, params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.sqlConnection.select(plainSql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public selectCount(plainSql: string, params: any[]): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.sqlConnection.selectCount(plainSql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    public async selectEntitiesWithRelation(
        plainSql: string, params: any[], relations: RelationBase[]): Promise<T[]> {
        try {
            const entityClass = this.getEntityClass();
            const entities = await this.selectEntities(plainSql, params);
            for (const entity of entities) {
                for (const relation of relations) {
                    await this.assignRelation(entity, relation);
                }
            }
            return new Promise<T[]>((resolve, reject) => resolve(entities));
        } catch (e) {
            return new Promise<T[]>((resolve, reject) => reject(e));
        }
    }

    public async assignRelation(sourceEntity: any, relation: RelationBase): Promise<void> {
        const mappingProp = relation.getMappingProp();
        const sourceValue = sourceEntity[relation.getSourceProp()];
        const refEntityClass = relation.getRefEntityClass();
        const refEntityName = EntityHelper.getEntityName(refEntityClass);
        const refColumnInfo = this.entityCache.getColumnInfo(refEntityName, relation.getRefSourceProp());
        const dynamicQuery = relation.getDynamicQuery();
        let params = [];
        params.push(sourceValue);
        let useSql = `${relation.getSelectSql()} WHERE ${refColumnInfo.getQueryColumn()} = ?`;
        if (!CommonHelper.isNullOrUndefined(dynamicQuery)) {
            const filters = dynamicQuery.filters;
            const sorts = dynamicQuery.sorts;
            if (!CommonHelper.isNullOrUndefined(filters) && filters.length > 0) {
                const filterSqlTemplate = SqlTemplateProvider.getFilterExpression(refEntityClass, filters);
                useSql = `${useSql} ${filterSqlTemplate.sqlExpression}`;
                params = params.concat(filterSqlTemplate.params);
            }

            if (!CommonHelper.isNullOrUndefined(sorts) && sorts.length > 0) {
                const sortTemplate = SqlTemplateProvider.getSortExpression(refEntityClass, sorts);
                useSql = `${useSql} ${sortTemplate.sqlExpression}`;
                params = params.concat(sortTemplate.params);
            }
        }
        let nestEntities;
        if (relation instanceof AssociationRelation) {
            // only take one row.
            const rowBounds = new RowBounds(0, 1);
            nestEntities = await this.selectEntitiesRowBoundInternal(refEntityClass, useSql, params, rowBounds);
            if (!CommonHelper.isNullOrUndefined(nestEntities) && nestEntities.length > 0) {
                sourceEntity[mappingProp] = nestEntities[0];
            }
        } else {
            // one to many.
            nestEntities = await this.selectEntitiesInternal(refEntityClass, useSql, params);
            sourceEntity[mappingProp] = nestEntities;
        }

        if (!CommonHelper.isNullOrUndefined(relation.relations) && relation.relations.length > 0) {
            for (const nestEntity of nestEntities) {
                for (const nestRelation of relation.relations) {
                    await this.assignRelation(nestEntity, nestRelation);
                }
            }
        }
    }

    private selectEntitiesInternal<TR>(entityClass: { new(): TR }, plainSql: string, params: any[]): Promise<TR[]> {
        return new Promise<TR[]>((resolve, reject) => {
            this.sqlConnection.selectEntities<TR>(entityClass, plainSql, params, (err, result) => {
                if (CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }

    private selectEntitiesRowBoundInternal<TR>(
        entityClass: { new(): TR }, plainSql: string, params: any[], rowBounds: RowBounds): Promise<TR[]> {
        const paging = this.sqlConnection.getPaging(rowBounds);
        const selectPagingSql = `${plainSql} ${paging}`;
        return this.selectEntitiesInternal<TR>(entityClass, selectPagingSql, params);
    }
}
