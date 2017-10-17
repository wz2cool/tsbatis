import { expect } from "chai";
import { EntityHelper } from "../../src/helper";

class Student {
    public name: string;
    public age: number;
}

describe(".EntityHelper", () => {
    describe("#getPropertyName", () => {
        it("should return 'name'", () => {
            const result = EntityHelper.getPropertyName<Student>((s) => s.name);
            expect("name").to.be.eq(result);
        });

        it("should return empty if input is null or empty", () => {
            const result = EntityHelper.getPropertyName<Student>(null);
            expect("").to.be.eq(result);
        });

        it("should return empty if expression is not valid", () => {
            const result = EntityHelper.getPropertyName<Student>((s) => 1);
            expect("").to.be.eq(result);
        });
    });

    describe("#getEntityName", () => {
        it("should return empty if input is null", () => {
            const result = EntityHelper.getEntityName<Student>(null);
            expect("").to.be.eq(result);
        });

        it("should return entity name by entity name", () => {
            const result = EntityHelper.getEntityName<Student>(Student);
            expect("Student").to.be.eq(result);
        });

        it("should return entity name by entity", () => {
            const result = EntityHelper.getEntityName<Student>(new Student());
            expect("Student").to.be.eq(result);
        });
    });
});
