"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../../src/index");
var index_2 = require("../../src/model/index");
describe(".MysqlConnectionConfig", function () {
    describe("#constructor", function () {
        it("init", function () {
            var result = new index_2.MysqlConnectionConfig();
            chai_1.expect(3306).to.be.eq(result.port);
            chai_1.expect(index_1.DatabaseType.MYSQL).to.be.eq(result.getDatabaseType());
        });
    });
});
//# sourceMappingURL=mysqlConnectionConfigTest.js.map