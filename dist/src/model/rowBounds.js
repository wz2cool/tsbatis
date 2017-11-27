"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("../helper");
var RowBounds = (function () {
    function RowBounds(offset, limit) {
        this.offset = helper_1.CommonHelper.isNullOrUndefined(offset) ? RowBounds.NO_ROW_OFFSET : offset;
        this.limit = helper_1.CommonHelper.isNullOrUndefined(limit) ? RowBounds.NO_ROW_LIMIT : limit;
    }
    return RowBounds;
}());
RowBounds.NO_ROW_OFFSET = 0;
RowBounds.NO_ROW_LIMIT = 5000;
RowBounds.DEFAULT = new RowBounds();
exports.RowBounds = RowBounds;
//# sourceMappingURL=rowBounds.js.map