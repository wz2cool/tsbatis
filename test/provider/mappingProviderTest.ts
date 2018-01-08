import { expect } from "chai";
import { column, dtoField, DtoObject, MappingProvider } from "../../src";

describe(".MappingProvider", () => {
    describe("#toPropertyValue", () => {
        it("return number value if property is number", () => {
            const value = (MappingProvider as any).toPropertyValue("1", typeof 1);
            expect(1).to.be.eq(value);
        });

        it("return NaN value if property is number and value is not number", () => {
            const value = (MappingProvider as any).toPropertyValue("accc", typeof 1);
            expect(true).to.be.eq(isNaN(value));
        });

        it("return true if property is boolean and value is 1", () => {
            const value = (MappingProvider as any).toPropertyValue("1", typeof true);
            expect(true).to.be.eq(value);
        });

        it("return false if property is boolean and value is 0", () => {
            const value = (MappingProvider as any).toPropertyValue("0", typeof true);
            expect(false).to.be.eq(value);
        });

        it("return true if property is boolean and value is true", () => {
            const value = (MappingProvider as any).toPropertyValue("true", typeof true);
            expect(true).to.be.eq(value);
        });

        it("return false if property is boolean and value is false", () => {
            const value = (MappingProvider as any).toPropertyValue("false", typeof true);
            expect(false).to.be.eq(value);
        });

        it("return date if property is date and value is yyyy-MM-dd", () => {
            const value = (MappingProvider as any).toPropertyValue("2000-10-01", "Date");
            const expectValue = new Date("2000-10-01").toLocaleDateString();
            expect(expectValue).to.be.eq(value.toLocaleDateString());
        });

        it("throw error if property is date and value is 'abc'", () => {
            const test = () => {
                (MappingProvider as any).toPropertyValue("abc", "Date");
            };
            expect(test).to.throw(TypeError);
        });

        it("return dbvalue if property type cannot be resolved", () => {
            const value = (MappingProvider as any).toPropertyValue("1", "custom");
            expect("1").to.be.eq(value);
        });
    });

    describe("#toDtoObject", () => {
        class DtoTestClass extends DtoObject {
            @dtoField("name1")
            public name: string;
            @dtoField()
            public age: string;
        }

        it("should work", () => {
            const jsonObj: any = {};
            jsonObj.name1 = "frank";
            jsonObj.age = 20;

            const result = MappingProvider.toDtoObject<DtoTestClass>(DtoTestClass, jsonObj);
            expect("frank").to.be.eq(result.name);
            expect("20").to.be.eq(result.age);
        });
    });
});
