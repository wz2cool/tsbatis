import { expect } from "chai";
import { FilterHelper } from "../../src/helper";
import { ColumnInfo, FilterOperator } from "../../src/model";

describe(".FilterHelper", () => {
    describe("#processSingleFilterValue", () => {
        it("should return 1% if operator is startwith and value is 1", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.START_WITH, 1);
            expect("1%").to.be.eq(result);
        });

        it("should return % if operator is startwith and value is null", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.START_WITH, null);
            expect("%").to.be.eq(result);
        });

        it("should return %1 if operator is endwith and value is 1", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.END_WITH, 1);
            expect("%1").to.be.eq(result);
        });

        it("should return % if operator is endwith and value is null", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.END_WITH, null);
            expect("%").to.be.eq(result);
        });

        it("should return %1 if operator is endwith and value is 1", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.CONTAINS, 1);
            expect("%1%").to.be.eq(result);
        });

        it("should return %% if operator is endwith and value is null", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.CONTAINS, null);
            expect("%%").to.be.eq(result);
        });

        it("should return null if opeartor is equal and value is null", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.EQUAL, null);
            expect(null).to.be.eq(result);
        });

        it("should return value if opeartor is equal and value is not null", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.EQUAL, 1);
            expect(1).to.be.eq(result);
        });
    });

    describe("#getFilterValues", () => {
        it("shoud return array if operator is 'IN' and value is array", () => {
            const filterValues = [1, 2];
            const result = (FilterHelper as any).getFilterValues(FilterOperator.IN, filterValues);
            expect(filterValues).to.be.eq(result);
        });

        it("shoud return error if operator is 'IN' and value is 1", () => {
            function test() {
                (FilterHelper as any).getFilterValues(FilterOperator.IN, 1);
            }
            expect(test).to.throw(TypeError);
        });

        it("shoud return array if operator is 'NOT_IN' and value is array", () => {
            const filterValues = [1, 2];
            const result = (FilterHelper as any).getFilterValues(FilterOperator.NOT_IN, filterValues);
            expect(filterValues).to.be.eq(result);
        });

        it("shoud return error if operator is 'NOT_IN' and value is 1", () => {
            function test() {
                (FilterHelper as any).getFilterValues(FilterOperator.NOT_IN, 1);
            }
            expect(test).to.throw(TypeError);
        });

        it("shoud return array if operator is 'BETWEEN' and value is array", () => {
            const filterValues = [1, 2];
            const result = (FilterHelper as any).getFilterValues(FilterOperator.BETWEEN, filterValues);
            expect(filterValues).to.be.eq(result);
        });

        it("shoud return error if operator is 'BETWEEN' and value is 1", () => {
            function test() {
                (FilterHelper as any).getFilterValues(FilterOperator.BETWEEN, 1);
            }
            expect(test).to.throw(TypeError);
        });

        it("shoud return error if operator is 'BETWEEN' and value is [1,2,3]", () => {
            function test() {
                (FilterHelper as any).getFilterValues(FilterOperator.BETWEEN, [1, 2, 3]);
            }
            expect(test).to.throw(TypeError);
        });

        it("should return error if operator not 'IN', 'NOT_IN', 'BETWEEN', value is [1,2,3]", () => {
            function test() {
                (FilterHelper as any).getFilterValues(FilterOperator.EQUAL, [1, 2, 3]);
            }
            expect(test).to.throw(TypeError);
        });

        it("should return null if operator is 'EQUAL' and value is null", () => {
            const result = (FilterHelper as any).getFilterValues(FilterOperator.EQUAL, null);
            expect(null).to.be.eq(result[0]);
        });

        it("should return [1] if operator is 'EQUAL' and value is 1 ", () => {
            const result = (FilterHelper as any).getFilterValues(FilterOperator.EQUAL, 1);
            expect(1).to.be.eq(result[0]);
        });
    });

    describe("#getEqualExpression", () => {
        const opeartor = FilterOperator.EQUAL;
        const columnInfo = new ColumnInfo();
        columnInfo.columnName = "name";
        columnInfo.entity = "Student";
        columnInfo.property = "name";
        columnInfo.table = "student";
        it("expression should return expression is 'is null' if value is null", () => {
            const result = FilterHelper.getFilterExpression(opeartor, columnInfo, null);
            expect("student.name IS NULL").to.be.eq(result.sqlExpression);
        });
    });
});
