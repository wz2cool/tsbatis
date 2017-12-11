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
var OrderDetail = /** @class */ (function (_super) {
    __extends(OrderDetail, _super);
    function OrderDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderDetail.prototype.getTableName = function () {
        return "OrderDetail";
    };
    __decorate([
        _1.column("Id", true, true),
        __metadata("design:type", String)
    ], OrderDetail.prototype, "id", void 0);
    __decorate([
        _1.column("OrderId", false, true),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "orderId", void 0);
    __decorate([
        _1.column("ProductId", false, true),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "productId", void 0);
    __decorate([
        _1.column("UnitPrice", false, true),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "unitPrice", void 0);
    __decorate([
        _1.column("Quantity", false, true),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "quantity", void 0);
    __decorate([
        _1.column("Discount", false, true),
        __metadata("design:type", Number)
    ], OrderDetail.prototype, "discount", void 0);
    return OrderDetail;
}(_1.TableEntity));
exports.OrderDetail = OrderDetail;
//# sourceMappingURL=orderDetail.js.map