import { expect } from "chai";
import { PageRowBounds } from "../../src/index";

describe(".PageRowRound", () => {
    describe("#constructor", () => {
        it("init", () => {
            const result = new PageRowBounds(1, 20);
            expect(1).to.be.eq(result.getPageNum());
            expect(20).to.be.eq(result.getPageSize());

            const result2 = new PageRowBounds(0, 20);
            expect(1).to.be.eq(result.getPageNum());
        });
    });
});
