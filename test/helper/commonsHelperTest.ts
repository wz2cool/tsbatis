import { expect } from "chai";
import { CommonHelper } from "../../src/helper";

describe(".CommonHelper", () => {
    describe("#isNullOrUndefined", () => {
        it("should return true if value is null", () => {
            const result = CommonHelper.isNullOrUndefined(null);
            expect(true).to.be.eq(result);
        });

        it("should return true if value undefined", () => {
            // tslint:disable-next-line:prefer-const
            let testValue: string;
            const result = CommonHelper.isNullOrUndefined(testValue);
            expect(true).to.be.eq(result);
        });

        it("should return false if value has value", () => {
            const result = CommonHelper.isNullOrUndefined(1);
            expect(false).to.be.eq(result);
        });
    });

    describe("#isBlank", () => {
        it("shoud return true if null", () => {
            const result = CommonHelper.isBlank(null);
            expect(true).to.be.eq(result);
        });

        it("shoud return true if string emtpy", () => {
            const result = CommonHelper.isBlank("  ");
            expect(true).to.be.eq(result);
        });

        it("shoud return false if string value", () => {
            const result = CommonHelper.isBlank("frank");
            expect(false).to.be.eq(result);
        });
    });

    describe("#isNotBlank", () => {
        it("shoud return false if null", () => {
            const result = CommonHelper.isNotBlank(null);
            expect(false).to.be.eq(result);
        });

        it("shoud return false if string emtpy", () => {
            const result = CommonHelper.isNotBlank("  ");
            expect(false).to.be.eq(result);
        });

        it("shoud return true if string value", () => {
            const result = CommonHelper.isNotBlank("frank");
            expect(true).to.be.eq(result);
        });
    });

    describe("#isArray", () => {
        it("shoud return true if array", () => {
            const result = CommonHelper.isArray([]);
            expect(true).to.be.eq(result);
        });

        it("shoud return false if not array", () => {
            const result = CommonHelper.isArray(123);
            expect(false).to.be.eq(result);
        });
    });
});
