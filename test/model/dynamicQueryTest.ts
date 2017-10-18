import { expect } from "chai";
import {
    DynamicQuery,
    FilterCondition,
    FilterDescriptor,
    FilterOperator,
    SortDescriptor,
    SortDirection,
} from "../../src/model";
import { Student } from "./student";

describe(".dynanmicQuery", () => {
    describe("#addFilters", () => {
        it("add filter", () => {
            const filter =
                new FilterDescriptor<Student>(
                    (s) => s.name, FilterOperator.EQUAL, "frank");

            const query = DynamicQuery
                .createIntance<Student>()
                .addFilters(filter);

            expect(1).to.be.eq(query.filters.length);
            expect(FilterCondition.AND).to.be.eq(query.filters[0].condition);
        });
    });

    describe("#addSorts", () => {
        it("add sort", () => {
            const sort =
                new SortDescriptor<Student>((s) => s.name);

            const query = DynamicQuery
                .createIntance<Student>()
                .addSorts(sort);

            expect(1).to.be.eq(query.sorts.length);
            expect(SortDirection.ASC).to.be.eq(query.sorts[0].direction);
        });
    });
});
