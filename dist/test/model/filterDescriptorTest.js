"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var model_1 = require("../../src/model");
describe(".FilterDescriptor", function () {
    describe("#constructor", function () {
        it("empty constructor", function () {
            var filter = new model_1.FilterDescriptor();
            chai_1.expect(model_1.FilterCondition.AND).to.be.eq(filter.condition);
            chai_1.expect(null).to.be.eq(filter.propertyPath);
            chai_1.expect(model_1.FilterOperator.EQUAL).to.be.eq(filter.operator);
            chai_1.expect(null).to.be.eq(filter.value);
        });
        it("condition constructor", function () {
            var filter = new model_1.FilterDescriptor(model_1.FilterCondition.OR, function (s) { return s.name; }, model_1.FilterOperator.CONTAINS, "frank");
            chai_1.expect(model_1.FilterCondition.OR).to.be.eq(filter.condition);
            chai_1.expect("name").to.be.eq(filter.propertyPath);
            chai_1.expect(model_1.FilterOperator.CONTAINS).to.be.eq(filter.operator);
            chai_1.expect("frank").to.be.eq(filter.value);
        });
        it("propFn constructor", function () {
            var filter = new model_1.FilterDescriptor(function (s) { return s.name; }, model_1.FilterOperator.CONTAINS, "frank");
            chai_1.expect(model_1.FilterCondition.AND).to.be.eq(filter.condition);
            chai_1.expect("name").to.be.eq(filter.propertyPath);
            chai_1.expect(model_1.FilterOperator.CONTAINS).to.be.eq(filter.operator);
            chai_1.expect("frank").to.be.eq(filter.value);
        });
    });
});
//# sourceMappingURL=filterDescriptorTest.js.map