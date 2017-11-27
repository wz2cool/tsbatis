"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var model_1 = require("../../src/model");
describe(".CustomFilterDescriptor", function () {
    describe("#constructor", function () {
        it("create instance", function () {
            var filter = new model_1.CustomFilterDescriptor();
            chai_1.expect(0).to.be.eq(filter.params.length);
            chai_1.expect("").to.be.eq(filter.expression);
        });
    });
});
//# sourceMappingURL=customFilterDescriptorTest.js.map