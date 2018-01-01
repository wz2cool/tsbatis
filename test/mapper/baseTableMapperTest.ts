import { expect } from "chai";
import { BaseTableMapperTestHelper } from "./baseTableMapperTestHelper";

describe(".baseTableMapper", () => {

    const helper = new BaseTableMapperTestHelper();

    describe("#insert", () => {
        it("show insert successfully", (done) => {
            helper.insertTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
