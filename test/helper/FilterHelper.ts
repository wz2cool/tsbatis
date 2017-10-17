import { expect } from "chai";
import { FilterHelper } from "../../src/helper";
import { FilterOperator } from "../../src/model";

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

        it("shoud return null if opeartor is equal and value is null", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.EQUAL, null);
            expect(null).to.be.eq(result);
        });

        it("shoud return value if opeartor is equal and value is not null", () => {
            const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.EQUAL, 1);
            expect(1).to.be.eq(result);
        });
    });
});
