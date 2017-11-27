import { IConnection } from "../connection";
import { Entity, Page, PageRowBounds, RelationBase, RowBounds } from "../model";
import { BaseMapper } from "./baseMapper";
export declare abstract class BaseMybatisMapper<T extends Entity> extends BaseMapper<T> {
    constructor(sqlConnection: IConnection);
    mybatisSelect(sql: string, paramMap: {
        [key: string]: any;
    }): Promise<any>;
    mybatisSelectEntities(sql: string, paramMap: {
        [key: string]: any;
    }, relations?: RelationBase[]): Promise<T[]>;
    mybatisSelectEntitiesRowBounds(sql: string, paramMap: {
        [key: string]: any;
    }, rowBounds: RowBounds, relations?: RelationBase[]): Promise<T[]>;
    mybatisSelectEntitiesPageRowBounds(sql: string, paramMap: {
        [key: string]: any;
    }, pageRowBounds: PageRowBounds, relations?: RelationBase[]): Promise<Page<T>>;
    mybatisSelectCount(sql: string, paramMap: {
        [key: string]: any;
    }): Promise<number>;
    private getSqlTemplate(sql, paramMap);
}
