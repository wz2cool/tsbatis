"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash = require("lodash");
var helper_1 = require("../helper");
var model_1 = require("../model");
var provider_1 = require("../provider");
// https://github.com/mapbox/node-sqlite3/issues/304
// create new db if start a transaction.
var SqliteConnection = /** @class */ (function () {
    function SqliteConnection(filepath, enableLog) {
        if (enableLog === void 0) { enableLog = false; }
        this.enableLog = enableLog;
        var sqlite = this.getDriver();
        this.db = new sqlite.Database(filepath);
    }
    SqliteConnection.prototype.getDataBaseType = function () {
        return model_1.DatabaseType.SQLITE3;
    };
    SqliteConnection.prototype.getRowBoundsExpression = function (rowBounds) {
        var offset = rowBounds.offset;
        var limit = rowBounds.limit;
        return "limit " + offset + ", " + limit;
    };
    SqliteConnection.prototype.run = function (sql, params) {
        var _this = this;
        this.log("run:\r\nsql: " + sql + "\r\nparams: " + params);
        return new Promise(function (resolve, reject) {
            _this.db.run(sql, params, function (err, row) {
                if (helper_1.CommonHelper.isNullOrUndefined(err)) {
                    resolve(row);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    SqliteConnection.prototype.select = function (sql, params) {
        var _this = this;
        this.log("select:\r\nsql: " + sql + "\r\nparams: " + params);
        return new Promise(function (resolve, reject) {
            _this.db.all(sql, params, function (err, result) {
                if (helper_1.CommonHelper.isNullOrUndefined(err)) {
                    resolve(result);
                }
                else {
                    reject(err);
                }
            });
        });
    };
    SqliteConnection.prototype.selectCount = function (sql, params) {
        var _this = this;
        this.log("selectCount:\r\nsql: " + sql + "\r\nparams: " + params);
        return new Promise(function (resolve, reject) {
            _this.db.all(sql, params, function (err, result) {
                try {
                    if (helper_1.CommonHelper.isNullOrUndefined(err)) {
                        var count = lodash.values(result[0])[0];
                        resolve(count);
                    }
                    else {
                        reject(err);
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    };
    SqliteConnection.prototype.selectEntities = function (entityClass, sql, params) {
        var _this = this;
        this.log("selectEntities:\r\nsql: " + sql + "\r\nparams: " + params);
        return new Promise(function (resolve, reject) {
            _this.db.all(sql, params, function (err, result) {
                try {
                    if (helper_1.CommonHelper.isNullOrUndefined(err)) {
                        var entities = provider_1.MappingProvider.toEntities(entityClass, result, true);
                        resolve(entities);
                    }
                    else {
                        reject(err);
                    }
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    };
    SqliteConnection.prototype.beginTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.log("beginTransaction...");
                        return [4 /*yield*/, this.serialize()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.exec("BEGIN TRANSACTION")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(); })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_1); })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SqliteConnection.prototype.rollback = function () {
        this.log("rollback...");
        return this.exec("ROLLBACK");
    };
    SqliteConnection.prototype.commit = function () {
        this.log("commit...");
        return this.exec("COMMIT");
    };
    SqliteConnection.prototype.release = function () {
        var _this = this;
        this.log("release...");
        return new Promise(function (resolve, reject) {
            _this.db.close(function (err) {
                if (helper_1.CommonHelper.isNullOrUndefined(err)) {
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    };
    SqliteConnection.prototype.serialize = function () {
        var _this = this;
        this.log("serialize...");
        return new Promise(function (resolve, reject) {
            _this.db.serialize(function () { return resolve(); });
        });
    };
    SqliteConnection.prototype.exec = function (sql) {
        var _this = this;
        this.log("exec:\r\nsql: " + sql);
        return new Promise(function (resolve, reject) {
            _this.db.exec(sql, function (err) {
                if (helper_1.CommonHelper.isNullOrUndefined(err)) {
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    };
    SqliteConnection.prototype.getDriver = function () {
        // tslint:disable-next-line:no-implicit-dependencies
        return require("sqlite3");
    };
    SqliteConnection.prototype.log = function (log) {
        if (!helper_1.CommonHelper.isNullOrUndefined(this.enableLog)
            && this.enableLog) {
            console.log("[TSBATIS] " + log);
        }
    };
    return SqliteConnection;
}());
exports.SqliteConnection = SqliteConnection;
//# sourceMappingURL=sqliteConnection.js.map