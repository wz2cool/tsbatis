"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path = require("path");
var connection_1 = require("../../src/connection");
var model_1 = require("../../src/model");
var rowBounds_1 = require("../../src/model/rowBounds");
var customer_1 = require("../db/entity/customer");
var sqliteConnectionTestHelper_1 = require("./sqliteConnectionTestHelper");
describe(".SqliteConnection", function () {
    describe("#getDataBaseType", function () {
        it("should return sqlite", function () {
            var filepath = path.join(__dirname, "../../", "test", "northwind.db");
            var sqliteConnection = new connection_1.SqliteConnection(filepath);
            var result = sqliteConnection.getDataBaseType();
            chai_1.expect(model_1.DatabaseType.SQLITE3).to.be.eq(result);
        });
    });
    describe("#getRowBoundsExpression", function () {
        it("should return `limit 20, 10` if rowbounds.offset is 20, rowbounds.limit 10", function () {
            var filepath = path.join(__dirname, "../../", "test", "northwind.db");
            var sqliteConnection = new connection_1.SqliteConnection(filepath);
            var rowbounds = new rowBounds_1.RowBounds(20, 10);
            var result = sqliteConnection.getRowBoundsExpression(rowbounds);
            chai_1.expect("limit 20, 10").to.be.eq(result);
        });
    });
    describe("#run", function () {
        var filepath = path.join(__dirname, "../../", "test", "northwind.db");
        var mysqlConnection = new connection_1.SqliteConnection(filepath, true);
        it("should run if valid sql", function (done) {
            mysqlConnection.run("SELECT 1", [])
                .then(function (data) {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it("should has error if invalid sql", function (done) {
            mysqlConnection.run("invalid sql", [])
                .then(function (data) {
                done("should have error if sql is invalid");
            })
                .catch(function (err) {
                done();
            });
        });
    });
    describe("#select", function () {
        var filepath = path.join(__dirname, "../../", "test", "northwind.db");
        var mysqlConnection = new connection_1.SqliteConnection(filepath, true);
        it("should run if valid sql", function (done) {
            mysqlConnection.select("SELECT 1", [])
                .then(function (data) {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it("should has error if invalid sql", function (done) {
            mysqlConnection.select("invalid sql", [])
                .then(function (data) {
                done("should have error if sql is invalid");
            })
                .catch(function (err) {
                done();
            });
        });
    });
    describe("#selectCount", function () {
        var filepath = path.join(__dirname, "../../", "test", "northwind.db");
        var mysqlConnection = new connection_1.SqliteConnection(filepath, true);
        it("should run if valid sql", function (done) {
            mysqlConnection.selectCount("SELECT 1", [])
                .then(function (data) {
                if (data === 1) {
                    done();
                }
                else {
                    done("count should be 1");
                }
            })
                .catch(function (err) {
                done(err);
            });
        });
        it("should has error if invalid sql", function (done) {
            mysqlConnection.selectCount("invalid sql", [])
                .then(function (data) {
                done("should have error if sql is invalid");
            })
                .catch(function (err) {
                done();
            });
        });
    });
    describe("#selectEntities", function () {
        var filepath = path.join(__dirname, "../../", "test", "northwind.db");
        var mysqlConnection = new connection_1.SqliteConnection(filepath, true);
        it("should run if valid sql", function (done) {
            mysqlConnection.selectEntities(customer_1.Customer, "SELECT * FROM Customer", [])
                .then(function (data) {
                if (data.length > 0) {
                    done();
                }
                else {
                    done("the count of Customer should greater than 0");
                }
            })
                .catch(function (err) {
                done(err);
            });
        });
        it("should has error if invalid sql", function (done) {
            mysqlConnection.selectEntities(customer_1.Customer, "invalid sql", [])
                .then(function (data) {
                done("should have error if sql is invalid");
            })
                .catch(function (err) {
                done();
            });
        });
    });
    describe("#transaction", function () {
        var testHelper = new sqliteConnectionTestHelper_1.SqliteConnectionTestHelper();
        it("insert", function (done) {
            testHelper.testTransactionInsert()
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it("insertThenRollback", function (done) {
            testHelper.testTransactionInsertThenRollback()
                .then(function () {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
    });
});
//# sourceMappingURL=sqliteConnectionTest.js.map