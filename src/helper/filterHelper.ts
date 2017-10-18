import * as lodash from "lodash";
import { ColumnInfo, FilterDescriptor, FilterOperator, SqlParam } from "../model";
import { CommonHelper } from "./commonHelper";

export class FilterHelper {
    public static getFilterExpression(operator: FilterOperator, columnInfo: ColumnInfo, filterValue: any): SqlParam {
        const filterValues = FilterHelper.getFilterValues(operator, filterValue);
        switch (operator) {
            case FilterOperator.NOT_EQUAL:
                return FilterHelper.getNotEqualExpression(columnInfo, filterValues);
            case FilterOperator.LESS_THAN:
                return FilterHelper.getLessThanExpression(columnInfo, filterValues);
            case FilterOperator.LESS_THAN_OR_EQUAL:
                return FilterHelper.getLessThanOrEqualExpression(columnInfo, filterValues);
            case FilterOperator.GREATER_THAN_OR_EQUAL:
                return FilterHelper.getGreaterThanOrEqualExpression(columnInfo, filterValues);
            case FilterOperator.GREATER_THAN:
                return FilterHelper.getGreaterThanExpression(columnInfo, filterValues);
            case FilterOperator.START_WITH:
            case FilterOperator.END_WITH:
            case FilterOperator.CONTAINS:
                return FilterHelper.getLikeExpression(columnInfo, filterValues);
            case FilterOperator.IN:
                return FilterHelper.getInExpression(columnInfo, filterValues);
            case FilterOperator.NOT_IN:
                return FilterHelper.getNotInExpression(columnInfo, filterValues);
            case FilterOperator.BETWEEN:
                return FilterHelper.getBetweenExpression(columnInfo, filterValues);
            default:
                return FilterHelper.getEqualExpression(columnInfo, filterValues);
        }
    }

    private static getFilterValues(operator: FilterOperator, filterValue: any): any[] {
        let result: any[] = [];
        if (operator === FilterOperator.IN
            || operator === FilterOperator.NOT_IN
            || operator === FilterOperator.BETWEEN) {
            if (CommonHelper.isArray(filterValue)) {
                result = filterValue as any[];
                if (operator === FilterOperator.BETWEEN && result.length !== 2) {
                    const errMsg = "if \"BETWEEN\" operator, the count of filter value must be 2";
                    throw new TypeError(errMsg);
                }
            } else {
                const errMsg = "filter value of \"IN\" or \"NOT_IN\" operator must be array";
                throw new TypeError(errMsg);
            }
        } else {
            if (CommonHelper.isArray(filterValue)) {
                const errMsg = "if not \"BETWEEN\", \"IN\" or \"NOT_IN\" operator, " +
                    "filter value can not be array or collection.";
                throw new TypeError(errMsg);
            }

            if (CommonHelper.isNullOrUndefined(filterValue)) {
                result.push(null);
            } else {
                const processedFilterValue = FilterHelper.processSingleFilterValue(operator, filterValue);
                result.push(processedFilterValue);
            }
        }
        return result;
    }

    private static processSingleFilterValue(operator: FilterOperator, filterValue: any): any {
        if (operator === FilterOperator.START_WITH) {
            return (CommonHelper.isNullOrUndefined(filterValue) ? "" : filterValue) + "%";
        } else if (operator === FilterOperator.END_WITH) {
            return "%" + (CommonHelper.isNullOrUndefined(filterValue) ? "" : filterValue);
        } else if (operator === FilterOperator.CONTAINS) {
            return "%" + (CommonHelper.isNullOrUndefined(filterValue) ? "" : filterValue) + "%";
        } else {
            return CommonHelper.isNullOrUndefined(filterValue) ? null : filterValue;
        }
    }

    private static getEqualExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        const filterValue = filterValues[0];
        if (CommonHelper.isNullOrUndefined(filterValue)) {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " IS NULL";
        } else {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " = ?";
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    }

    private static getNotEqualExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        const filterValue = filterValues[0];
        if (CommonHelper.isNullOrUndefined(filterValue)) {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " IS NOT NULL";
        } else {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " <> ?";
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    }

    private static getLessThanExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " < ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getLessThanOrEqualExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " <= ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getGreaterThanOrEqualExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " >= ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getGreaterThanExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " > ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getLikeExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " LIKE ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getInExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        if (filterValues.length > 0) {
            const placeholderStr = lodash.map(filterValues, (f) => "?").join(", ");
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + ` IN (${placeholderStr})`;
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    }

    private static getNotInExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        if (filterValues.length > 0) {
            const placeholderStr = lodash.map(filterValues, (f) => "?").join(", ");
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + ` NOT IN (${placeholderStr})`;
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    }

    private static getBetweenExpression(columnInfo: ColumnInfo, filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + ` BETWEEN ? AND ?`;
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private constructor() {
        // hide
    }
}
