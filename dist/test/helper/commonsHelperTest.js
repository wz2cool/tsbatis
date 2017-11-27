"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var helper_1 = require("../../src/helper");
describe(".CommonHelper", function () {
    describe("#isNullOrUndefined", function () {
        it("should return true if value is null", function () {
            var result = helper_1.CommonHelper.isNullOrUndefined(null);
            chai_1.expect(true).to.be.eq(result);
        });
        it("should return true if value undefined", function () {
            // tslint:disable-next-line:prefer-const
            var testValue;
            var result = helper_1.CommonHelper.isNullOrUndefined(testValue);
            chai_1.expect(true).to.be.eq(result);
        });
        it("should return false if value has value", function () {
            var result = helper_1.CommonHelper.isNullOrUndefined(1);
            chai_1.expect(false).to.be.eq(result);
        });
    });
    describe("#isBlank", function () {
        it("shoud return true if null", function () {
            var result = helper_1.CommonHelper.isBlank(null);
            chai_1.expect(true).to.be.eq(result);
        });
        it("shoud return true if string emtpy", function () {
            var result = helper_1.CommonHelper.isBlank("  ");
            chai_1.expect(true).to.be.eq(result);
        });
        it("shoud return false if string value", function () {
            var result = helper_1.CommonHelper.isBlank("frank");
            chai_1.expect(false).to.be.eq(result);
        });
    });
    describe("#isNotBlank", function () {
        it("shoud return false if null", function () {
            var result = helper_1.CommonHelper.isNotBlank(null);
            chai_1.expect(false).to.be.eq(result);
        });
        it("shoud return false if string emtpy", function () {
            var result = helper_1.CommonHelper.isNotBlank("  ");
            chai_1.expect(false).to.be.eq(result);
        });
        it("shoud return true if string value", function () {
            var result = helper_1.CommonHelper.isNotBlank("frank");
            chai_1.expect(true).to.be.eq(result);
        });
    });
    describe("#isArray", function () {
        it("shoud return true if array", function () {
            var result = helper_1.CommonHelper.isArray([]);
            chai_1.expect(true).to.be.eq(result);
        });
        it("shoud return false if not array", function () {
            var result = helper_1.CommonHelper.isArray(123);
            chai_1.expect(false).to.be.eq(result);
        });
    });
});
//# sourceMappingURL=commonsHelperTest.js.map