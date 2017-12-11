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
var decorator_1 = require("../../../decorator");
var model_1 = require("../../../model");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Order.prototype.getTableName = function () {
        return "orders";
    };
    __decorate([
        decorator_1.column("id", true, false),
        __metadata("design:type", Number)
    ], Order.prototype, "id", void 0);
    __decorate([
        decorator_1.column("ship_name"),
        __metadata("design:type", String)
    ], Order.prototype, "shipName", void 0);
    __decorate([
        decorator_1.column("ship_address"),
        __metadata("design:type", String)
    ], Order.prototype, "shipAddress", void 0);
    __decorate([
        decorator_1.column("ship_city"),
        __metadata("design:type", String)
    ], Order.prototype, "shipCity", void 0);
    __decorate([
        decorator_1.column("ship_state_province"),
        __metadata("design:type", String)
    ], Order.prototype, "shipStateProvince", void 0);
    __decorate([
        decorator_1.column("status_id"),
        __metadata("design:type", Number)
    ], Order.prototype, "statusId", void 0);
    __decorate([
        decorator_1.column("customer_id"),
        __metadata("design:type", Number)
    ], Order.prototype, "customerId", void 0);
    return Order;
}(model_1.TableEntity));
exports.Order = Order;
//# sourceMappingURL=order.js.map