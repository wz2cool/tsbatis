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
var mapper_1 = require("../../mapper");
var customer_1 = require("../entity/table/customer");
var CustomerMapper = /** @class */ (function (_super) {
    __extends(CustomerMapper, _super);
    function CustomerMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerMapper.prototype.getEntityClass = function () {
        return customer_1.Customer;
    };
    return CustomerMapper;
}(mapper_1.BaseTableMapper));
exports.CustomerMapper = CustomerMapper;
//# sourceMappingURL=customerMapper.js.map