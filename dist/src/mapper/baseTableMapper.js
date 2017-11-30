"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var helper_1 = require("../helper");
var model_1 = require("../model");
var provider_1 = require("../provider");
var baseMybatisMapper_1 = require("./baseMybatisMapper");
var BaseTableMapper = /** @class */ (function (_super) {
    __extends(BaseTableMapper, _super);
    function BaseTableMapper(sqlConnection) {
        return _super.call(this, sqlConnection) || this;
    }
    BaseTableMapper.prototype.insert = function (o) {
        return this.insertInternal(o, false);
    };
    BaseTableMapper.prototype.insertSelective = function (o) {
        return this.insertInternal(o, true);
    };
    BaseTableMapper.prototype.updateByPrimaryKey = function (o) {
        return this.updateByPrimaryKeyInternal(o, false);
    };
    BaseTableMapper.prototype.updateByPrimaryKeySelective = function (o) {
        return this.updateByPrimaryKeyInternal(o, true);
    };
    BaseTableMapper.prototype.selectByExample = function (example, relations) {
        if (relations === void 0) { relations = []; }
        try {
            var sqlParam = provider_1.SqlTemplateProvider.getSelect(example);
            var entityClass = helper_1.EntityHelper.getEntityClass(example);
            return _super.prototype.selectEntities.call(this, sqlParam.sqlExpression, sqlParam.params, relations);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.selectByPrimaryKey = function (key, relations) {
        if (relations === void 0) { relations = []; }
        try {
            var entityClass = this.getEntityClass();
            var sqlParam = provider_1.SqlTemplateProvider.getSelectByPk(entityClass, key);
            return _super.prototype.selectEntities.call(this, sqlParam.sqlExpression, sqlParam.params, relations);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.selectByDynamicQuery = function (query, relations) {
        if (relations === void 0) { relations = []; }
        try {
            var entityClass = this.getEntityClass();
            var sqlParam = provider_1.SqlTemplateProvider.getSelectByDynamicQuery(entityClass, query);
            return _super.prototype.selectEntities.call(this, sqlParam.sqlExpression, sqlParam.params, relations);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.selectCountByExample = function (example) {
        try {
            var sqlParam = provider_1.SqlTemplateProvider.getSelectCount(example);
            return _super.prototype.selectCount.call(this, sqlParam.sqlExpression, sqlParam.params);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.selectCountByPrimaryKey = function (key) {
        try {
            var entityClass = this.getEntityClass();
            var sqlParam = provider_1.SqlTemplateProvider.getSelectCountByPk(entityClass, key);
            return _super.prototype.selectCount.call(this, sqlParam.sqlExpression, sqlParam.params);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.selectCountByDynamicQuery = function (query) {
        try {
            var entityClass = this.getEntityClass();
            var sqlParam = provider_1.SqlTemplateProvider.getSelectCountByDynamicQuery(entityClass, query);
            return _super.prototype.selectCount.call(this, sqlParam.sqlExpression, sqlParam.params);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.deleteByExample = function (example) {
        try {
            var sqlParam = provider_1.SqlTemplateProvider.getDelete(example);
            return this.deleteInternal(sqlParam.sqlExpression, sqlParam.params);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.deleteByPrimaryKey = function (key) {
        try {
            var entityClass = this.getEntityClass();
            var sqlParam = provider_1.SqlTemplateProvider.getDeleteByPk(entityClass, key);
            return this.deleteInternal(sqlParam.sqlExpression, sqlParam.params);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.deleteByDynamicQuery = function (query) {
        try {
            var entityClass = this.getEntityClass();
            var sqlParam = provider_1.SqlTemplateProvider.getDeleteByDynamicQuery(entityClass, query);
            return this.deleteInternal(sqlParam.sqlExpression, sqlParam.params);
        }
        catch (e) {
            return new Promise(function (resolve, reject) { return reject(e); });
        }
    };
    BaseTableMapper.prototype.insertInternal = function (o, selective) {
        return __awaiter(this, void 0, void 0, function () {
            var sqlParam, result, insertId, effectCount_1, keyColumn, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        sqlParam = provider_1.SqlTemplateProvider.getInsert(o, selective);
                        return [4 /*yield*/, _super.prototype.run.call(this, sqlParam.sqlExpression, sqlParam.params)];
                    case 1:
                        result = _a.sent();
                        insertId = void 0;
                        if (!(this.connection.getDataBaseType() === model_1.DatabaseType.MYSQL)) return [3 /*break*/, 2];
                        insertId = Number(result.insertId);
                        effectCount_1 = Number(result.affectedRows);
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(this.connection.getDataBaseType() === model_1.DatabaseType.SQLITE3)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getSeqIdForSqlite(o)];
                    case 3:
                        insertId = _a.sent();
                        return [4 /*yield*/, this.getEffectCountForSqlite()];
                    case 4:
                        effectCount_1 = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        insertId = 0;
                        effectCount_1 = 0;
                        _a.label = 6;
                    case 6:
                        keyColumn = provider_1.SqlTemplateProvider.getPkColumn(o);
                        o[keyColumn.property] = insertId;
                        return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(effectCount_1); })];
                    case 7:
                        e_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_1); })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BaseTableMapper.prototype.updateByPrimaryKeyInternal = function (o, selective) {
        return __awaiter(this, void 0, void 0, function () {
            var sqlParam, result, effectCount_2, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        sqlParam = provider_1.SqlTemplateProvider.getUpdateByPk(o, selective);
                        return [4 /*yield*/, _super.prototype.run.call(this, sqlParam.sqlExpression, sqlParam.params)];
                    case 1:
                        result = _a.sent();
                        if (!(this.connection.getDataBaseType() === model_1.DatabaseType.MYSQL)) return [3 /*break*/, 2];
                        effectCount_2 = Number(result.affectedRows);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.connection.getDataBaseType() === model_1.DatabaseType.SQLITE3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getEffectCountForSqlite()];
                    case 3:
                        effectCount_2 = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        effectCount_2 = 0;
                        _a.label = 5;
                    case 5: return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(effectCount_2); })];
                    case 6:
                        e_2 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_2); })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BaseTableMapper.prototype.deleteInternal = function (plainSql, params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, effectCount_3, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, _super.prototype.run.call(this, plainSql, params)];
                    case 1:
                        result = _a.sent();
                        if (!(this.connection.getDataBaseType() === model_1.DatabaseType.MYSQL)) return [3 /*break*/, 2];
                        effectCount_3 = Number(result.affectedRows);
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.connection.getDataBaseType() === model_1.DatabaseType.SQLITE3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getEffectCountForSqlite()];
                    case 3:
                        effectCount_3 = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        effectCount_3 = 0;
                        _a.label = 5;
                    case 5: return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(effectCount_3); })];
                    case 6:
                        e_3 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_3); })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BaseTableMapper.prototype.getSeqIdForSqlite = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, tableName, result_1, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sql = "SELECT seq FROM sqlite_sequence WHERE name = ?";
                        tableName = o.getTableName();
                        return [4 /*yield*/, _super.prototype.select.call(this, sql, [tableName])];
                    case 1:
                        result_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (result_1.length > 0) {
                                    var seqId = Number(result_1[0].seq);
                                    resolve(seqId);
                                }
                                else {
                                    reject(new Error("cannot find seqId"));
                                }
                            })];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_4); })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseTableMapper.prototype.getEffectCountForSqlite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entityClass, tableName, sql, result_2, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        entityClass = this.getEntityClass();
                        tableName = new entityClass().getTableName();
                        sql = "SELECT changes() as change FROM " + tableName;
                        return [4 /*yield*/, _super.prototype.select.call(this, sql, [])];
                    case 1:
                        result_2 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var change = Number(result_2[0].change);
                                resolve(change);
                            })];
                    case 2:
                        e_5 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_5); })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BaseTableMapper;
}(baseMybatisMapper_1.BaseMybatisMapper));
exports.BaseTableMapper = BaseTableMapper;
//# sourceMappingURL=baseTableMapper.js.map