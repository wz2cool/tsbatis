import { CommonHelper, DynamicQuery, Entity, EntityHelper, SqlTemplate, SqlTemplateProvider } from "../../../src";
import { NorthwindProductView } from "../entity/view/NothwindProductView";

export class ProductViewTemplate {
    public static getSelectProductViewByDynamicQuery(dynamicQuery: DynamicQuery<NorthwindProductView>): SqlTemplate {
        const columnAs = SqlTemplateProvider.getColumnsExpression(NorthwindProductView);
        const filterSqlTemplate = SqlTemplateProvider.getFilterExpression(NorthwindProductView, dynamicQuery.filters);
        const sortSqlTemplate = SqlTemplateProvider.getSortExpression(NorthwindProductView, dynamicQuery.sorts);
        const params = [];
        const wherePlaceholder = CommonHelper.isNotBlank(filterSqlTemplate.sqlExpression)
            ? `WHERE ${filterSqlTemplate.sqlExpression}`
            : ``;
        const orderByPlaceholder = CommonHelper.isNotBlank(sortSqlTemplate.sqlExpression)
            ? `ORDER BY ${sortSqlTemplate.sqlExpression}`
            : ``;

        const query = `SELECT ${columnAs} FROM Product LEFT JOIN Category ` +
            `ON Product.CategoryId = Category.Id ${wherePlaceholder} ${orderByPlaceholder}`;

        const sqlTemplate = new SqlTemplate();
        sqlTemplate.sqlExpression = query;
        sqlTemplate.params = sqlTemplate.params.concat(filterSqlTemplate.params).concat(sortSqlTemplate.params);
        return sqlTemplate;
    }

    public static getSelectPriceGreaterThan20(): string {
        const columnAs = SqlTemplateProvider.getColumnsExpression(NorthwindProductView);
        const query = `SELECT ${columnAs} FROM Product LEFT JOIN Category ` +
            `ON Product.CategoryId = Category.Id WHERE Product.UnitPrice > #{price}`;
        return query;
    }
}
