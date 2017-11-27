"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
require("reflect-metadata");
var entityCache_1 = require("../cache/entityCache");
var helper_1 = require("../helper");
var columnInfo_1 = require("../model/columnInfo");
function column(name, a2, a3) {
    var cache = entityCache_1.EntityCache.getInstance();
    return function (target, propertyKey) {
        if (helper_1.CommonHelper.isNullOrUndefined(target)
            || helper_1.CommonHelper.isNullOrUndefined(target.constructor)
            || helper_1.CommonHelper.isNullOrUndefined(target.constructor.name)) {
            throw new Error("cannot find entity from target.constructor.name");
        }
        var table = "";
        var isKey = false;
        var insertable = true;
        if (typeof a2 === "string") {
            table = a2;
        }
        else if (typeof a2 === "boolean") {
            isKey = a2;
        }
        if (typeof a3 === "boolean") {
            insertable = a3;
        }
        var entity = target.constructor.name;
        var propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        var columnInfo = new columnInfo_1.ColumnInfo();
        columnInfo.isPK = isKey;
        columnInfo.insertable = insertable;
        columnInfo.entity = entity;
        columnInfo.columnName = name;
        columnInfo.table = table;
        columnInfo.property = propertyKey;
        columnInfo.propertyType = propertyType.name;
        columnInfo.underscoreProperty = lodash.snakeCase(propertyKey);
        cache.cacheColumnInfo(columnInfo);
    };
}
exports.column = column;
//# sourceMappingURL=column.js.map