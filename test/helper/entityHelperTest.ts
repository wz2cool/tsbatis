import { expect } from "chai";
import { CommonHelper, EntityHelper } from "../../src/helper";

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

    describe("#createObject", () => {
        it("should return object if o is type", () => {
            const result = EntityHelper.createObject<Student>(Student);
            expect(true).to.be.eq(result instanceof Student);
        });

        it("should return objefct if o is example object", () => {
            const example = new Student();
            example.name = "frank";
            example.age = 20;
            const result = EntityHelper.createObject(example);
            expect(true).to.be.eq(CommonHelper.isBlank(result.name));
            expect(true).to.be.eq(CommonHelper.isNullOrUndefined(result.age));
        });
    });
});
