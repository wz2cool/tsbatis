"use strict";
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
var index_1 = require("../../../src/index");
var CustomerView = (function () {
    function CustomerView() {
    }
    return CustomerView;
}());
__decorate([
    index_1.column("Id", "customer"),
    __metadata("design:type", String)
], CustomerView.prototype, "id", void 0);
__decorate([
    index_1.column("CompanyName", "customer"),
    __metadata("design:type", String)
], CustomerView.prototype, "companyName", void 0);
__decorate([
    index_1.column("ContactName", "customer"),
    __metadata("design:type", String)
], CustomerView.prototype, "contactName", void 0);
__decorate([
    index_1.column("ContactTitle", "customer"),
    __metadata("design:type", String)
], CustomerView.prototype, "contactTitle", void 0);
exports.CustomerView = CustomerView;
//# sourceMappingURL=customerView.js.map