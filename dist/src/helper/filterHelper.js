"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var model_1 = require("../model");
var commonHelper_1 = require("./commonHelper");
var FilterHelper = (function () {
    function FilterHelper() {
        // hide
    }
    FilterHelper.getFilterExpression = function (operator, columnInfo, filterValue) {
        var filterValues = FilterHelper.getFilterValues(operator, filterValue);
        switch (operator) {
            case model_1.FilterOperator.NOT_EQUAL:
                return FilterHelper.getNotEqualExpression(columnInfo, filterValues);
            case model_1.FilterOperator.LESS_THAN:
                return FilterHelper.getLessThanExpression(columnInfo, filterValues);
            case model_1.FilterOperator.LESS_THAN_OR_EQUAL:
                return FilterHelper.getLessThanOrEqualExpression(columnInfo, filterValues);
            case model_1.FilterOperator.GREATER_THAN_OR_EQUAL:
                return FilterHelper.getGreaterThanOrEqualExpression(columnInfo, filterValues);
            case model_1.FilterOperator.GREATER_THAN:
                return FilterHelper.getGreaterThanExpression(columnInfo, filterValues);
            case model_1.FilterOperator.START_WITH:
            case model_1.FilterOperator.END_WITH:
            case model_1.FilterOperator.CONTAINS:
                return FilterHelper.getLikeExpression(columnInfo, filterValues);
            case model_1.FilterOperator.IN:
                return FilterHelper.getInExpression(columnInfo, filterValues);
            case model_1.FilterOperator.NOT_IN:
                return FilterHelper.getNotInExpression(columnInfo, filterValues);
            case model_1.FilterOperator.BETWEEN:
                return FilterHelper.getBetweenExpression(columnInfo, filterValues);
            default:
                return FilterHelper.getEqualExpression(columnInfo, filterValues);
        }
    };
    FilterHelper.getFilterValues = function (operator, filterValue) {
        var result = [];
        if (operator === model_1.FilterOperator.IN
            || operator === model_1.FilterOperator.NOT_IN
            || operator === model_1.FilterOperator.BETWEEN) {
            if (commonHelper_1.CommonHelper.isArray(filterValue)) {
                result = filterValue;
                if (operator === model_1.FilterOperator.BETWEEN && result.length !== 2) {
                    var errMsg = "if \"BETWEEN\" operator, the count of filter value must be 2";
                    throw new TypeError(errMsg);
                }
            }
            else {
                var errMsg = "filter value of \"IN\" or \"NOT_IN\" operator must be array";
                throw new TypeError(errMsg);
            }
        }
        else {
            if (commonHelper_1.CommonHelper.isArray(filterValue)) {
                var errMsg = "if not \"BETWEEN\", \"IN\" or \"NOT_IN\" operator, " +
                    "filter value can not be array or collection.";
                throw new TypeError(errMsg);
            }
            if (commonHelper_1.CommonHelper.isNullOrUndefined(filterValue)) {
                result.push(null);
            }
            else {
                var processedFilterValue = FilterHelper.processSingleFilterValue(operator, filterValue);
                result.push(processedFilterValue);
            }
        }
        return result;
    };
    FilterHelper.processSingleFilterValue = function (operator, filterValue) {
        if (operator === model_1.FilterOperator.START_WITH) {
            return (commonHelper_1.CommonHelper.isNullOrUndefined(filterValue) ? "" : filterValue) + "%";
        }
        else if (operator === model_1.FilterOperator.END_WITH) {
            return "%" + (commonHelper_1.CommonHelper.isNullOrUndefined(filterValue) ? "" : filterValue);
        }
        else if (operator === model_1.FilterOperator.CONTAINS) {
            return "%" + (commonHelper_1.CommonHelper.isNullOrUndefined(filterValue) ? "" : filterValue) + "%";
        }
        else {
            return commonHelper_1.CommonHelper.isNullOrUndefined(filterValue) ? null : filterValue;
        }
    };
    FilterHelper.getEqualExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        var filterValue = filterValues[0];
        if (commonHelper_1.CommonHelper.isNullOrUndefined(filterValue)) {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " IS NULL";
        }
        else {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " = ?";
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    };
    FilterHelper.getNotEqualExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        var filterValue = filterValues[0];
        if (commonHelper_1.CommonHelper.isNullOrUndefined(filterValue)) {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " IS NOT NULL";
        }
        else {
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + " <> ?";
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    };
    FilterHelper.getLessThanExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " < ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    };
    FilterHelper.getLessThanOrEqualExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " <= ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    };
    FilterHelper.getGreaterThanOrEqualExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " >= ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    };
    FilterHelper.getGreaterThanExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " > ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    };
    FilterHelper.getLikeExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " LIKE ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    };
    FilterHelper.getInExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        if (filterValues.length > 0) {
            var placeholderStr = lodash.map(filterValues, function (f) { return "?"; }).join(", ");
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + (" IN (" + placeholderStr + ")");
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    };
    FilterHelper.getNotInExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        if (filterValues.length > 0) {
            var placeholderStr = lodash.map(filterValues, function (f) { return "?"; }).join(", ");
            sqlParam.sqlExpression = columnInfo.getQueryColumn() + (" NOT IN (" + placeholderStr + ")");
            sqlParam.params = sqlParam.params.concat(filterValues);
        }
        return sqlParam;
    };
    FilterHelper.getBetweenExpression = function (columnInfo, filterValues) {
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = columnInfo.getQueryColumn() + " BETWEEN ? AND ?";
        sqlParam.params = sqlParam.params.concat(filterValues);
        return sqlParam;
    };
    return FilterHelper;
}());
exports.FilterHelper = FilterHelper;
//# sourceMappingURL=filterHelper.js.map