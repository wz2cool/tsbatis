"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var cache_1 = require("../cache");
var helper_1 = require("../helper");
var MappingProvider = (function () {
    function MappingProvider() {
        // hide constructor.
    }
    MappingProvider.toEntities = function (entity, dbObjs, underscoreToCamelCase) {
        if (underscoreToCamelCase === void 0) { underscoreToCamelCase = false; }
        var cache = cache_1.EntityCache.getInstance();
        var entityName = helper_1.EntityHelper.getEntityName(entity);
        var columnInfos = cache.getColumnInfos(entityName);
        return lodash.map(dbObjs, function (dbObj) {
            var entityObj = helper_1.EntityHelper.createObject(entity);
            columnInfos.forEach(function (colInfo) {
                var dbValue = underscoreToCamelCase ? dbObj[colInfo.underscoreProperty] : dbObj[colInfo.property];
                var propertyType = colInfo.propertyType;
                var propertyValue = MappingProvider.toPropertyValue(dbValue, propertyType);
                entityObj[colInfo.property] = propertyValue;
            });
            return entityObj;
        });
    };
    MappingProvider.toPropertyValue = function (dbValue, propertyType) {
        var usePropType = propertyType.toLowerCase();
        if (helper_1.CommonHelper.isNullOrUndefined(dbValue)) {
            return null;
        }
        switch (usePropType) {
            case "number":
                return Number(dbValue);
            case "string":
                return String(dbValue);
            case "boolean":
                var numValue = Number(dbValue);
                if (isNaN(numValue)) {
                    return (dbValue + "").toLowerCase() === "true";
                }
                else {
                    return Boolean(numValue);
                }
            case "date":
                var value = new Date(dbValue);
                if ("Invalid Date" === value.toString()) {
                    throw new TypeError("\"" + dbValue + "\" cannot be coverted to Date");
                }
                else {
                    return value;
                }
            default:
                return dbValue;
        }
    };
    return MappingProvider;
}());
exports.MappingProvider = MappingProvider;
//# sourceMappingURL=mappingProvider.js.map