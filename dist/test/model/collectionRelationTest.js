"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../../src/index");
var customerView_1 = require("../db/views/customerView");
describe(".CollectionRelation", function () {
    describe("#constructor", function () {
        it("inital", function () {
            var result = new index_1.CollectionRelation(function (s) { return s.customers; }, function (s) { return s.customerId; }, function (t) { return t.id; }, customerView_1.CustomerView, "");
            chai_1.expect("customers").to.be.eq(result.getMappingProp());
            chai_1.expect("customerId").to.be.eq(result.getSourceProp());
            chai_1.expect("id").to.be.eq(result.getTargetProp());
            chai_1.expect(customerView_1.CustomerView).to.be.eq(result.getTargetEntityClass());
            chai_1.expect("").to.be.eq(result.getSelectSql());
            chai_1.expect(null).to.be.eq(result.getDynamicQuery());
        });
    });
});
//# sourceMappingURL=collectionRelationTest.js.map