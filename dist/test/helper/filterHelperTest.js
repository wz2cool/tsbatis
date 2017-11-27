"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var helper_1 = require("../../src/helper");
var model_1 = require("../../src/model");
describe(".FilterHelper", function () {
    describe("#processSingleFilterValue", function () {
        it("should return 1% if operator is startwith and value is 1", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.START_WITH, 1);
            chai_1.expect("1%").to.be.eq(result);
        });
        it("should return % if operator is startwith and value is null", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.START_WITH, null);
            chai_1.expect("%").to.be.eq(result);
        });
        it("should return %1 if operator is endwith and value is 1", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.END_WITH, 1);
            chai_1.expect("%1").to.be.eq(result);
        });
        it("should return % if operator is endwith and value is null", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.END_WITH, null);
            chai_1.expect("%").to.be.eq(result);
        });
        it("should return %1 if operator is endwith and value is 1", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.CONTAINS, 1);
            chai_1.expect("%1%").to.be.eq(result);
        });
        it("should return %% if operator is endwith and value is null", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.CONTAINS, null);
            chai_1.expect("%%").to.be.eq(result);
        });
        it("should return null if opeartor is equal and value is null", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.EQUAL, null);
            chai_1.expect(null).to.be.eq(result);
        });
        it("should return value if opeartor is equal and value is not null", function () {
            var result = helper_1.FilterHelper.processSingleFilterValue(model_1.FilterOperator.EQUAL, 1);
            chai_1.expect(1).to.be.eq(result);
        });
    });
    describe("#getFilterValues", function () {
        it("shoud return array if operator is 'IN' and value is array", function () {
            var filterValues = [1, 2];
            var result = helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.IN, filterValues);
            chai_1.expect(filterValues).to.be.eq(result);
        });
        it("shoud return error if operator is 'IN' and value is 1", function () {
            function test() {
                helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.IN, 1);
            }
            chai_1.expect(test).to.throw(TypeError);
        });
        it("shoud return array if operator is 'NOT_IN' and value is array", function () {
            var filterValues = [1, 2];
            var result = helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.NOT_IN, filterValues);
            chai_1.expect(filterValues).to.be.eq(result);
        });
        it("shoud return error if operator is 'NOT_IN' and value is 1", function () {
            function test() {
                helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.NOT_IN, 1);
            }
            chai_1.expect(test).to.throw(TypeError);
        });
        it("shoud return array if operator is 'BETWEEN' and value is array", function () {
            var filterValues = [1, 2];
            var result = helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.BETWEEN, filterValues);
            chai_1.expect(filterValues).to.be.eq(result);
        });
        it("shoud return error if operator is 'BETWEEN' and value is 1", function () {
            function test() {
                helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.BETWEEN, 1);
            }
            chai_1.expect(test).to.throw(TypeError);
        });
        it("shoud return error if operator is 'BETWEEN' and value is [1,2,3]", function () {
            function test() {
                helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.BETWEEN, [1, 2, 3]);
            }
            chai_1.expect(test).to.throw(TypeError);
        });
        it("should return error if operator not 'IN', 'NOT_IN', 'BETWEEN', value is [1,2,3]", function () {
            function test() {
                helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.EQUAL, [1, 2, 3]);
            }
            chai_1.expect(test).to.throw(TypeError);
        });
        it("should return null if operator is 'EQUAL' and value is null", function () {
            var result = helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.EQUAL, null);
            chai_1.expect(null).to.be.eq(result[0]);
        });
        it("should return [1] if operator is 'EQUAL' and value is 1 ", function () {
            var result = helper_1.FilterHelper.getFilterValues(model_1.FilterOperator.EQUAL, 1);
            chai_1.expect(1).to.be.eq(result[0]);
        });
    });
    describe("#getEqualExpression", function () {
        var opeartor = model_1.FilterOperator.EQUAL;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "name";
        columnInfo.entity = "Student";
        columnInfo.property = "name";
        columnInfo.table = "student";
        it("expression should return 'is null' if value is null", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, null);
            chai_1.expect("student.name IS NULL").to.be.eq(result.sqlExpression);
        });
        it("expression should return '[column] = ?' if value is null", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, "frank");
            chai_1.expect("student.name = ?").to.be.eq(result.sqlExpression);
            chai_1.expect("frank").to.be.eq(result.params[0]);
        });
    });
    describe("#getNotEqualExpression", function () {
        var opeartor = model_1.FilterOperator.NOT_EQUAL;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "name";
        columnInfo.entity = "Student";
        columnInfo.property = "name";
        columnInfo.table = "student";
        it("expression should return 'IS NOT NULL' if value is null", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, null);
            chai_1.expect("student.name IS NOT NULL").to.be.eq(result.sqlExpression);
        });
        it("expression should return '[column] <> ?' if value is null", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, "frank");
            chai_1.expect("student.name <> ?").to.be.eq(result.sqlExpression);
            chai_1.expect("frank").to.be.eq(result.params[0]);
        });
    });
    describe("#getLessThanExpression", function () {
        var opeartor = model_1.FilterOperator.LESS_THAN;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "age";
        columnInfo.entity = "Student";
        columnInfo.property = "age";
        columnInfo.table = "student";
        it("expression should return '[column] < ?'", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
            chai_1.expect("student.age < ?").to.be.eq(result.sqlExpression);
            chai_1.expect(30).to.be.eq(result.params[0]);
        });
    });
    describe("#getLessThanOrEqualExpression", function () {
        var opeartor = model_1.FilterOperator.LESS_THAN_OR_EQUAL;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "age";
        columnInfo.entity = "Student";
        columnInfo.property = "age";
        columnInfo.table = "student";
        it("expression should return '[column] <= ?'", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
            chai_1.expect("student.age <= ?").to.be.eq(result.sqlExpression);
            chai_1.expect(30).to.be.eq(result.params[0]);
        });
    });
    describe("#getGreaterThanOrEqualExpression", function () {
        var opeartor = model_1.FilterOperator.GREATER_THAN_OR_EQUAL;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "age";
        columnInfo.entity = "Student";
        columnInfo.property = "age";
        columnInfo.table = "student";
        it("expression should return '[column] >= ?'", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
            chai_1.expect("student.age >= ?").to.be.eq(result.sqlExpression);
            chai_1.expect(30).to.be.eq(result.params[0]);
        });
    });
    describe("#getGreaterThanExpression", function () {
        var opeartor = model_1.FilterOperator.GREATER_THAN;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "age";
        columnInfo.entity = "Student";
        columnInfo.property = "age";
        columnInfo.table = "student";
        it("expression should return '[column] > ?'", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
            chai_1.expect("student.age > ?").to.be.eq(result.sqlExpression);
            chai_1.expect(30).to.be.eq(result.params[0]);
        });
    });
    describe("#getLikeExpression", function () {
        var opeartor = model_1.FilterOperator.START_WITH;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "name";
        columnInfo.entity = "Student";
        columnInfo.property = "name";
        columnInfo.table = "student";
        it("expression should return '[column] > ?'", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, "fra");
            chai_1.expect("student.name LIKE ?").to.be.eq(result.sqlExpression);
            chai_1.expect("fra%").to.be.eq(result.params[0]);
        });
    });
    describe("#getInExpression", function () {
        var opeartor = model_1.FilterOperator.IN;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "age";
        columnInfo.entity = "Student";
        columnInfo.property = "age";
        columnInfo.table = "student";
        it("expression should return '[column] IN (?, ?, ?)' if array is not empty.", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, [10, 20, 30]);
            chai_1.expect("student.age IN (?, ?, ?)").to.be.eq(result.sqlExpression);
            chai_1.expect(10).to.be.eq(result.params[0]);
            chai_1.expect(20).to.be.eq(result.params[1]);
            chai_1.expect(30).to.be.eq(result.params[2]);
        });
        it("expression should return empty if array is empty.", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, []);
            chai_1.expect("").to.be.eq(result.sqlExpression);
            chai_1.expect(0).to.be.eq(result.params.length);
        });
    });
    describe("#getNotInExpression", function () {
        var opeartor = model_1.FilterOperator.NOT_IN;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "age";
        columnInfo.entity = "Student";
        columnInfo.property = "age";
        columnInfo.table = "student";
        it("expression should return '[column] NOT IN (?, ?, ?)' if array is not empty.", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, [10, 20, 30]);
            chai_1.expect("student.age NOT IN (?, ?, ?)").to.be.eq(result.sqlExpression);
            chai_1.expect(10).to.be.eq(result.params[0]);
            chai_1.expect(20).to.be.eq(result.params[1]);
            chai_1.expect(30).to.be.eq(result.params[2]);
        });
        it("expression should return empty if array is empty.", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, []);
            chai_1.expect("").to.be.eq(result.sqlExpression);
            chai_1.expect(0).to.be.eq(result.params.length);
        });
    });
    describe("#getBetweenExpression", function () {
        var opeartor = model_1.FilterOperator.BETWEEN;
        var columnInfo = new model_1.ColumnInfo();
        columnInfo.columnName = "age";
        columnInfo.entity = "Student";
        columnInfo.property = "age";
        columnInfo.table = "student";
        it("expression should return '[column] BETWEEN ? AND ?' if array is not empty.", function () {
            var result = helper_1.FilterHelper.getFilterExpression(opeartor, columnInfo, [10, 20]);
            chai_1.expect("student.age BETWEEN ? AND ?").to.be.eq(result.sqlExpression);
            chai_1.expect(10).to.be.eq(result.params[0]);
            chai_1.expect(20).to.be.eq(result.params[1]);
        });
    });
});
//# sourceMappingURL=filterHelperTest.js.map