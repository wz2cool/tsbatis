import { expect } from "chai";
import { BaseTableMapperTestHelper } from "./baseTableMapperTestHelper";

describe(".baseTableMapper", () => {

    const helper = new BaseTableMapperTestHelper();

    describe("#insert", () => {
        it("show inserttWithoutAutoIncrease successfully", (done) => {
            helper.insertWithoutAutoIncreaseTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("show inserttWithAutoIncrease successfully", (done) => {
            helper.insertWithAutoIncreaseTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
