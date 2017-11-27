"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("../helper");
var ColumnInfo = (function () {
    function ColumnInfo() {
    }
    ColumnInfo.prototype.getQueryColumn = function () {
        return helper_1.CommonHelper.isBlank(this.table)
            ? this.columnName : this.table + "." + this.columnName;
    };
    return ColumnInfo;
}());
exports.ColumnInfo = ColumnInfo;
//# sourceMappingURL=columnInfo.js.map