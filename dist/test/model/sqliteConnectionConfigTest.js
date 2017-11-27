"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var src_1 = require("../../src");
describe(".SqliteConnectionConfig", function () {
    describe("#getDatabaseType", function () {
        it("should getDatabaseType", function () {
            var config = new src_1.SqliteConnectionConfig();
            var result = config.getDatabaseType();
            var expectValue = src_1.DatabaseType.SQLITE3;
            chai_1.expect(expectValue).to.be.eq(result);
        });
    });
});
//# sourceMappingURL=sqliteConnectionConfigTest.js.map