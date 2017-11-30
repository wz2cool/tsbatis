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
var chai_1 = require("chai");
var cache_1 = require("../../src/cache");
var decorator_1 = require("../../src/decorator");
var helper_1 = require("../../src/helper");
describe(".column", function () {
    describe("#tableColumn", function () {
        var Student = /** @class */ (function () {
            function Student() {
            }
            __decorate([
                decorator_1.column("id", true, false),
                __metadata("design:type", Number)
            ], Student.prototype, "id", void 0);
            __decorate([
                decorator_1.column("name"),
                __metadata("design:type", String)
            ], Student.prototype, "name", void 0);
            return Student;
        }());
        var cache = cache_1.EntityCache.getInstance();
        it("id is key", function () {
            var result = cache.getColumnInfo("Student", "id");
            chai_1.expect("id").to.be.eq(result.columnName);
            chai_1.expect(true).to.be.eq(result.isPK);
            chai_1.expect(false).to.be.eq(result.insertable);
            chai_1.expect(true).to.be.eq(helper_1.CommonHelper.isBlank(result.table));
        });
    });
    describe("#viewColumn", function () {
        var ProductView = /** @class */ (function () {
            function ProductView() {
            }
            __decorate([
                decorator_1.column("product_id", "product"),
                __metadata("design:type", Number)
            ], ProductView.prototype, "id", void 0);
            __decorate([
                decorator_1.column("product_name", "product"),
                __metadata("design:type", String)
            ], ProductView.prototype, "productName", void 0);
            __decorate([
                decorator_1.column("category_name", "category"),
                __metadata("design:type", String)
            ], ProductView.prototype, "categoryName", void 0);
            __decorate([
                decorator_1.column("create_time", "product"),
                __metadata("design:type", Date)
            ], ProductView.prototype, "createTime", void 0);
            return ProductView;
        }());
        var cache = cache_1.EntityCache.getInstance();
        it("id column has table", function () {
            var result = cache.getColumnInfo("ProductView", "id");
            chai_1.expect("product_id").to.be.eq(result.columnName);
            chai_1.expect(false).to.be.eq(result.isPK);
            chai_1.expect(true).to.be.eq(result.insertable);
            chai_1.expect("product").to.be.eq(result.table);
            chai_1.expect("Number").to.be.eq(result.propertyType);
        });
        it("get createTime type", function () {
            var result = cache.getColumnInfo("ProductView", "createTime");
            chai_1.expect("Date").to.be.eq(result.propertyType);
        });
        it("column throw exception if not annotion", function () {
            chai_1.expect(decorator_1.column("name")).to.be.throw(Error);
        });
    });
});
//# sourceMappingURL=columnTest.js.map