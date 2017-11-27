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
var rowBounds_1 = require("./rowBounds");
var PageRowBounds = (function (_super) {
    __extends(PageRowBounds, _super);
    // (pageNum = 1) is first page.
    function PageRowBounds(pageNum, pageSize) {
        var _this = this;
        var usePageNume = (pageNum < 1) ? 1 : pageNum;
        _this = _super.call(this, (usePageNume - 1) * pageSize, pageSize) || this;
        _this.pageNum = pageNum;
        _this.pageSize = pageSize;
        return _this;
    }
    PageRowBounds.prototype.getPageNum = function () {
        return this.pageNum;
    };
    PageRowBounds.prototype.getPageSize = function () {
        return this.pageSize;
    };
    return PageRowBounds;
}(rowBounds_1.RowBounds));
exports.PageRowBounds = PageRowBounds;
//# sourceMappingURL=pageRowBounds.js.map