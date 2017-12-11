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
var filterDescriptorBase_1 = require("./filterDescriptorBase");
var FilterGroupDescriptor = /** @class */ (function (_super) {
    __extends(FilterGroupDescriptor, _super);
    function FilterGroupDescriptor() {
        var _this = _super.call(this) || this;
        _this.filters = [];
        return _this;
    }
    return FilterGroupDescriptor;
}(filterDescriptorBase_1.FilterDescriptorBase));
exports.FilterGroupDescriptor = FilterGroupDescriptor;
//# sourceMappingURL=filterGroupDescriptor.js.map