"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("../helper");
var mysqlConnection_1 = require("./mysqlConnection");
var MysqlConnectionPool = /** @class */ (function () {
    function MysqlConnectionPool(config, enableLog) {
        this.enableLog = enableLog;
        var mysql = this.getDriver();
        this.pool = mysql.createPool({
            host: config.host,
            port: config.port,
            database: config.database,
            user: config.user,
            password: config.password,
        });
    }
    MysqlConnectionPool.prototype.getConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pool.getConnection(function (err, sqlConn) {
                if (helper_1.CommonHelper.isNullOrUndefined(err)) {
                    var result = new mysqlConnection_1.MysqlConnection(sqlConn, _this.enableLog);
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    MysqlConnectionPool.prototype.getDriver = function () {
        // tslint:disable-next-line:no-implicit-dependencies
        return require("mysql");
    };
    return MysqlConnectionPool;
}());
exports.MysqlConnectionPool = MysqlConnectionPool;
//# sourceMappingURL=mysqlConnectionPool.js.map