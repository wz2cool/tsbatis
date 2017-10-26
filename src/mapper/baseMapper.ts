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
    FilterDescriptor,
    FilterDescriptorBase,
    FilterOperator,
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

    public selectEntities(plainSql: string, params: any[], relations: RelationBase[] = []): Promise<T[]> {
        return this.selectEntitiesWithRelationInteral(plainSql, params, relations);
    }

    public selectEntitiesRowBounds(
        plainSql: string,
        params: any[],
        rowBounds: RowBounds,
        relations: RelationBase[] = []): Promise<T[]> {
        return this.selectEntitiesRowBoundWithRelationInteral(plainSql, params, rowBounds, relations);
    }

    public async selectEntitiesPageRowBounds(
        plainSql: string,
        params: any[],
        pageRowBounds: PageRowBounds,
        relations: RelationBase[] = []): Promise<Page<T>> {
        try {
            const entityClass = this.getEntityClass();
            const entities = await this.selectEntitiesRowBounds(plainSql, params, pageRowBounds, relations);
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

    private async selectEntitiesWithRelationInteral(
        plainSql: string, params: any[], relations: RelationBase[]): Promise<T[]> {
        try {
            console.log(plainSql);
            const entityClass = this.getEntityClass();
            const entities = await this.selectEntitiesInternal<T>(entityClass, plainSql, params);
            if (!CommonHelper.isNullOrUndefined(entities) && entities.length > 0
                && !CommonHelper.isNullOrUndefined(relations) && relations.length > 0) {
                for (const entity of entities) {
                    for (const relation of relations) {
                        await this.assignRelationInternal(entity, relation);
                    }
                }
            }
            return new Promise<T[]>((resolve, reject) => resolve(entities));
        } catch (e) {
            return new Promise<T[]>((resolve, reject) => reject(e));
        }
    }

    private async selectEntitiesRowBoundWithRelationInteral(
        plainSql: string, params: any[], rowBounds: RowBounds, relations: RelationBase[]) {
        const paging = this.sqlConnection.getPaging(rowBounds);
        const selectPagingSql = `${plainSql} ${paging}`;
        return this.selectEntitiesWithRelationInteral(plainSql, params, relations);
    }

    private async assignRelationInternal<TR extends Entity>(sourceEntity: TR, relation: RelationBase): Promise<void> {
        try {
            const mappingProp = relation.getMappingProp();
            const sourceValue = sourceEntity[relation.getSourceProp()];
            const refEntityClass = relation.getRefEntityClass();
            let dynamicQuery = relation.getDynamicQuery();
            const refColumnFilter = new FilterDescriptor();
            refColumnFilter.propertyPath = relation.getRefSourceProp();
            refColumnFilter.value = sourceValue;

            if (CommonHelper.isNullOrUndefined(dynamicQuery)) {
                dynamicQuery = DynamicQuery.createIntance().addFilters(refColumnFilter);
            } else {
                dynamicQuery.addFilters(refColumnFilter);
            }
            const sqlTemplate =
                SqlTemplateProvider.getSqlByDynamicQuery(refEntityClass, relation.getSelectSql(), dynamicQuery);

            let nestEntities;
            if (relation instanceof AssociationRelation) {
                // only take one row.
                const rowBounds = new RowBounds(0, 1);
                nestEntities = await this.selectEntitiesRowBoundInternal(
                    refEntityClass, sqlTemplate.sqlExpression, sqlTemplate.params, rowBounds);
                if (!CommonHelper.isNullOrUndefined(nestEntities) && nestEntities.length > 0) {
                    sourceEntity[mappingProp] = nestEntities[0];
                }
            } else {
                // one to many.
                nestEntities = await this.selectEntitiesInternal(
                    refEntityClass, sqlTemplate.sqlExpression, sqlTemplate.params);
                sourceEntity[mappingProp] = nestEntities;
            }

            if (!CommonHelper.isNullOrUndefined(relation.relations) && relation.relations.length > 0) {
                for (const nestEntity of nestEntities) {
                    for (const nestRelation of relation.relations) {
                        await this.assignRelationInternal(nestEntity, nestRelation);
                    }
                }
            }
            return new Promise<void>((resolve, reject) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
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
        entityClass: { new(): TR },
        plainSql: string,
        params: any[],
        rowBounds: RowBounds,
        relations: RelationBase[] = []): Promise<TR[]> {
        const paging = this.sqlConnection.getPaging(rowBounds);
        const selectPagingSql = `${plainSql} ${paging}`;
        return this.selectEntitiesInternal<TR>(entityClass, selectPagingSql, params);
    }
}
