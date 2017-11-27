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
var helper_1 = require("./../helper");
var filterDescriptorBase_1 = require("./filterDescriptorBase");
var filterOperator_1 = require("./filterOperator");
var FilterDescriptor = (function (_super) {
    __extends(FilterDescriptor, _super);
    function FilterDescriptor(a1, a2, a3, a4) {
        var _this = _super.call(this) || this;
        _this.operator = filterOperator_1.FilterOperator.EQUAL;
        _this.propertyPath = null;
        _this.value = null;
        if (!a1) {
            return _this;
        }
        if (typeof a1 === "number") {
            // conditon
            _this.condition = a1;
            _this.propertyPath = helper_1.EntityHelper.getPropertyName(a2);
            _this.operator = a3;
            _this.value = a4;
            return _this;
        }
        if (typeof a1 === "function") {
            _this.propertyPath = helper_1.EntityHelper.getPropertyName(a1);
            _this.operator = a2;
            _this.value = a3;
            return _this;
        }
        return _this;
    }
    return FilterDescriptor;
}(filterDescriptorBase_1.FilterDescriptorBase));
exports.FilterDescriptor = FilterDescriptor;
//# sourceMappingURL=filterDescriptor.js.map