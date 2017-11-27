"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var entityCache_1 = require("../../src/cache/entityCache");
var columnInfo_1 = require("../../src/model/columnInfo");
describe(".EntityCache", function () {
    describe("#addColumnInfo", function () {
        var cache = entityCache_1.EntityCache.getInstance();
        it("should get column after adding it", function () {
            var colInfo = new columnInfo_1.ColumnInfo();
            colInfo.columnName = "colName";
            colInfo.entity = "entity";
            colInfo.property = "prop";
            colInfo.table = "table";
            cache.cacheColumnInfo(colInfo);
            var result = cache.getColumnInfo("entity", "prop");
            chai_1.expect(colInfo.columnName).to.be.eq(result.columnName);
            chai_1.expect(colInfo.entity).to.be.eq(result.entity);
            chai_1.expect(colInfo.property).to.be.eq(result.property);
            chai_1.expect(colInfo.table).to.be.eq(result.table);
        });
        it("should get columns after adding multi columns", function () {
            var colInfo1 = new columnInfo_1.ColumnInfo();
            colInfo1.columnName = "colName";
            colInfo1.entity = "entity";
            colInfo1.property = "prop";
            colInfo1.table = "table";
            cache.cacheColumnInfo(colInfo1);
            var colInfo2 = new columnInfo_1.ColumnInfo();
            colInfo2.columnName = "colName2";
            colInfo2.entity = "entity";
            colInfo2.property = "prop2";
            colInfo2.table = "table";
            cache.cacheColumnInfo(colInfo2);
            var result = cache.getColumnInfos("entity");
            chai_1.expect(2).to.be.eq(result.length);
        });
    });
    describe("#getColumnInfo", function () {
        var cache = entityCache_1.EntityCache.getInstance();
        var colInfo = new columnInfo_1.ColumnInfo();
        colInfo.columnName = "colName";
        colInfo.entity = "entity";
        colInfo.property = "prop";
        colInfo.table = "table";
        cache.cacheColumnInfo(colInfo);
        it("should return null, if entity not found", function () {
            var result = cache.getColumnInfo("notfoundentity", "name");
            chai_1.expect(null).to.be.eq(result);
        });
        it("should return null, if prop not found", function () {
            var result = cache.getColumnInfo("entity", "notfoundProp");
            chai_1.expect(null).to.be.eq(result);
        });
    });
    describe("#getColumnInfos", function () {
        var cache = entityCache_1.EntityCache.getInstance();
        var colInfo = new columnInfo_1.ColumnInfo();
        colInfo.columnName = "colName";
        colInfo.entity = "entity";
        colInfo.property = "prop";
        colInfo.table = "table";
        cache.cacheColumnInfo(colInfo);
        it("should return empty array, if entity not found", function () {
            var result = cache.getColumnInfos("notfoundentity");
            chai_1.expect(0).to.be.eq(result.length);
        });
        it("should return columns", function () {
            var result = cache.getColumnInfos("entity");
            chai_1.expect(true).to.be.eq(result.length > 0);
        });
    });
    describe("#getProperties", function () {
        var cache = entityCache_1.EntityCache.getInstance();
        var colInfo = new columnInfo_1.ColumnInfo();
        colInfo.columnName = "colName";
        colInfo.entity = "entity";
        colInfo.property = "prop";
        colInfo.table = "table";
        cache.cacheColumnInfo(colInfo);
        it("should return ['prop'], if entity exists", function () {
            var result = cache.getProperties("entity");
            chai_1.expect("prop").to.be.eq(result[0]);
        });
        it("should return [], if entity does not exist", function () {
            var result = cache.getProperties("notFoundEntity");
            chai_1.expect(0).to.be.eq(result.length);
        });
    });
});
//# sourceMappingURL=entityCacheTest.js.map