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
var Product = (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Product.prototype.getTableName = function () {
        return "Product";
    };
    return Product;
}(_1.TableEntity));
__decorate([
    _1.column("Id", true, true),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    _1.column("ProductName", false, true),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    _1.column("SupplierId", false, true),
    __metadata("design:type", Number)
], Product.prototype, "supplierId", void 0);
__decorate([
    _1.column("CategoryId", false, true),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    _1.column("QuantityPerUnit", false, true),
    __metadata("design:type", String)
], Product.prototype, "quantityPerUnit", void 0);
__decorate([
    _1.column("UnitPrice", false, true),
    __metadata("design:type", Number)
], Product.prototype, "unitPrice", void 0);
__decorate([
    _1.column("UnitsInStock", false, true),
    __metadata("design:type", Number)
], Product.prototype, "unitsInStock", void 0);
__decorate([
    _1.column("UnitsOnOrder", false, true),
    __metadata("design:type", Number)
], Product.prototype, "unitsOnOrder", void 0);
__decorate([
    _1.column("ReorderLevel", false, true),
    __metadata("design:type", Number)
], Product.prototype, "reorderLevel", void 0);
__decorate([
    _1.column("Discontinued", false, true),
    __metadata("design:type", Number)
], Product.prototype, "discontinued", void 0);
exports.Product = Product;
//# sourceMappingURL=product.js.map