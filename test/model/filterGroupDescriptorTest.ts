import { expect } from "chai";
import { FilterCondition, FilterGroupDescriptor } from "../../src/model";
import { Student } from "./student";

describe(".FilterGroupDescriptor", () => {
    describe("#constructor", () => {
        it("constructor", () => {
            const sort = new FilterGroupDescriptor();
            expect(0).to.be.eq(sort.filters.length);
            expect(FilterCondition.AND).to.be.eq(sort.condition);
        });
    });
});
