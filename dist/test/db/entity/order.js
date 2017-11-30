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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../../../src/");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Order.prototype.getTableName = function () {
        return "Order";
    };
    __decorate([
        _1.column("Id", true, true),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        _1.column("CustomerId", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "customerId", void 0);
    __decorate([
        _1.column("EmployeeId", false, true),
        __metadata("design:type", Number)
    ], Order.prototype, "employeeId", void 0);
    __decorate([
        _1.column("OrderDate", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "orderDate", void 0);
    __decorate([
        _1.column("RequiredDate", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "requiredDate", void 0);
    __decorate([
        _1.column("ShippedDate", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "shippedDate", void 0);
    __decorate([
        _1.column("ShipVia", false, true),
        __metadata("design:type", Number)
    ], Order.prototype, "shipVia", void 0);
    __decorate([
        _1.column("Freight", false, true),
        __metadata("design:type", Number)
    ], Order.prototype, "freight", void 0);
    __decorate([
        _1.column("ShipName", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "shipName", void 0);
    __decorate([
        _1.column("ShipAddress", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "shipAddress", void 0);
    __decorate([
        _1.column("ShipCity", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "shipCity", void 0);
    __decorate([
        _1.column("ShipRegion", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "shipRegion", void 0);
    __decorate([
        _1.column("ShipPostalCode", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "shipPostalCode", void 0);
    __decorate([
        _1.column("ShipCountry", false, true),
        __metadata("design:type", String)
    ], Order.prototype, "shipCountry", void 0);
    return Order;
}(_1.TableEntity));
exports.Order = Order;
//# sourceMappingURL=order.js.map