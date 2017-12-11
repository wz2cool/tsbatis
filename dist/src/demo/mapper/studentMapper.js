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
var student_1 = require("../entity/table/student");
var StudentMapper = /** @class */ (function (_super) {
    __extends(StudentMapper, _super);
    function StudentMapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StudentMapper.prototype.getEntityClass = function () {
        return student_1.Student;
    };
    return StudentMapper;
}(mapper_1.BaseTableMapper));
exports.StudentMapper = StudentMapper;
//# sourceMappingURL=studentMapper.js.map