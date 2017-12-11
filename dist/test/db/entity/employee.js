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
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Employee.prototype.getTableName = function () {
        return "Employee";
    };
    __decorate([
        _1.column("Id", true, true),
        __metadata("design:type", Number)
    ], Employee.prototype, "id", void 0);
    __decorate([
        _1.column("LastName", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "lastName", void 0);
    __decorate([
        _1.column("FirstName", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "firstName", void 0);
    __decorate([
        _1.column("Title", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "title", void 0);
    __decorate([
        _1.column("TitleOfCourtesy", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "titleOfCourtesy", void 0);
    __decorate([
        _1.column("BirthDate", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "birthDate", void 0);
    __decorate([
        _1.column("HireDate", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "hireDate", void 0);
    __decorate([
        _1.column("Address", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "address", void 0);
    __decorate([
        _1.column("City", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "city", void 0);
    __decorate([
        _1.column("Region", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "region", void 0);
    __decorate([
        _1.column("PostalCode", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "postalCode", void 0);
    __decorate([
        _1.column("Country", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "country", void 0);
    __decorate([
        _1.column("HomePhone", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "homePhone", void 0);
    __decorate([
        _1.column("Extension", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "extension", void 0);
    __decorate([
        _1.column("Photo", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "photo", void 0);
    __decorate([
        _1.column("Notes", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "notes", void 0);
    __decorate([
        _1.column("ReportsTo", false, true),
        __metadata("design:type", Number)
    ], Employee.prototype, "reportsTo", void 0);
    __decorate([
        _1.column("PhotoPath", false, true),
        __metadata("design:type", String)
    ], Employee.prototype, "photoPath", void 0);
    return Employee;
}(_1.TableEntity));
exports.Employee = Employee;
//# sourceMappingURL=employee.js.map