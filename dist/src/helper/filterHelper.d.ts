import { ColumnInfo, FilterOperator, SqlTemplate } from "../model";
export declare class FilterHelper {
    static getFilterExpression(operator: FilterOperator, columnInfo: ColumnInfo, filterValue: any): SqlTemplate;
    private static getFilterValues(operator, filterValue);
    private static processSingleFilterValue(operator, filterValue);
    private static getEqualExpression(columnInfo, filterValues);
    private static getNotEqualExpression(columnInfo, filterValues);
    private static getLessThanExpression(columnInfo, filterValues);
    private static getLessThanOrEqualExpression(columnInfo, filterValues);
    private static getGreaterThanOrEqualExpression(columnInfo, filterValues);
    private static getGreaterThanExpression(columnInfo, filterValues);
    private static getLikeExpression(columnInfo, filterValues);
    private static getInExpression(columnInfo, filterValues);
    private static getNotInExpression(columnInfo, filterValues);
    private static getBetweenExpression(columnInfo, filterValues);
    private constructor();
}
