"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var model_1 = require("../../src/model");
describe(".FilterGroupDescriptor", function () {
    describe("#constructor", function () {
        it("constructor", function () {
            var sort = new model_1.FilterGroupDescriptor();
            chai_1.expect(0).to.be.eq(sort.filters.length);
            chai_1.expect(model_1.FilterCondition.AND).to.be.eq(sort.condition);
        });
    });
});
//# sourceMappingURL=filterGroupDescriptorTest.js.map