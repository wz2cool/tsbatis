"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var sqliteConnectionPool_1 = require("../../src/connection/sqliteConnectionPool");
var index_1 = require("../../src/model/index");
describe(".SqliteConnectionPool", function () {
    describe("#constructor", function () {
        it("init", function (done) {
            var filepath = path.join(__dirname, "../../", "test", "northwind.db");
            var config = new index_1.SqliteConnectionConfig();
            config.filepath = filepath;
            var pool = new sqliteConnectionPool_1.SqliteConnectionPool(config, true);
            pool.getConnection()
                .then(function (conn) {
                done();
            })
                .catch(function (err) {
                done(err);
            });
        });
        it("should return err if filepath is null", function (done) {
            var config = new index_1.SqliteConnectionConfig();
            config.filepath = null;
            var pool = new sqliteConnectionPool_1.SqliteConnectionPool(config, true);
            pool.getConnection()
                .then(function (conn) {
                done("should have error");
            })
                .catch(function (err) {
                done();
            });
        });
    });
});
//# sourceMappingURL=sqliteConnectionPoolTest.js.map