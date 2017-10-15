import * as lodash from "lodash";
import { ColumnInfo, FilterDescriptor, SqlParam } from "../model";
import { CommonHelper } from "./index";

export class FilterHelper {

    public static resolveFilterDescritpor<T>(filter: FilterDescriptor<T>): SqlParam {

    }

    private static verifyFilterValue()

    private static getEqualExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
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

    private static getNotEqualExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
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

    private static getLessThanExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " < ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getLessThanOrEqualExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " <= ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getGreaterThanOrEqualExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " >= ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getGreaterThanExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " > ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getLikeExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " LIKE ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private static getInExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        if (filterValues.length > 0) {
            const placeholderStr = lodash.map(filterValues, (f) => "?").join(", ");
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + ` IN (${placeholderStr})`;
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    }

    private static getNotInExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        if (filterValues.length > 0) {
            const placeholderStr = lodash.map(filterValues, (f) => "?").join(", ");
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + ` NOT IN (${placeholderStr})`;
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    }

    private static getBetweenExpression(columnInfo: ColumnInfo, ...filterValues: any[]): SqlParam {
        const sqlParam = new SqlParam();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + ` BETWEEN ? AND ?`;
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    }

    private constructor() {
        // hide
    }
}
