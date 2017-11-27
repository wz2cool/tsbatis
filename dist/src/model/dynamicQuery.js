"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DynamicQuery = (function () {
    function DynamicQuery() {
        this.filters = [];
        this.sorts = [];
    }
    DynamicQuery.createIntance = function () {
        return new DynamicQuery();
    };
    DynamicQuery.prototype.addFilters = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        this.filters = this.filters.concat(filters);
        return this;
    };
    DynamicQuery.prototype.addSorts = function () {
        var sorts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sorts[_i] = arguments[_i];
        }
        this.sorts = this.sorts.concat(sorts);
        return this;
    };
    return DynamicQuery;
}());
exports.DynamicQuery = DynamicQuery;
//# sourceMappingURL=dynamicQuery.js.map