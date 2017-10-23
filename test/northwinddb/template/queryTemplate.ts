import { CommonHelper, Entity, EntityHelper, SqlTemplateProvider } from "../../../src";

export class QueryTemplate {
    // public static getSelectOrderViewByDynamicQuery(paramMap: { [key: string]: any }): string {
    //     const columnAsPlaceHolder =
    //         CommonHelper.isNullOrUndefined(paramMap.columnAsPlaceHolder) ? "*"
    //             : `$\{${paramMap.columnAsPlaceHolder}}`;
    //     const wherePlaceholder =
    //         CommonHelper.isNullOrUndefined(paramMap.wherePlaceholder) ? ""
    //             : `WHERE $\{${paramMap.wherePlaceholder}}`;
    //     const orderByPlaceholder =
    //         CommonHelper.isNullOrUndefined(paramMap.orderByPlaceholder) ? ""
    //             : `ORDER BY $\{${paramMap.orderByPlaceholder}}`;

    //     const query = `SELECT ${columnAsPlaceHolder} FROM Product ` +
    //         `LEFT JOIN Category ON Product.CategoryId = Category.Id ${wherePlaceholder} ${orderByPlaceholder}`;

    //     return query;
    // }

    public static getSelectPriceGreaterThan20<T extends Entity>(entityClass: { new(): T }): string {
        const columnAs = SqlTemplateProvider.getColumnsExpression(entityClass);
        const query = `SELECT ${columnAs} FROM Product LEFT JOIN Category ` +
            `ON Product.CategoryId = Category.Id WHERE Product.UnitPrice > #{price}`;
        return query;
    }
}
