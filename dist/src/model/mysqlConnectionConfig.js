"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseType_1 = require("./databaseType");
var MysqlConnectionConfig = (function () {
    function MysqlConnectionConfig() {
        this.port = 3306;
    }
    MysqlConnectionConfig.prototype.getDatabaseType = function () {
        return databaseType_1.DatabaseType.MYSQL;
    };
    return MysqlConnectionConfig;
}());
exports.MysqlConnectionConfig = MysqlConnectionConfig;
//# sourceMappingURL=mysqlConnectionConfig.js.map