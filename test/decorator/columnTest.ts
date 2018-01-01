import { expect } from "chai";
import { EntityCache } from "../../src/cache";
import { column } from "../../src/decorator";
import { CommonHelper } from "../../src/helper";

describe(".column", () => {
    describe("#tableColumn", () => {
        const cache = EntityCache.getInstance();
        it("id is key", () => {
            const result = cache.getColumnInfo("Student", "name");
            expect("name").to.be.eq(result.columnName);
            expect(false).to.be.eq(result.isPK);
            expect(false).to.be.eq(result.autoIncrease);
            expect(true).to.be.eq(CommonHelper.isBlank(result.table));
        });
    });

    describe("#viewColumn", () => {
        class ProductView {
            @column("product_id", "product")
            public id: number;
            @column("product_name", "product")
            public productName: string;
            @column("category_name", "category")
            public categoryName: string;
            @column("create_time", "product")
            public createTime: Date;
        }
        const cache = EntityCache.getInstance();
        it("id column has table", () => {
            const result = cache.getColumnInfo("ProductView", "id");
            expect("product_id").to.be.eq(result.columnName);
            expect(false).to.be.eq(result.isPK);
            expect(false).to.be.eq(result.autoIncrease);
            expect("product").to.be.eq(result.table);
            expect("Number").to.be.eq(result.propertyType);
        });

        it("get createTime type", () => {
            const result = cache.getColumnInfo("ProductView", "createTime");
            expect("Date").to.be.eq(result.propertyType);
        });

        it("column throw exception if not annotion", () => {
            expect(column("name")).to.be.throw(Error);
        });
    });
});
