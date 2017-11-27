import { IConnection } from "../connection";
import { DynamicQuery, RelationBase, TableEntity } from "../model";
import { BaseMybatisMapper } from "./baseMybatisMapper";
export declare abstract class BaseTableMapper<T extends TableEntity> extends BaseMybatisMapper<T> {
    constructor(sqlConnection: IConnection);
    insert(o: T): Promise<number>;
    insertSelective(o: T): Promise<number>;
    updateByPrimaryKey(o: T): Promise<number>;
    updateByPrimaryKeySelective(o: T): Promise<number>;
    selectByExample(example: T, relations?: RelationBase[]): Promise<T[]>;
    selectByPrimaryKey(key: any, relations?: RelationBase[]): Promise<T[]>;
    selectByDynamicQuery(query: DynamicQuery<T>, relations?: RelationBase[]): Promise<T[]>;
    selectCountByExample(example: T): Promise<number>;
    selectCountByPrimaryKey(key: any): Promise<number>;
    selectCountByDynamicQuery(query: DynamicQuery<T>): Promise<number>;
    deleteByExample(example: T): Promise<number>;
    deleteByPrimaryKey(key: any): Promise<number>;
    deleteByDynamicQuery(query: DynamicQuery<T>): Promise<number>;
    private insertInternal(o, selective);
    private updateByPrimaryKeyInternal(o, selective);
    private deleteInternal(plainSql, params);
    private getSeqIdForSqlite(o);
    private getEffectCountForSqlite();
}
