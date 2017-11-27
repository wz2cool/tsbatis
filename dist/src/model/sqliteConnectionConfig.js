"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseType_1 = require("./databaseType");
var SqliteConnectionConfig = (function () {
    function SqliteConnectionConfig() {
    }
    SqliteConnectionConfig.prototype.getDatabaseType = function () {
        return databaseType_1.DatabaseType.SQLITE3;
    };
    return SqliteConnectionConfig;
}());
exports.SqliteConnectionConfig = SqliteConnectionConfig;
//# sourceMappingURL=sqliteConnectionConfig.js.map