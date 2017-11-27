"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterOperator;
(function (FilterOperator) {
    /**
     * Less than filter operator.
     */
    FilterOperator[FilterOperator["LESS_THAN"] = 0] = "LESS_THAN";
    /**
     * Less than or equal filter operator.
     */
    FilterOperator[FilterOperator["LESS_THAN_OR_EQUAL"] = 1] = "LESS_THAN_OR_EQUAL";
    /**
     * Equal filter operator.
     */
    FilterOperator[FilterOperator["EQUAL"] = 2] = "EQUAL";
    /**
     * Not equal filter operator.
     */
    FilterOperator[FilterOperator["NOT_EQUAL"] = 3] = "NOT_EQUAL";
    /**
     * Greater than or equal filter operator.
     */
    FilterOperator[FilterOperator["GREATER_THAN_OR_EQUAL"] = 4] = "GREATER_THAN_OR_EQUAL";
    /**
     * Greater than filter operator.
     */
    FilterOperator[FilterOperator["GREATER_THAN"] = 5] = "GREATER_THAN";
    /**
     * Start with filter operator.
     */
    FilterOperator[FilterOperator["START_WITH"] = 6] = "START_WITH";
    /**
     * End with filter operator.
     */
    FilterOperator[FilterOperator["END_WITH"] = 7] = "END_WITH";
    /**
     * Contains filter operator.
     */
    FilterOperator[FilterOperator["CONTAINS"] = 8] = "CONTAINS";
    /**
     * In filter operator.
     */
    FilterOperator[FilterOperator["IN"] = 9] = "IN";
    /**
     * Not in filter operator.
     */
    FilterOperator[FilterOperator["NOT_IN"] = 10] = "NOT_IN";
    /**
     * Between filter operator.
     */
    FilterOperator[FilterOperator["BETWEEN"] = 11] = "BETWEEN";
})(FilterOperator = exports.FilterOperator || (exports.FilterOperator = {}));
//# sourceMappingURL=filterOperator.js.map