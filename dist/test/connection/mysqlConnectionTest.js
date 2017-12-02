"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../../src/connection/index");
var index_2 = require("../../src/index");
var index_3 = require("../../src/model/index");
describe(".mysqlConnection", function () {
    describe("#getDataBaseType", function () {
        it("should get mysql", function () {
            var conn = new index_1.MysqlConnection(null);
            var result = conn.getDataBaseType();
            chai_1.expect(index_2.DatabaseType.MYSQL).to.be.eq(result);
        });
    });
    describe("#getRowBoundsExpression", function () {
        it("should return `limit 20, 10` if rowbounds.offset is 20, rowbounds.limit 10", function () {
            var conn = new index_1.MysqlConnection(null);
            var rowbounds = new index_3.RowBounds(20, 10);
            var result = conn.getRowBoundsExpression(rowbounds);
            chai_1.expect("limit 20, 10").to.be.eq(result);
        });
    });
});
//# sourceMappingURL=mysqlConnectionTest.js.map