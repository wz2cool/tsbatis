"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var model_1 = require("../../src/model");
describe(".dynanmicQuery", function () {
    describe("#addFilters", function () {
        it("add filter", function () {
            var filter = new model_1.FilterDescriptor(function (s) { return s.name; }, model_1.FilterOperator.EQUAL, "frank");
            var query = model_1.DynamicQuery
                .createIntance()
                .addFilters(filter);
            chai_1.expect(1).to.be.eq(query.filters.length);
            chai_1.expect(model_1.FilterCondition.AND).to.be.eq(query.filters[0].condition);
        });
    });
    describe("#addSorts", function () {
        it("add sort", function () {
            var sort = new model_1.CustomSortDescriptor();
            sort.expression = "test";
            var query = model_1.DynamicQuery
                .createIntance()
                .addSorts(sort);
            chai_1.expect(1).to.be.eq(query.sorts.length);
            chai_1.expect(model_1.SortDirection.ASC).to.be.eq(query.sorts[0].direction);
        });
    });
});
//# sourceMappingURL=dynamicQueryTest.js.map