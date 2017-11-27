"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var provider_1 = require("../../src/provider");
describe(".MappingProvider", function () {
    describe("#toPropertyValue", function () {
        it("return number value if property is number", function () {
            var value = provider_1.MappingProvider.toPropertyValue("1", typeof 1);
            chai_1.expect(1).to.be.eq(value);
        });
        it("return NaN value if property is number and value is not number", function () {
            var value = provider_1.MappingProvider.toPropertyValue("accc", typeof 1);
            chai_1.expect(true).to.be.eq(isNaN(value));
        });
        it("return true if property is boolean and value is 1", function () {
            var value = provider_1.MappingProvider.toPropertyValue("1", typeof true);
            chai_1.expect(true).to.be.eq(value);
        });
        it("return false if property is boolean and value is 0", function () {
            var value = provider_1.MappingProvider.toPropertyValue("0", typeof true);
            chai_1.expect(false).to.be.eq(value);
        });
        it("return true if property is boolean and value is true", function () {
            var value = provider_1.MappingProvider.toPropertyValue("true", typeof true);
            chai_1.expect(true).to.be.eq(value);
        });
        it("return false if property is boolean and value is false", function () {
            var value = provider_1.MappingProvider.toPropertyValue("false", typeof true);
            chai_1.expect(false).to.be.eq(value);
        });
        it("return date if property is date and value is yyyy-MM-dd", function () {
            var value = provider_1.MappingProvider.toPropertyValue("2000-10-01", "Date");
            var expectValue = new Date("2000-10-01").toLocaleDateString();
            chai_1.expect(expectValue).to.be.eq(value.toLocaleDateString());
        });
        it("throw error if property is date and value is 'abc'", function () {
            var test = function () {
                provider_1.MappingProvider.toPropertyValue("abc", "Date");
            };
            chai_1.expect(test).to.throw(TypeError);
        });
        it("return dbvalue if property type cannot be resolved", function () {
            var value = provider_1.MappingProvider.toPropertyValue("1", "custom");
            chai_1.expect("1").to.be.eq(value);
        });
    });
});
//# sourceMappingURL=mappingProviderTest.js.map