import { expect } from "chai";
import * as path from "path";
import { MysqlConnection, SqliteConnection } from "../../src/connection";
import { DatabaseType, SqliteConnectionConfig } from "../../src/model";
import { RowBounds } from "../../src/model/rowBounds";
import { Customer } from "../db/entity/customer";
import { SqliteConnectionTestHelper } from "./sqliteConnectionTestHelper";

describe(".mysqlConnection", () => {
    describe("#getDataBaseType", () => {
        it("should return mysql", () => {
            const sqliteConnection = new SqliteConnection(null);
            const result = sqliteConnection.getDataBaseType();
            expect(DatabaseType.MYSQL).to.be.eq(result);
        });
    });

    describe("#getRowBoundsExpression", () => {
        it("should return `limit 20, 10` if rowbounds.offset is 20, rowbounds.limit 10", () => {
            const sqliteConnection = new SqliteConnection(null);
            const rowbounds = new RowBounds(20, 10);
            const result = sqliteConnection.getRowBoundsExpression(rowbounds);
            expect("limit 20, 10").to.be.eq(result);
        });
    });

    describe("#run", () => {
        const filepath = path.join(__dirname, "../../", "test", "northwind.db");
        const mysqlConnection = new SqliteConnection(filepath, true);
        it("should run if valid sql", (done) => {
            mysqlConnection.run("SELECT 1", [])
                .then((data) => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("should has error if invalid sql", (done) => {
            mysqlConnection.run("invalid sql", [])
                .then((data) => {
                    done("should have error if sql is invalid");
                })
                .catch((err) => {
                    done();
                });
        });
    });

    describe("#select", () => {
        const filepath = path.join(__dirname, "../../", "test", "northwind.db");
        const mysqlConnection = new SqliteConnection(filepath, true);
        it("should run if valid sql", (done) => {
            mysqlConnection.select("SELECT 1", [])
                .then((data) => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("should has error if invalid sql", (done) => {
            mysqlConnection.select("invalid sql", [])
                .then((data) => {
                    done("should have error if sql is invalid");
                })
                .catch((err) => {
                    done();
                });
        });
    });

    describe("#selectCount", () => {
        const filepath = path.join(__dirname, "../../", "test", "northwind.db");
        const mysqlConnection = new SqliteConnection(filepath, true);
        it("should run if valid sql", (done) => {
            mysqlConnection.selectCount("SELECT 1", [])
                .then((data) => {
                    if (data === 1) {
                        done();
                    } else {
                        done("count should be 1");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("should has error if invalid sql", (done) => {
            mysqlConnection.selectCount("invalid sql", [])
                .then((data) => {
                    done("should have error if sql is invalid");
                })
                .catch((err) => {
                    done();
                });
        });
    });

    describe("#selectEntities", () => {
        const filepath = path.join(__dirname, "../../", "test", "northwind.db");
        const mysqlConnection = new SqliteConnection(filepath, true);
        it("should run if valid sql", (done) => {
            mysqlConnection.selectEntities<Customer>(Customer, "SELECT * FROM Customer", [])
                .then((data) => {
                    if (data.length > 0) {
                        done();
                    } else {
                        done("the count of Customer should greater than 0");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("should has error if invalid sql", (done) => {
            mysqlConnection.selectEntities<Customer>(Customer, "invalid sql", [])
                .then((data) => {
                    done("should have error if sql is invalid");
                })
                .catch((err) => {
                    done();
                });
        });
    });

    describe("#transaction", () => {
        const testHelper = new SqliteConnectionTestHelper();
        it("insert", (done) => {
            testHelper.testTransactionInsert()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("insertThenRollback", (done) => {
            testHelper.testTransactionInsertThenRollback()
                .then(() => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
