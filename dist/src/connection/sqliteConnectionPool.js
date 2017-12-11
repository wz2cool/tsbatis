"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqliteConnection_1 = require("./sqliteConnection");
var SqliteConnectionPool = /** @class */ (function () {
    function SqliteConnectionPool(config, enableLog) {
        if (enableLog === void 0) { enableLog = false; }
        this.config = config;
        this.enableLog = enableLog;
    }
    SqliteConnectionPool.prototype.getConnection = function () {
        try {
            var conn_1 = new sqliteConnection_1.SqliteConnection(this.config.filepath, this.enableLog);
            return new Promise(function (resolve, reject) { return resolve(conn_1); });
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    return SqliteConnectionPool;
}());
exports.SqliteConnectionPool = SqliteConnectionPool;
//# sourceMappingURL=sqliteConnectionPool.js.map