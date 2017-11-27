"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var model_1 = require("../../src/model");
describe(".ColumnInfo", function () {
    describe("#getQueryColumn", function () {
        it("should return [column] if table is empty", function () {
            var filter = new model_1.ColumnInfo();
            filter.columnName = "name";
            chai_1.expect("name").to.be.eq(filter.getQueryColumn());
        });
        it("should return [table].[column] if table is not empty", function () {
            var filter = new model_1.ColumnInfo();
            filter.columnName = "name";
            filter.table = "student";
            chai_1.expect("student.name").to.be.eq(filter.getQueryColumn());
        });
    });
});
//# sourceMappingURL=columnInfoTest.js.map