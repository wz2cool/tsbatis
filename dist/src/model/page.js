"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Page = /** @class */ (function () {
    function Page(pageNum, pageSize, total, entities) {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.total = total;
        this.entities = entities;
        this.pages = this.calPages(pageSize, total);
    }
    Page.prototype.getPageNum = function () {
        return this.pageNum;
    };
    Page.prototype.getPageSize = function () {
        return this.pageSize;
    };
    Page.prototype.getTotal = function () {
        return this.total;
    };
    Page.prototype.getPages = function () {
        return this.pages;
    };
    Page.prototype.getEntities = function () {
        return this.entities;
    };
    Page.prototype.calPages = function (pageSize, total) {
        return Math.ceil(total / pageSize);
    };
    return Page;
}());
exports.Page = Page;
//# sourceMappingURL=page.js.map