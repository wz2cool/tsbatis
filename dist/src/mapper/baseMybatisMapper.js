"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var model_1 = require("../model");
var baseMapper_1 = require("./baseMapper");
var BaseMybatisMapper = (function (_super) {
    __extends(BaseMybatisMapper, _super);
    function BaseMybatisMapper(sqlConnection) {
        return _super.call(this, sqlConnection) || this;
    }
    BaseMybatisMapper.prototype.mybatisSelect = function (sql, paramMap) {
        var sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return _super.prototype.select.call(this, sqlTemplate.sqlExpression, sqlTemplate.params);
    };
    BaseMybatisMapper.prototype.mybatisSelectEntities = function (sql, paramMap, relations) {
        if (relations === void 0) { relations = []; }
        var sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return _super.prototype.selectEntities.call(this, sqlTemplate.sqlExpression, sqlTemplate.params, relations);
    };
    BaseMybatisMapper.prototype.mybatisSelectEntitiesRowBounds = function (sql, paramMap, rowBounds, relations) {
        if (relations === void 0) { relations = []; }
        var sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return _super.prototype.selectEntitiesRowBounds.call(this, sqlTemplate.sqlExpression, sqlTemplate.params, rowBounds, relations);
    };
    BaseMybatisMapper.prototype.mybatisSelectEntitiesPageRowBounds = function (sql, paramMap, pageRowBounds, relations) {
        if (relations === void 0) { relations = []; }
        var sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return _super.prototype.selectEntitiesPageRowBounds.call(this, sqlTemplate.sqlExpression, sqlTemplate.params, pageRowBounds, relations);
    };
    BaseMybatisMapper.prototype.mybatisSelectCount = function (sql, paramMap) {
        var sqlTemplate = this.getSqlTemplate(sql, paramMap);
        return _super.prototype.selectCount.call(this, sqlTemplate.sqlExpression, sqlTemplate.params);
    };
    BaseMybatisMapper.prototype.getSqlTemplate = function (sql, paramMap) {
        var expression = sql;
        var indexParams = [];
        for (var key in paramMap) {
            if (paramMap.hasOwnProperty(key)) {
                var placehoulderKey = "$\{" + key + "\}";
                var paramKey = "#\{" + key + "\}";
                var indexOfParam = sql.indexOf(paramKey);
                if (sql.indexOf(placehoulderKey) >= 0) {
                    expression = expression.replace(placehoulderKey, paramMap[key]);
                }
                else if (indexOfParam >= 0) {
                    expression = expression.replace(paramKey, "?");
                    var keyValue = new model_1.KeyValue(indexOfParam, paramMap[key]);
                    indexParams.push(keyValue);
                }
            }
        }
        var sqlTemplate = new model_1.SqlTemplate();
        sqlTemplate.sqlExpression = expression;
        sqlTemplate.params = lodash.sortBy(indexParams, function (x) { return x.getKey(); }).map(function (x) { return x.getValue(); });
        return sqlTemplate;
    };
    return BaseMybatisMapper;
}(baseMapper_1.BaseMapper));
exports.BaseMybatisMapper = BaseMybatisMapper;
//# sourceMappingURL=baseMybatisMapper.js.map