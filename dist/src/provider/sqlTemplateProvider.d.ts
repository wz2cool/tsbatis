import { ColumnInfo, CustomFilterDescriptor, CustomSortDescriptor, DynamicQuery, Entity, FilterDescriptor, FilterDescriptorBase, SortDescriptor, SortDescriptorBase, SqlTemplate, TableEntity } from "../model";
export declare class SqlTemplateProvider {
    static getPkColumn<T extends TableEntity>(o: T): ColumnInfo;
    static getInsert<T extends TableEntity>(o: T, selective: boolean): SqlTemplate;
    static getDeleteByPk<T extends TableEntity>(entityClass: {
        new (): T;
    }, key: any): SqlTemplate;
    static getDelete<T extends TableEntity>(example: T): SqlTemplate;
    static getDeleteByDynamicQuery<T extends TableEntity>(entityClass: {
        new (): T;
    }, query: DynamicQuery<T>): SqlTemplate;
    static getUpdateByPk<T extends TableEntity>(o: T, selective: boolean): SqlTemplate;
    static getSelectByPk<T extends TableEntity>(entityClass: {
        new (): T;
    }, key: any): SqlTemplate;
    static getSelect<T extends TableEntity>(example: T): SqlTemplate;
    static getSelectCountByPk<T extends TableEntity>(entityClass: {
        new (): T;
    }, pk: any): SqlTemplate;
    static getSelectCount<T extends TableEntity>(example: T): SqlTemplate;
    static getSelectByDynamicQuery<T extends TableEntity>(entityClass: {
        new (): T;
    }, query: DynamicQuery<T>): SqlTemplate;
    static getSelectCountByDynamicQuery<T extends TableEntity>(entityClass: {
        new (): T;
    }, query: DynamicQuery<T>): SqlTemplate;
    static getSelectSql<T extends TableEntity>(entityClass: {
        new (): T;
    }): string;
    static getSelectCountSql<T extends TableEntity>(entityClass: {
        new (): T;
    }): string;
    static getSqlByDynamicQuery<T extends Entity>(entityClass: {
        new (): T;
    }, sql: string, dynamicQuery: DynamicQuery<T>): SqlTemplate;
    static getFilterExpression<T extends Entity>(entityClass: {
        new (): T;
    }, filters: FilterDescriptorBase[]): SqlTemplate;
    static getSortExpression<T extends Entity>(entityClass: {
        new (): T;
    }, sorts: SortDescriptorBase[]): SqlTemplate;
    static getColumnsExpression<T extends Entity>(entityClass: {
        new (): T;
    }): string;
    static getColumnInfos<T extends Entity>(o: T | {
        new (): T;
    }): ColumnInfo[];
    static getFilterExpressionByFilterBase<T extends Entity>(entityClass: {
        new (): T;
    }, filter: FilterDescriptorBase): SqlTemplate;
    static getFilterExpressionByFilterDescriptor<T extends Entity>(entityClass: {
        new (): T;
    }, filter: FilterDescriptor<T>): SqlTemplate;
    static getFilterExpressionByCustomFilterDescriptor<T extends Entity>(entityClass: {
        new (): T;
    }, filter: CustomFilterDescriptor): SqlTemplate;
    static getSortExpressionBySortBase<T extends Entity>(entityClass: {
        new (): T;
    }, sort: SortDescriptorBase): SqlTemplate;
    static getSortExpressionBySortDescriptor<T extends Entity>(entityClass: {
        new (): T;
    }, sort: SortDescriptor<T>): SqlTemplate;
    static getSortExpressionByCustomSortDescriptor<T extends Entity>(entityClass: {
        new (): T;
    }, sort: CustomSortDescriptor): SqlTemplate;
    static getColumnsAsUnderscoreProps(columnInfos: ColumnInfo[]): string;
    static generateDynamicQueryByExample<T>(example: T): DynamicQuery<T>;
    constructor();
}
