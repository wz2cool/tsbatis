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
var sortDescritporBase_1 = require("./sortDescritporBase");
var sortDirection_1 = require("./sortDirection");
var SortDescriptor = /** @class */ (function (_super) {
    __extends(SortDescriptor, _super);
    function SortDescriptor(getPropFun, direction) {
        if (direction === void 0) { direction = sortDirection_1.SortDirection.ASC; }
        var _this = _super.call(this) || this;
        _this.direction = direction;
        _this.propertyPath = helper_1.EntityHelper.getPropertyName(getPropFun);
        return _this;
    }
    return SortDescriptor;
}(sortDescritporBase_1.SortDescriptorBase));
exports.SortDescriptor = SortDescriptor;
//# sourceMappingURL=sortDescriptor.js.map