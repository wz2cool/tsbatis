import { expect } from "chai";
import { SortDescriptor, SortDirection } from "../../src/model";
import { Student } from "./student";

describe(".SortDescriptor", () => {
    describe("#constructor", () => {
        it("constructor", () => {
            const sort = new SortDescriptor<Student>((o) => o.age);
            expect(SortDirection.ASC).to.be.eq(sort.direction);
            expect("name", sort.propertyPath);
        });
    });
});
