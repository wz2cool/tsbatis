import { CommonHelper, DynamicQuery, Entity, EntityHelper, SqlTemplateProvider } from "../../../src";
import { NorthwindProductView } from "../entity/view/NothwindProductView";

export class ProductViewTemplate {
    // public static getSelectProductViewByDynamicQuery(
    //     entityClass: { new(): NorthwindProductView }, dynamicQuery: DynamicQuery<NorthwindProductView>): string {
    //     // const columnAsPlaceHolder =
    //     //     CommonHelper.isNullOrUndefined(paramMap.columnAsPlaceHolder) ? "*"
    //     //         : `$\{${paramMap.columnAsPlaceHolder}}`;
    //     // const wherePlaceholder =
    //     //     CommonHelper.isNullOrUndefined(paramMap.wherePlaceholder) ? ""
    //     //         : `WHERE $\{${paramMap.wherePlaceholder}}`;
    //     // const orderByPlaceholder =
    //     //     CommonHelper.isNullOrUndefined(paramMap.orderByPlaceholder) ? ""
    //     //         : `ORDER BY $\{${paramMap.orderByPlaceholder}}`;

    //     // const query = `SELECT ${columnAsPlaceHolder} FROM Product ` +
    //     //     `LEFT JOIN Category ON Product.CategoryId = Category.Id ${wherePlaceholder} ${orderByPlaceholder}`;

    //     // return query;
    //     const columnAsPlaceHolder =  

    // }

    public static getSelectPriceGreaterThan20(): string {
        const columnAs = SqlTemplateProvider.getColumnsExpression(NorthwindProductView);
        const query = `SELECT ${columnAs} FROM Product LEFT JOIN Category ` +
            `ON Product.CategoryId = Category.Id WHERE Product.UnitPrice > #{price}`;
        return query;
    }
}
