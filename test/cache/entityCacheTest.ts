import { expect } from "chai";
import { EntityCache } from "../../src/cache/entityCache";
import { ColumnInfo } from "../../src/model/columnInfo";

describe(".EntityCache", () => {
    describe("#addColumnInfo", () => {
        const cache = EntityCache.getInstance();
        it("should get column after adding it", () => {
            const colInfo = new ColumnInfo();
            colInfo.columnName = "colName";
            colInfo.entity = "entity";
            colInfo.property = "prop";
            colInfo.table = "table";
            cache.cacheColumnInfo(colInfo);

            const result = cache.getColumnInfo("entity", "prop");
            expect(colInfo.columnName).to.be.eq(result.columnName);
            expect(colInfo.entity).to.be.eq(result.entity);
            expect(colInfo.property).to.be.eq(result.property);
            expect(colInfo.table).to.be.eq(result.table);
        });

        it("should get columns after adding multi columns", () => {
            const colInfo1 = new ColumnInfo();
            colInfo1.columnName = "colName";
            colInfo1.entity = "entity";
            colInfo1.property = "prop";
            colInfo1.table = "table";
            cache.cacheColumnInfo(colInfo1);

            const colInfo2 = new ColumnInfo();
            colInfo2.columnName = "colName2";
            colInfo2.entity = "entity";
            colInfo2.property = "prop2";
            colInfo2.table = "table";
            cache.cacheColumnInfo(colInfo2);

            const result = cache.getColumnInfos("entity");
            expect(2).to.be.eq(result.length);
        });
    });

    describe("#getColumnInfo", () => {
        const cache = EntityCache.getInstance();
        const colInfo = new ColumnInfo();
        colInfo.columnName = "colName";
        colInfo.entity = "entity";
        colInfo.property = "prop";
        colInfo.table = "table";
        cache.cacheColumnInfo(colInfo);

        it("should return null, if entity not found", () => {
            const result = cache.getColumnInfo("notfoundentity", "name");
            expect(null).to.be.eq(result);
        });

        it("should return null, if prop not found", () => {
            const result = cache.getColumnInfo("entity", "notfoundProp");
            expect(null).to.be.eq(result);
        });
    });

    describe("#getColumnInfos", () => {
        const cache = EntityCache.getInstance();
        const colInfo = new ColumnInfo();
        colInfo.columnName = "colName";
        colInfo.entity = "entity";
        colInfo.property = "prop";
        colInfo.table = "table";
        cache.cacheColumnInfo(colInfo);

        it("should return empty array, if entity not found", () => {
            const result = cache.getColumnInfos("notfoundentity");
            expect(0).to.be.eq(result.length);
        });

        it("should return columns", () => {
            const result = cache.getColumnInfos("entity");
            expect(true).to.be.eq(result.length > 0);
        });
    });
});
