"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var cache_1 = require("../cache");
var helper_1 = require("../helper");
var model_1 = require("../model");
var SqlTemplateProvider = /** @class */ (function () {
    function SqlTemplateProvider() {
        // hide constructor
    }
    SqlTemplateProvider.getPkColumn = function (o) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(o);
        return lodash.find(columnInfos, function (s) { return s.isPK; });
    };
    SqlTemplateProvider.getInsert = function (o, selective) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(o);
        var columnNames = [];
        var placeholders = [];
        var params = [];
        columnInfos.forEach(function (colInfo) {
            if (!colInfo.insertable) {
                return;
            }
            var propValue = o[colInfo.property];
            if (selective && helper_1.CommonHelper.isNullOrUndefined(propValue)) {
                return;
            }
            propValue = helper_1.CommonHelper.isNullOrUndefined(propValue) ? null : propValue;
            params.push(propValue);
            columnNames.push(colInfo.columnName);
            placeholders.push("?");
        });
        var tableName = o.getTableName();
        var columnNamesStr = columnNames.join(", ");
        var placeholderStr = placeholders.join(", ");
        var sqlExpression = "INSERT INTO " + tableName + " (" + columnNamesStr + ") VALUES (" + placeholderStr + ")";
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    };
    SqlTemplateProvider.getDeleteByPk = function (entityClass, key) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(entityClass);
        var keyColumn = lodash.find(columnInfos, function (s) { return s.isPK; });
        if (helper_1.CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }
        var tableName = new entityClass().getTableName();
        var keyColumnName = keyColumn.columnName;
        var expression = "DELETE FROM " + tableName + " WHERE " + keyColumnName + " = ?";
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = expression;
        sqlParam.params.push(key);
        return sqlParam;
    };
    SqlTemplateProvider.getDelete = function (example) {
        var query = this.generateDynamicQueryByExample(example);
        var entityClass = helper_1.EntityHelper.getEntityClass(example);
        return this.getDeleteByDynamicQuery(entityClass, query);
    };
    SqlTemplateProvider.getDeleteByDynamicQuery = function (entityClass, query) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(new entityClass());
        var table = (new entityClass()).getTableName();
        var deleteSql = "DELETE FROM " + table;
        return this.getSqlByDynamicQuery(entityClass, deleteSql, query);
    };
    SqlTemplateProvider.getUpdateByPk = function (o, selective) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(o);
        var keyColumn = lodash.find(columnInfos, function (s) { return s.isPK; });
        if (helper_1.CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }
        var tableName = o.getTableName();
        var sets = [];
        var params = [];
        columnInfos.forEach(function (colInfo) {
            if (colInfo.property === keyColumn.property) {
                // don't update key column.
                return;
            }
            var propValue = o[colInfo.property];
            if (selective && helper_1.CommonHelper.isNullOrUndefined(propValue)) {
                return;
            }
            propValue = helper_1.CommonHelper.isNullOrUndefined(propValue) ? null : propValue;
            sets.push(colInfo.columnName + " = ?");
            params.push(propValue);
        });
        var setStr = sets.join(", ");
        var whereStr = keyColumn.columnName + " = ?";
        params.push(o[keyColumn.property]);
        var sqlExpression = "UPDATE " + tableName + " SET " + setStr + " WHERE " + whereStr;
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    };
    SqlTemplateProvider.getSelectByPk = function (entityClass, key) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(entityClass);
        var keyColumn = lodash.find(columnInfos, function (s) { return s.isPK; });
        if (helper_1.CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }
        var tableName = new entityClass().getTableName();
        var columnAsStr = SqlTemplateProvider.getColumnsAsUnderscoreProps(columnInfos);
        var whereStr = keyColumn.columnName + " = ?";
        var sqlExpression = "SELECT " + columnAsStr + " FROM " + tableName + " WHERE " + whereStr;
        var params = [];
        params.push(key);
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    };
    SqlTemplateProvider.getSelect = function (example) {
        var query = this.generateDynamicQueryByExample(example);
        var entityClass = helper_1.EntityHelper.getEntityClass(example);
        return this.getSelectByDynamicQuery(entityClass, query);
    };
    SqlTemplateProvider.getSelectCountByPk = function (entityClass, pk) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(entityClass);
        var keyColumn = lodash.find(columnInfos, function (s) { return s.isPK; });
        if (helper_1.CommonHelper.isNullOrUndefined(keyColumn)) {
            throw new Error("cannot find key, please set iskey property in @column.");
        }
        var tableName = new entityClass().getTableName();
        var whereStr = keyColumn.columnName + " = ?";
        var sqlExpression = "SELECT COUNT(0) FROM " + tableName + " WHERE " + whereStr;
        var params = [];
        params.push(pk);
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = sqlExpression;
        sqlParam.params = params;
        return sqlParam;
    };
    SqlTemplateProvider.getSelectCount = function (example) {
        var query = this.generateDynamicQueryByExample(example);
        var entityClass = helper_1.EntityHelper.getEntityClass(example);
        return this.getSelectCountByDynamicQuery(entityClass, query);
    };
    SqlTemplateProvider.getSelectByDynamicQuery = function (entityClass, query) {
        var selectSql = this.getSelectSql(entityClass);
        return SqlTemplateProvider.getSqlByDynamicQuery(entityClass, selectSql, query);
    };
    SqlTemplateProvider.getSelectCountByDynamicQuery = function (entityClass, query) {
        var selectSql = this.getSelectCountSql(entityClass);
        return SqlTemplateProvider.getSqlByDynamicQuery(entityClass, selectSql, query);
    };
    SqlTemplateProvider.getSelectSql = function (entityClass) {
        var columnInfos = SqlTemplateProvider.getColumnInfos(new entityClass());
        var table = (new entityClass()).getTableName();
        var columnStr = SqlTemplateProvider.getColumnsAsUnderscoreProps(columnInfos);
        var selectSql = "SELECT " + columnStr + " FROM " + table;
        return selectSql;
    };
    SqlTemplateProvider.getSelectCountSql = function (entityClass) {
        var table = (new entityClass()).getTableName();
        var selectSql = "SELECT COUNT(0) FROM " + table;
        return selectSql;
    };
    SqlTemplateProvider.getSqlByDynamicQuery = function (entityClass, sql, dynamicQuery) {
        var useQuery = helper_1.CommonHelper.isNullOrUndefined(dynamicQuery) ? new model_1.DynamicQuery() : dynamicQuery;
        var expression = sql;
        var filterSqlParam = SqlTemplateProvider.getFilterExpression(entityClass, useQuery.filters);
        var sortSqlParam = SqlTemplateProvider.getSortExpression(entityClass, useQuery.sorts);
        expression = helper_1.CommonHelper.isBlank(filterSqlParam.sqlExpression)
            ? expression : expression + " WHERE " + filterSqlParam.sqlExpression;
        expression = helper_1.CommonHelper.isBlank(sortSqlParam.sqlExpression)
            ? expression : expression + " ORDER BY " + sortSqlParam.sqlExpression;
        var params = [];
        params = params.concat(filterSqlParam.params);
        params = params.concat(sortSqlParam.params);
        var result = new model_1.SqlTemplate();
        result.sqlExpression = expression;
        result.params = params;
        return result;
    };
    SqlTemplateProvider.getFilterExpression = function (entityClass, filters) {
        if (helper_1.CommonHelper.isNullOrUndefined(filters) || filters.length === 0) {
            return new model_1.SqlTemplate();
        }
        var expression;
        var params = [];
        filters.forEach(function (filter) {
            var sqlParam = SqlTemplateProvider.getFilterExpressionByFilterBase(entityClass, filter);
            if (sqlParam != null && helper_1.CommonHelper.isNotBlank(sqlParam.sqlExpression)) {
                params = params.concat(sqlParam.params);
                expression = helper_1.CommonHelper.isBlank(expression)
                    ? sqlParam.sqlExpression
                    : expression + " " + model_1.FilterCondition[filter.condition] + " " + sqlParam.sqlExpression;
            }
        });
        var result = new model_1.SqlTemplate();
        result.sqlExpression = expression;
        result.params = result.params.concat(params);
        return result;
    };
    SqlTemplateProvider.getSortExpression = function (entityClass, sorts) {
        if (helper_1.CommonHelper.isNullOrUndefined(sorts) || sorts.length === 0) {
            return new model_1.SqlTemplate();
        }
        var expression;
        var params = [];
        sorts.forEach(function (sort) {
            var sqlParam = SqlTemplateProvider.getSortExpressionBySortBase(entityClass, sort);
            if (sqlParam != null && helper_1.CommonHelper.isNotBlank(sqlParam.sqlExpression)) {
                params = params.concat(sqlParam.params);
                expression = helper_1.CommonHelper.isBlank(expression)
                    ? sqlParam.sqlExpression
                    : expression + " " + sqlParam.sqlExpression;
            }
        });
        var result = new model_1.SqlTemplate();
        result.sqlExpression = expression;
        result.params = result.params.concat(params);
        return result;
    };
    SqlTemplateProvider.getColumnsExpression = function (entityClass) {
        var entityName = helper_1.EntityHelper.getEntityName(entityClass);
        if (helper_1.CommonHelper.isBlank(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }
        var columnInfos = cache_1.EntityCache.getInstance().getColumnInfos(entityName);
        return SqlTemplateProvider.getColumnsAsUnderscoreProps(columnInfos);
    };
    SqlTemplateProvider.getColumnInfos = function (o) {
        var entityName = helper_1.EntityHelper.getEntityName(o);
        if (helper_1.CommonHelper.isBlank(entityName)) {
            throw new Error("cannot find entity, please set @column to entity!");
        }
        var columnInfos = cache_1.EntityCache.getInstance().getColumnInfos(entityName);
        return columnInfos;
    };
    //#region filter
    SqlTemplateProvider.getFilterExpressionByFilterBase = function (entityClass, filter) {
        if (filter instanceof model_1.FilterDescriptor) {
            return SqlTemplateProvider.getFilterExpressionByFilterDescriptor(entityClass, filter);
        }
        else if (filter instanceof model_1.FilterGroupDescriptor) {
            return SqlTemplateProvider.getFilterExpression(entityClass, filter.filters);
        }
        else if (filter instanceof model_1.CustomFilterDescriptor) {
            return SqlTemplateProvider.getFilterExpressionByCustomFilterDescriptor(entityClass, filter);
        }
        else {
            return new model_1.SqlTemplate();
        }
    };
    SqlTemplateProvider.getFilterExpressionByFilterDescriptor = function (entityClass, filter) {
        var value = filter.value;
        var operator = filter.operator;
        var propertyPath = filter.propertyPath;
        var entity = helper_1.EntityHelper.getEntityName(entityClass);
        var columnInfo = cache_1.EntityCache.getInstance().getColumnInfo(entity, propertyPath);
        return helper_1.FilterHelper.getFilterExpression(operator, columnInfo, value);
    };
    SqlTemplateProvider.getFilterExpressionByCustomFilterDescriptor = function (entityClass, filter) {
        var sqlParam = new model_1.SqlTemplate();
        var expression = helper_1.CommonHelper.isBlank(filter.expression) ? "" : filter.expression;
        for (var i = 0; i < filter.params.length; i++) {
            expression = expression.replace("{" + i + "}", "?");
        }
        sqlParam.params = sqlParam.params.concat(filter.params);
        sqlParam.sqlExpression = expression;
        return sqlParam;
    };
    //#endregion
    //#region sort
    SqlTemplateProvider.getSortExpressionBySortBase = function (entityClass, sort) {
        if (sort instanceof model_1.SortDescriptor) {
            return SqlTemplateProvider.getSortExpressionBySortDescriptor(entityClass, sort);
        }
        else if (sort instanceof model_1.CustomSortDescriptor) {
            return SqlTemplateProvider.getSortExpressionByCustomSortDescriptor(entityClass, sort);
        }
        else {
            return new model_1.SqlTemplate();
        }
    };
    SqlTemplateProvider.getSortExpressionBySortDescriptor = function (entityClass, sort) {
        var entity = helper_1.EntityHelper.getEntityName(entityClass);
        var columnInfo = cache_1.EntityCache.getInstance().getColumnInfo(entity, sort.propertyPath);
        var directionStr = model_1.SortDirection[sort.direction];
        var queryColumn = columnInfo.getQueryColumn();
        var expression = queryColumn + " " + directionStr;
        var sqlParam = new model_1.SqlTemplate();
        sqlParam.sqlExpression = expression;
        return sqlParam;
    };
    SqlTemplateProvider.getSortExpressionByCustomSortDescriptor = function (entityClass, sort) {
        var sqlParam = new model_1.SqlTemplate();
        var expression = helper_1.CommonHelper.isBlank(sort.expression) ? "" : sort.expression;
        for (var i = 0; i < sort.params.length; i++) {
            expression = expression.replace("{" + i + "}", "?");
        }
        sqlParam.params = sqlParam.params.concat(sort.params);
        sqlParam.sqlExpression = expression;
        return sqlParam;
    };
    //#endregion
    SqlTemplateProvider.getColumnsAsUnderscoreProps = function (columnInfos) {
        return lodash.map(columnInfos, function (s) { return s.getQueryColumn() + " AS " + s.underscoreProperty; }).join(", ");
    };
    SqlTemplateProvider.generateDynamicQueryByExample = function (example) {
        var dynamicQuery = model_1.DynamicQuery.createIntance();
        for (var prop in example) {
            if (example.hasOwnProperty(prop)
                && !helper_1.CommonHelper.isNullOrUndefined(example[prop])) {
                var filter = new model_1.FilterDescriptor();
                filter.propertyPath = prop;
                filter.value = example[prop];
                dynamicQuery.addFilters(filter);
            }
        }
        return dynamicQuery;
    };
    return SqlTemplateProvider;
}());
exports.SqlTemplateProvider = SqlTemplateProvider;
//# sourceMappingURL=sqlTemplateProvider.js.map