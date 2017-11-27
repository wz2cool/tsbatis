"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var helper_1 = require("../helper");
var EntityCache = (function () {
    function EntityCache() {
        this.columnCache = {};
        // hide constructor
    }
    EntityCache.getInstance = function () {
        return this.instance;
    };
    EntityCache.prototype.cacheColumnInfo = function (columnInfo) {
        var propColMap = this.columnCache[columnInfo.entity];
        if (helper_1.CommonHelper.isNullOrUndefined(propColMap)) {
            propColMap = {};
            propColMap[columnInfo.property] = columnInfo;
            this.columnCache[columnInfo.entity] = propColMap;
        }
        else {
            propColMap[columnInfo.property] = columnInfo;
        }
    };
    EntityCache.prototype.getColumnInfo = function (entity, property) {
        var propColMap = this.columnCache[entity];
        if (helper_1.CommonHelper.isNullOrUndefined(propColMap)) {
            return null;
        }
        var columnInfo = propColMap[property];
        if (helper_1.CommonHelper.isNullOrUndefined(columnInfo)) {
            return null;
        }
        return columnInfo;
    };
    EntityCache.prototype.getColumnInfos = function (entity) {
        var propColMap = this.columnCache[entity];
        if (helper_1.CommonHelper.isNullOrUndefined(propColMap)) {
            return [];
        }
        return lodash.values(propColMap);
    };
    EntityCache.prototype.getProperties = function (entity) {
        var columnInfos = this.getColumnInfos(entity);
        if (helper_1.CommonHelper.isNullOrUndefined(columnInfos)
            || columnInfos.length === 0) {
            return [];
        }
        return lodash.map(columnInfos, function (c) { return c.property; });
    };
    return EntityCache;
}());
EntityCache.instance = new EntityCache();
exports.EntityCache = EntityCache;
//# sourceMappingURL=entityCache.js.map