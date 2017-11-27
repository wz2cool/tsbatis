"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../../src/model/index");
describe(".Page", function () {
    describe("#constructor", function () {
        var entities = [];
        var result = new index_1.Page(1, 20, 30, entities);
        chai_1.expect(1).to.be.eq(result.getPageNum());
        chai_1.expect(20).to.be.eq(result.getPageSize());
        chai_1.expect(30).to.be.eq(result.getTotal());
        chai_1.expect(2).to.be.eq(result.getPages());
        chai_1.expect(entities).to.be.eq(result.getEntities());
    });
});
//# sourceMappingURL=pageTest.js.map