import { expect } from "chai";
import { EntityHelper } from "../../src/helper";

describe(".EntityHelper", () => {
    describe("#getPropertyName", () => {
        class Studnet {
            public name: string;
            public age: number;
        }

        it("should return 'name'", () => {
            const result = EntityHelper.getPropertyName<Studnet>((s) => s.name);
            console.log("result:  ", result);
            expect("name").to.be.eq(result);
        });

        it("should return empty if input is null or empty", () => {
            const result = EntityHelper.getPropertyName<Studnet>(null);
            expect("").to.be.eq(result);
        });

        it("should return empty if expression is not valid", () => {
            const result = EntityHelper.getPropertyName<Studnet>((s) => 1);
            expect("").to.be.eq(result);
        });
    });
});
