"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var keyValue_1 = require("../../src/model/keyValue");
describe(".KeyValue", function () {
    describe("#constructor", function () {
        it("init", function () {
            var result = new keyValue_1.KeyValue("1", "2");
            chai_1.expect("1").to.be.eq(result.getKey());
            chai_1.expect("2").to.be.eq(result.getValue());
        });
    });
});
//# sourceMappingURL=keyValueTest.js.map