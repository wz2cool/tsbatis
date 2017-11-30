"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("../model");
var mysqlConnectionPool_1 = require("./mysqlConnectionPool");
var sqliteConnectionPool_1 = require("./sqliteConnectionPool");
var ConnectionFactory = /** @class */ (function () {
    function ConnectionFactory(config, enableLog) {
        if (enableLog === void 0) { enableLog = false; }
        if (config instanceof model_1.MysqlConnectionConfig) {
            this.pool = new mysqlConnectionPool_1.MysqlConnectionPool(config, enableLog);
        }
        else if (config instanceof model_1.SqliteConnectionConfig) {
            this.pool = new sqliteConnectionPool_1.SqliteConnectionPool(config, enableLog);
        }
        else {
            throw new Error("don't support " + config.getDatabaseType());
        }
    }
    ConnectionFactory.prototype.getConnection = function () {
        return this.pool.getConnection();
    };
    return ConnectionFactory;
}());
exports.ConnectionFactory = ConnectionFactory;
//# sourceMappingURL=connectionFactory.js.map