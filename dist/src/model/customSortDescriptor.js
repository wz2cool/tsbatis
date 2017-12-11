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
var sortDescritporBase_1 = require("./sortDescritporBase");
var CustomSortDescriptor = /** @class */ (function (_super) {
    __extends(CustomSortDescriptor, _super);
    function CustomSortDescriptor() {
        var _this = _super.call(this) || this;
        _this.expression = "";
        _this.params = [];
        return _this;
    }
    return CustomSortDescriptor;
}(sortDescritporBase_1.SortDescriptorBase));
exports.CustomSortDescriptor = CustomSortDescriptor;
//# sourceMappingURL=customSortDescriptor.js.map