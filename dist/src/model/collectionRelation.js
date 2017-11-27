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
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("../helper");
var relationBase_1 = require("./relationBase");
// one to many
var CollectionRelation = (function (_super) {
    __extends(CollectionRelation, _super);
    function CollectionRelation(
        // one to many.
        mappingPropFn, sourcePropFn, targetPropFn, targetEntityClass, selectSql, dynamicQuery) {
        if (dynamicQuery === void 0) { dynamicQuery = null; }
        var _this = _super.call(this) || this;
        _this.mappingPropFn = mappingPropFn;
        _this.sourcePropFn = sourcePropFn;
        _this.targetPropFn = targetPropFn;
        _this.targetEntityClass = targetEntityClass;
        _this.dynamicQuery = dynamicQuery;
        _this.selectSql = selectSql;
        return _this;
    }
    CollectionRelation.prototype.getMappingProp = function () {
        return helper_1.EntityHelper.getPropertyName(this.mappingPropFn);
    };
    CollectionRelation.prototype.getSourceProp = function () {
        return helper_1.EntityHelper.getPropertyName(this.sourcePropFn);
    };
    CollectionRelation.prototype.getTargetProp = function () {
        return helper_1.EntityHelper.getPropertyName(this.targetPropFn);
    };
    CollectionRelation.prototype.getTargetEntityClass = function () {
        return this.targetEntityClass;
    };
    CollectionRelation.prototype.getSelectSql = function () {
        return this.selectSql;
    };
    CollectionRelation.prototype.getDynamicQuery = function () {
        return this.dynamicQuery;
    };
    return CollectionRelation;
}(relationBase_1.RelationBase));
exports.CollectionRelation = CollectionRelation;
//# sourceMappingURL=collectionRelation.js.map