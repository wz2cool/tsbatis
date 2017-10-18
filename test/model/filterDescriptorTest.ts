import { expect } from "chai";
import { FilterCondition, FilterDescriptor, FilterOperator } from "../../src/model";
import { Student } from "./student";

describe(".FilterDescriptor", () => {
    describe("#constructor", () => {
        it("empty constructor", () => {
            const filter = new FilterDescriptor();
            expect(FilterCondition.AND).to.be.eq(filter.condition);
            expect(null).to.be.eq(filter.propertyPath);
            expect(FilterOperator.EQUAL).to.be.eq(filter.operator);
            expect(null).to.be.eq(filter.value);
        });

        it("condition constructor", () => {
            const filter = new FilterDescriptor<Student>(
                FilterCondition.OR, (s) => s.name, FilterOperator.CONTAINS, "frank");
            expect(FilterCondition.OR).to.be.eq(filter.condition);
            expect("name").to.be.eq(filter.propertyPath);
            expect(FilterOperator.CONTAINS).to.be.eq(filter.operator);
            expect("frank").to.be.eq(filter.value);
        });

        it("propFn constructor", () => {
            const filter = new FilterDescriptor<Student>(
                (s) => s.name, FilterOperator.CONTAINS, "frank");
            expect(FilterCondition.AND).to.be.eq(filter.condition);
            expect("name").to.be.eq(filter.propertyPath);
            expect(FilterOperator.CONTAINS).to.be.eq(filter.operator);
            expect("frank").to.be.eq(filter.value);
        });
    });
});
