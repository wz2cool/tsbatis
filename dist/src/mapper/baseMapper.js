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
var cache_1 = require("../cache");
var helper_1 = require("../helper");
var model_1 = require("../model");
var provider_1 = require("../provider");
var BaseMapper = /** @class */ (function () {
    function BaseMapper(connection) {
        this.entityCache = cache_1.EntityCache.getInstance();
        this.connection = connection;
    }
    BaseMapper.prototype.getColumnExpression = function () {
        return provider_1.SqlTemplateProvider.getColumnsExpression(this.getEntityClass());
    };
    BaseMapper.prototype.getFilterExpression = function (filters) {
        return provider_1.SqlTemplateProvider.getFilterExpression(this.getEntityClass(), filters);
    };
    BaseMapper.prototype.getSortExpression = function (sorts) {
        return provider_1.SqlTemplateProvider.getSortExpression(this.getEntityClass(), sorts);
    };
    BaseMapper.prototype.run = function (plainSql, params) {
        return this.connection.run(plainSql, params);
    };
    BaseMapper.prototype.selectEntities = function (plainSql, params, relations) {
        if (relations === void 0) { relations = []; }
        return this.selectEntitiesWithRelationInteral(plainSql, params, relations);
    };
    BaseMapper.prototype.selectEntitiesRowBounds = function (plainSql, params, rowBounds, relations) {
        if (relations === void 0) { relations = []; }
        return this.selectEntitiesRowBoundWithRelationInteral(plainSql, params, rowBounds, relations);
    };
    BaseMapper.prototype.selectEntitiesPageRowBounds = function (plainSql, params, pageRowBounds, relations) {
        if (relations === void 0) { relations = []; }
        return __awaiter(this, void 0, void 0, function () {
            var entityClass, entities, selectCountSql, total, page_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        entityClass = this.getEntityClass();
                        return [4 /*yield*/, this.selectEntitiesRowBounds(plainSql, params, pageRowBounds, relations)];
                    case 1:
                        entities = _a.sent();
                        selectCountSql = "SELECT COUNT(0) FROM (" + plainSql + ") AS t";
                        return [4 /*yield*/, this.selectCount(selectCountSql, params)];
                    case 2:
                        total = _a.sent();
                        page_1 = new model_1.Page(pageRowBounds.getPageNum(), pageRowBounds.getPageSize(), total, entities);
                        return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(page_1); })];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_1); })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaseMapper.prototype.select = function (plainSql, params) {
        return this.connection.select(plainSql, params);
    };
    BaseMapper.prototype.selectCount = function (plainSql, params) {
        return this.connection.selectCount(plainSql, params);
    };
    BaseMapper.prototype.selectEntitiesWithRelationInteral = function (plainSql, params, relations) {
        return __awaiter(this, void 0, void 0, function () {
            var entityClass, entities_1, _i, entities_2, entity, _a, relations_1, relation, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        console.log(plainSql);
                        entityClass = this.getEntityClass();
                        return [4 /*yield*/, this.selectEntitiesInternal(entityClass, plainSql, params)];
                    case 1:
                        entities_1 = _b.sent();
                        if (!(!helper_1.CommonHelper.isNullOrUndefined(entities_1) && entities_1.length > 0
                            && !helper_1.CommonHelper.isNullOrUndefined(relations) && relations.length > 0)) return [3 /*break*/, 7];
                        _i = 0, entities_2 = entities_1;
                        _b.label = 2;
                    case 2:
                        if (!(_i < entities_2.length)) return [3 /*break*/, 7];
                        entity = entities_2[_i];
                        _a = 0, relations_1 = relations;
                        _b.label = 3;
                    case 3:
                        if (!(_a < relations_1.length)) return [3 /*break*/, 6];
                        relation = relations_1[_a];
                        return [4 /*yield*/, this.assignRelationInternal(entity, relation)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 3];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(entities_1); })];
                    case 8:
                        e_2 = _b.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_2); })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    BaseMapper.prototype.selectEntitiesRowBoundWithRelationInteral = function (plainSql, params, rowBounds, relations) {
        return __awaiter(this, void 0, void 0, function () {
            var paging, selectPagingSql;
            return __generator(this, function (_a) {
                paging = this.connection.getRowBoundsExpression(rowBounds);
                selectPagingSql = plainSql + " " + paging;
                return [2 /*return*/, this.selectEntitiesWithRelationInteral(plainSql, params, relations)];
            });
        });
    };
    BaseMapper.prototype.assignRelationInternal = function (sourceEntity, relation) {
        return __awaiter(this, void 0, void 0, function () {
            var mappingProp, sourceValue, refEntityClass, dynamicQuery, refColumnFilter, sqlTemplate, nestEntities, rowBounds, _i, nestEntities_1, nestEntity, _a, _b, nestRelation, e_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, , 12]);
                        mappingProp = relation.getMappingProp();
                        sourceValue = sourceEntity[relation.getSourceProp()];
                        refEntityClass = relation.getTargetEntityClass();
                        dynamicQuery = relation.getDynamicQuery();
                        refColumnFilter = new model_1.FilterDescriptor();
                        refColumnFilter.propertyPath = relation.getTargetProp();
                        refColumnFilter.value = sourceValue;
                        if (helper_1.CommonHelper.isNullOrUndefined(dynamicQuery)) {
                            dynamicQuery = model_1.DynamicQuery.createIntance().addFilters(refColumnFilter);
                        }
                        else {
                            dynamicQuery.addFilters(refColumnFilter);
                        }
                        sqlTemplate = provider_1.SqlTemplateProvider.getSqlByDynamicQuery(refEntityClass, relation.getSelectSql(), dynamicQuery);
                        nestEntities = void 0;
                        if (!(relation instanceof model_1.AssociationRelation)) return [3 /*break*/, 2];
                        rowBounds = new model_1.RowBounds(0, 1);
                        return [4 /*yield*/, this.selectEntitiesRowBoundInternal(refEntityClass, sqlTemplate.sqlExpression, sqlTemplate.params, rowBounds)];
                    case 1:
                        nestEntities = _c.sent();
                        if (!helper_1.CommonHelper.isNullOrUndefined(nestEntities) && nestEntities.length > 0) {
                            sourceEntity[mappingProp] = nestEntities[0];
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.selectEntitiesInternal(refEntityClass, sqlTemplate.sqlExpression, sqlTemplate.params)];
                    case 3:
                        // one to many.
                        nestEntities = _c.sent();
                        sourceEntity[mappingProp] = nestEntities;
                        _c.label = 4;
                    case 4:
                        if (!(!helper_1.CommonHelper.isNullOrUndefined(relation.relations) && relation.relations.length > 0)) return [3 /*break*/, 10];
                        _i = 0, nestEntities_1 = nestEntities;
                        _c.label = 5;
                    case 5:
                        if (!(_i < nestEntities_1.length)) return [3 /*break*/, 10];
                        nestEntity = nestEntities_1[_i];
                        _a = 0, _b = relation.relations;
                        _c.label = 6;
                    case 6:
                        if (!(_a < _b.length)) return [3 /*break*/, 9];
                        nestRelation = _b[_a];
                        return [4 /*yield*/, this.assignRelationInternal(nestEntity, nestRelation)];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _a++;
                        return [3 /*break*/, 6];
                    case 9:
                        _i++;
                        return [3 /*break*/, 5];
                    case 10: return [2 /*return*/, new Promise(function (resolve, reject) { return resolve(); })];
                    case 11:
                        e_3 = _c.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_3); })];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    BaseMapper.prototype.selectEntitiesInternal = function (entityClass, plainSql, params) {
        return this.connection.selectEntities(entityClass, plainSql, params);
    };
    BaseMapper.prototype.selectEntitiesRowBoundInternal = function (entityClass, plainSql, params, rowBounds, relations) {
        if (relations === void 0) { relations = []; }
        var paging = this.connection.getRowBoundsExpression(rowBounds);
        var selectPagingSql = plainSql + " " + paging;
        return this.selectEntitiesInternal(entityClass, selectPagingSql, params);
    };
    return BaseMapper;
}());
exports.BaseMapper = BaseMapper;
//# sourceMappingURL=baseMapper.js.map