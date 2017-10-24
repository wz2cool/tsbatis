import * as mysql from "mysql";
import { CommonHelper, MysqlConnection, SqlTemplate } from "../../src";
import { Customer } from "./entity/customer";

describe("mysql connection test", () => {
    describe("connect db test", () => {
        it("should connect to mysql", (done) => {
            const connection = mysql.createConnection({
                host: "sql12.freemysqlhosting.net",
                port: 3306,
                // tslint:disable-next-line:object-literal-sort-keys
                database: "sql12200910",
                user: "sql12200910",
                password: "ku8lhu9lAg",
            });

            connection.query("select * from customers", (err, result) => {
                if (err) {
                    done(err);
                } else {
                    if (CommonHelper.isArray(result) && result.length > 0) {
                        done();
                    } else {
                        done("result is invalid");
                    }
                }
            });
        }).timeout(50000);
    });

    describe("mysql connection query test", () => {
        const pool = mysql.createPool({
            host: "sql12.freemysqlhosting.net",
            port: 3306,
            // tslint:disable-next-line:object-literal-sort-keys
            database: "sql12200910",
            user: "sql12200910",
            password: "ku8lhu9lAg",
        });
        const mysqlConnection = new MysqlConnection(pool);

        it("selectEntities should work", (done) => {
            mysqlConnection.selectEntities<Customer>(Customer, "select * from customers", [], (err, result) => {
                if (err) {
                    done(err);
                } else {
                    if (result.length > 0) {
                        done();
                    } else {
                        done("should have entities");
                    }
                }
            });
        }).timeout(50000);

        it("selectCount should work", (done) => {
            mysqlConnection.selectCount("select count(0) from customers", [], (err, result) => {
                if (err) {
                    done(err);
                } else {
                    if (result > 0) {
                        done();
                    } else {
                        done("should have entities");
                    }
                }
            });
        }).timeout(50000);

        it("runTransaction should work", (done) => {
            const creatTime = new Date();
            const updateTime = new Date();
            const insertStudent1Template = new SqlTemplate();
            insertStudent1Template.sqlExpression =
                `INSERT INTO student(name, age, create_time, update_time) VALUES (?,?,?,?)`;
            insertStudent1Template.params = ["frank" + creatTime, 30, creatTime, updateTime];

            const insertStudent2Template = new SqlTemplate();
            insertStudent2Template.sqlExpression =
                `INSERT INTO student(name, age, create_time, update_time) VALUES (?,?,?,?)`;
            insertStudent2Template.params = ["marry" + creatTime, 30, creatTime, updateTime];

            mysqlConnection.runTransaction([insertStudent1Template, insertStudent2Template], (err, result) => {
                if (err) {
                    done(err);
                } else {
                    if (result.length > 0) {
                        done();
                    } else {
                        done("should have entities");
                    }
                }
            })
        }).timeout(50000);
    });
});
