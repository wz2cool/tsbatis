import { EntityCache } from "../cache";
import { IConnection } from "../connection";
import { Entity, FilterDescriptorBase, Page, PageRowBounds, RelationBase, RowBounds, SortDescriptorBase, SqlTemplate } from "../model";
export declare abstract class BaseMapper<T extends Entity> {
    protected readonly connection: IConnection;
    protected readonly entityCache: EntityCache;
    constructor(connection: IConnection);
    abstract getEntityClass(): {
        new (): T;
    };
    getColumnExpression(): string;
    getFilterExpression(filters: FilterDescriptorBase[]): SqlTemplate;
    getSortExpression(sorts: SortDescriptorBase[]): SqlTemplate;
    run(plainSql: string, params: any[]): Promise<any>;
    selectEntities(plainSql: string, params: any[], relations?: RelationBase[]): Promise<T[]>;
    selectEntitiesRowBounds(plainSql: string, params: any[], rowBounds: RowBounds, relations?: RelationBase[]): Promise<T[]>;
    selectEntitiesPageRowBounds(plainSql: string, params: any[], pageRowBounds: PageRowBounds, relations?: RelationBase[]): Promise<Page<T>>;
    select(plainSql: string, params: any[]): Promise<any[]>;
    selectCount(plainSql: string, params: any[]): Promise<number>;
    private selectEntitiesWithRelationInteral(plainSql, params, relations);
    private selectEntitiesRowBoundWithRelationInteral(plainSql, params, rowBounds, relations);
    private assignRelationInternal<TR>(sourceEntity, relation);
    private selectEntitiesInternal<TR>(entityClass, plainSql, params);
    private selectEntitiesRowBoundInternal<TR>(entityClass, plainSql, params, rowBounds, relations?);
}
