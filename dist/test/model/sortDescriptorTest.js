"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var model_1 = require("../../src/model");
describe(".SortDescriptor", function () {
    describe("#constructor", function () {
        it("constructor", function () {
            var sort = new model_1.SortDescriptor(function (o) { return o.age; });
            chai_1.expect(model_1.SortDirection.ASC).to.be.eq(sort.direction);
            chai_1.expect("age").to.be.eq(sort.propertyPath);
        });
    });
});
//# sourceMappingURL=sortDescriptorTest.js.map