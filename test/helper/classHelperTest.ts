import { expect } from "chai";
import { ClassHelper } from "../../src/helper";

describe(".ClassHelper", () => {
    describe("#getPropertyName", () => {
        class Studnet {
            public name: string;
            public age: number;
        }

        it("should return 'name'", () => {
            const result = ClassHelper.getPropertyName<Studnet>((s) => s.name);
            console.log("result:  ", result);
            expect("name").to.be.eq(result);
        });

        it("should return empty if input is null or empty", () => {
            const result = ClassHelper.getPropertyName<Studnet>(null);
            expect("").to.be.eq(result);
        });
    });
});
