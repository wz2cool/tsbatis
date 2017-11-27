"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonHelper = (function () {
    function CommonHelper() {
        // hide constructor
    }
    CommonHelper.isNullOrUndefined = function (value) {
        return value === null
            || typeof value === "undefined";
    };
    CommonHelper.isBlank = function (value) {
        return CommonHelper.isNullOrUndefined(value)
            || value.trim() === "";
    };
    CommonHelper.isNotBlank = function (value) {
        return !CommonHelper.isBlank(value);
    };
    CommonHelper.isArray = function (value) {
        var result = value instanceof Array;
        return result;
    };
    return CommonHelper;
}());
exports.CommonHelper = CommonHelper;
//# sourceMappingURL=commonHelper.js.map