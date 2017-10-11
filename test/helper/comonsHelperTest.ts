import { expect } from "chai";
import { CommonsHelper } from "../../src/helper/commonsHelper";

describe(".commonsHelper", () => {
    describe("#getPropertyName", () => {
        class Studnet {
            public name: string;
            public age: number;
        }

        it("should return 'name'", () => {
            const result = CommonsHelper.getPropertyName<Studnet>((s) => s.name);
            console.log("result:  ", result);
            expect("name").to.be.eq(result);
        });

        it("should return empty if input is null or empty", () => {
            const result = CommonsHelper.getPropertyName<Studnet>(null);
            expect("").to.be.eq(result);
        });
    });
});
