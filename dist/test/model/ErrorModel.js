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
var index_1 = require("../../src/index");
var ErrorModel = (function (_super) {
    __extends(ErrorModel, _super);
    function ErrorModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorModel.prototype.getTableName = function () {
        return "error_model";
    };
    return ErrorModel;
}(index_1.TableEntity));
exports.ErrorModel = ErrorModel;
//# sourceMappingURL=ErrorModel.js.map