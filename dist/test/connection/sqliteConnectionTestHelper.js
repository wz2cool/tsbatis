"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var sqliteConnection_1 = require("../../src/connection/sqliteConnection");
var student_1 = require("../db/entity/student");
var SqliteConnectionTestHelper = (function () {
    function SqliteConnectionTestHelper() {
    }
    SqliteConnectionTestHelper.prototype.testTransactionInsert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filepath, sqliteConnection, newStudent, insertSqlTemplate, selectMatchStudentTemplate, matchStudent_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        filepath = path.join(__dirname, "../../", "test", "northwind.db");
                        sqliteConnection = new sqliteConnection_1.SqliteConnection(filepath, true);
                        newStudent = new student_1.Student();
                        newStudent.name = new Date().toString();
                        newStudent.age = 30;
                        return [4 /*yield*/, sqliteConnection.beginTransaction()];
                    case 1:
                        _a.sent();
                        insertSqlTemplate = "INSERT INTO student values(?, ?)";
                        return [4 /*yield*/, sqliteConnection.run(insertSqlTemplate, [newStudent.name, newStudent.age])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, sqliteConnection.commit()];
                    case 3:
                        _a.sent();
                        selectMatchStudentTemplate = "SELECT * FROM student where name = ?";
                        return [4 /*yield*/, sqliteConnection.selectEntities(student_1.Student, selectMatchStudentTemplate, [newStudent.name])];
                    case 4:
                        matchStudent_1 = _a.sent();
                        return [4 /*yield*/, sqliteConnection.release()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (matchStudent_1.length === 1) {
                                    resolve();
                                }
                                else {
                                    reject("could not find insert student");
                                }
                            })];
                    case 6:
                        e_1 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_1); })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SqliteConnectionTestHelper.prototype.testTransactionInsertThenRollback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var filepath, sqliteConnection, newStudent, insertSqlTemplate, selectMatchStudentTemplate, matchStudent_2, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        filepath = path.join(__dirname, "../../", "test", "northwind.db");
                        sqliteConnection = new sqliteConnection_1.SqliteConnection(filepath, true);
                        newStudent = new student_1.Student();
                        newStudent.name = "rollback" + new Date().toString();
                        newStudent.age = 30;
                        return [4 /*yield*/, sqliteConnection.beginTransaction()];
                    case 1:
                        _a.sent();
                        insertSqlTemplate = "INSERT INTO student values(?, ?)";
                        return [4 /*yield*/, sqliteConnection.run(insertSqlTemplate, [newStudent.name, newStudent.age])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, sqliteConnection.rollback()];
                    case 3:
                        _a.sent();
                        selectMatchStudentTemplate = "SELECT * FROM student where name = ?";
                        return [4 /*yield*/, sqliteConnection.selectEntities(student_1.Student, selectMatchStudentTemplate, [newStudent.name])];
                    case 4:
                        matchStudent_2 = _a.sent();
                        return [4 /*yield*/, sqliteConnection.release()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                if (matchStudent_2.length === 0) {
                                    resolve();
                                }
                                else {
                                    reject("should not find insert item since rollback");
                                }
                            })];
                    case 6:
                        e_2 = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return reject(e_2); })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return SqliteConnectionTestHelper;
}());
exports.SqliteConnectionTestHelper = SqliteConnectionTestHelper;
//# sourceMappingURL=sqliteConnectionTestHelper.js.map