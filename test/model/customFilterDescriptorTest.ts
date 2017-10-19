import { expect } from "chai";
import { EntityCache } from "../../src/cache";
import { column } from "../../src/decorator";
import { CustomFilterDescriptor } from "../../src/model";

describe(".CustomFilterDescriptor", () => {
    describe("#constructor", () => {
        it("create instance", () => {
            const filter = new CustomFilterDescriptor();
            expect(0).to.be.eq(filter.params.length);
            expect("").to.be.eq(filter.expression);
        });
    });
});
