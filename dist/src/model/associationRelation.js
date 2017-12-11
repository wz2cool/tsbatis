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
// one to one
var AssociationRelation = /** @class */ (function (_super) {
    __extends(AssociationRelation, _super);
    function AssociationRelation(
        // one to one.
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
    AssociationRelation.prototype.getMappingProp = function () {
        return helper_1.EntityHelper.getPropertyName(this.mappingPropFn);
    };
    AssociationRelation.prototype.getSourceProp = function () {
        return helper_1.EntityHelper.getPropertyName(this.sourcePropFn);
    };
    AssociationRelation.prototype.getTargetProp = function () {
        return helper_1.EntityHelper.getPropertyName(this.targetPropFn);
    };
    AssociationRelation.prototype.getTargetEntityClass = function () {
        return this.targetEntityClass;
    };
    AssociationRelation.prototype.getSelectSql = function () {
        return this.selectSql;
    };
    AssociationRelation.prototype.getDynamicQuery = function () {
        return this.dynamicQuery;
    };
    return AssociationRelation;
}(relationBase_1.RelationBase));
exports.AssociationRelation = AssociationRelation;
//# sourceMappingURL=associationRelation.js.map