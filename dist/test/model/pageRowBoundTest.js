"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../../src/index");
describe(".PageRowRound", function () {
    describe("#constructor", function () {
        it("init", function () {
            var result = new index_1.PageRowBounds(1, 20);
            chai_1.expect(1).to.be.eq(result.getPageNum());
            chai_1.expect(20).to.be.eq(result.getPageSize());
            var result2 = new index_1.PageRowBounds(0, 20);
            chai_1.expect(1).to.be.eq(result.getPageNum());
        });
    });
});
//# sourceMappingURL=pageRowBoundTest.js.map