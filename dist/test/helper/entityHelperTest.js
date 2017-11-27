"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var helper_1 = require("../../src/helper");
var Student = (function () {
    function Student() {
    }
    return Student;
}());
describe(".EntityHelper", function () {
    describe("#getPropertyName", function () {
        it("should return 'name'", function () {
            var result = helper_1.EntityHelper.getPropertyName(function (s) { return s.name; });
            chai_1.expect("name").to.be.eq(result);
        });
        it("should return empty if input is null or empty", function () {
            var result = helper_1.EntityHelper.getPropertyName(null);
            chai_1.expect("").to.be.eq(result);
        });
        it("should return empty if expression is not valid", function () {
            var result = helper_1.EntityHelper.getPropertyName(function (s) { return 1; });
            chai_1.expect("").to.be.eq(result);
        });
    });
    describe("#getEntityName", function () {
        it("should return empty if input is null", function () {
            var result = helper_1.EntityHelper.getEntityName(null);
            chai_1.expect("").to.be.eq(result);
        });
        it("should return entity name by entity name", function () {
            var result = helper_1.EntityHelper.getEntityName(Student);
            chai_1.expect("Student").to.be.eq(result);
        });
        it("should return entity name by entity", function () {
            var result = helper_1.EntityHelper.getEntityName(new Student());
            chai_1.expect("Student").to.be.eq(result);
        });
    });
    describe("#createObject", function () {
        it("should return object if o is type", function () {
            var result = helper_1.EntityHelper.createObject(Student);
            chai_1.expect(true).to.be.eq(result instanceof Student);
        });
        it("should return objefct if o is example object", function () {
            var example = new Student();
            example.name = "frank";
            example.age = 20;
            var result = helper_1.EntityHelper.createObject(example);
            chai_1.expect(true).to.be.eq(helper_1.CommonHelper.isBlank(result.name));
            chai_1.expect(true).to.be.eq(helper_1.CommonHelper.isNullOrUndefined(result.age));
        });
    });
});
//# sourceMappingURL=entityHelperTest.js.map