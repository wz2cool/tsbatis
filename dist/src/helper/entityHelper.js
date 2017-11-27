"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonHelper_1 = require("./commonHelper");
var EntityHelper = (function () {
    function EntityHelper() {
        // hide constructor.
    }
    EntityHelper.getPropertyName = function (fn) {
        if (commonHelper_1.CommonHelper.isNullOrUndefined(fn)) {
            return "";
        }
        var expression = fn.toString();
        var regexp = new RegExp("^function.+return\\s+\\w+.(\\w+)\\s*;\\s*}$");
        var match = regexp.exec(expression);
        if (match && match.length === 2) {
            return match[1];
        }
        else {
            return "";
        }
    };
    EntityHelper.getEntityName = function (o) {
        if (commonHelper_1.CommonHelper.isNullOrUndefined(o)) {
            return "";
        }
        var testObj = typeof o === "function" ? new o() : o;
        return testObj.constructor.name;
    };
    EntityHelper.createObject = function (o) {
        if (typeof o === "function") {
            return new o();
        }
        else {
            var type = o.constructor;
            return new type();
        }
    };
    EntityHelper.getEntityClass = function (o) {
        return o.constructor;
    };
    return EntityHelper;
}());
exports.EntityHelper = EntityHelper;
//# sourceMappingURL=entityHelper.js.map