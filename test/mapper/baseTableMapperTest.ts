import { expect } from "chai";
import { BaseTableMapperTestHelper } from "./baseTableMapperTestHelper";

describe(".baseTableMapper", () => {

    const helper = new BaseTableMapperTestHelper();

    describe("#insert", () => {
        it("inserttWithoutAutoIncrease successfully", (done) => {
            helper.insertWithoutAutoIncreaseTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("inserttWithAutoIncrease successfully", (done) => {
            helper.insertWithAutoIncreaseTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("#insertSelective", () => {
        it("insertSelectiveWithAutoIncreaseTest successfully", (done) => {
            helper.insertSelectiveWithAutoIncreaseTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("#updateByPrimaryKey", () => {
        it("updateByPrimaryKey successfully", (done) => {
            helper.updateByPrimaryKeyTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("#updateSelectiveByPrimaryKey", () => {
        it("updateSelectiveByPrimaryKey successfully", (done) => {
            helper.updateSelectiveByPrimaryKeyTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("#selectByExample", () => {
        it("selectByExample successfully", (done) => {
            helper.selectByExmapleTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("#selectCountByExample", () => {
        it("selectCountByExample successfully", (done) => {
            helper.selectCountByExmapleTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("#selectByDynamicQuery", () => {
        it("selectByDynamicQuery successfully", (done) => {
            helper.selectByDynamicQueryTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });

    describe("#selectCountByDynamicQuery", () => {
        it("selectCountByDynamicQuery successfully", (done) => {
            helper.selectCountByDynamicQueryTest()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
