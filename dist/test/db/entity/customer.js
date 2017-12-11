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
var Customer = /** @class */ (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Customer.prototype.getTableName = function () {
        return "Customer";
    };
    __decorate([
        _1.column("Id", true, false),
        __metadata("design:type", String)
    ], Customer.prototype, "id", void 0);
    __decorate([
        _1.column("CompanyName", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "companyName", void 0);
    __decorate([
        _1.column("ContactName", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "contactName", void 0);
    __decorate([
        _1.column("ContactTitle", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "contactTitle", void 0);
    __decorate([
        _1.column("Address", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "address", void 0);
    __decorate([
        _1.column("City", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "city", void 0);
    __decorate([
        _1.column("Region", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "region", void 0);
    __decorate([
        _1.column("PostalCode", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "postalCode", void 0);
    __decorate([
        _1.column("Country", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "country", void 0);
    __decorate([
        _1.column("Phone", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "phone", void 0);
    __decorate([
        _1.column("Fax", false, true),
        __metadata("design:type", String)
    ], Customer.prototype, "fax", void 0);
    return Customer;
}(_1.TableEntity));
exports.Customer = Customer;
//# sourceMappingURL=customer.js.map