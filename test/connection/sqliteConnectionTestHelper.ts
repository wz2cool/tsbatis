import * as path from "path";
import { SqliteConnection } from "../../src/connection/sqliteConnection";
import { Student } from "../db/entity/student";

export class SqliteConnectionTestHelper {

    public async testTransactionInsert(): Promise<void> {
        try {
            const filepath = path.join(__dirname, "../../", "test", "northwind.db");
            const sqliteConnection = new SqliteConnection(filepath, true);
            const newStudent = new Student();
            newStudent.name = new Date().toString();
            newStudent.age = 30;
            await sqliteConnection.beginTransaction();
            const insertSqlTemplate = `INSERT INTO student values(?, ?)`;
            await sqliteConnection.run(insertSqlTemplate, [newStudent.name, newStudent.age]);
            await sqliteConnection.commit();
            const selectMatchStudentTemplate = `SELECT * FROM student where name = ?`;
            const matchStudent = await sqliteConnection.selectEntities<Student>(
                Student, selectMatchStudentTemplate, [newStudent.name]);
            await sqliteConnection.release();
            return new Promise<void>((resolve, reject) => {
                if (matchStudent.length === 1) {
                    resolve();
                } else {
                    reject("could not find insert student");
                }
            });
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public async testTransactionInsertThenRollback(): Promise<void> {
        try {
            const filepath = path.join(__dirname, "../../", "test", "northwind.db");
            const sqliteConnection = new SqliteConnection(filepath, true);
            const newStudent = new Student();
            newStudent.name = "rollback" + new Date().toString();
            newStudent.age = 30;
            await sqliteConnection.beginTransaction();
            const insertSqlTemplate = `INSERT INTO student values(?, ?)`;
            await sqliteConnection.run(insertSqlTemplate, [newStudent.name, newStudent.age]);
            await sqliteConnection.rollback();
            const selectMatchStudentTemplate = `SELECT * FROM student where name = ?`;
            const matchStudent = await sqliteConnection.selectEntities<Student>(
                Student, selectMatchStudentTemplate, [newStudent.name]);
            await sqliteConnection.release();
            return new Promise<void>((resolve, reject) => {
                if (matchStudent.length === 0) {
                    resolve();
                } else {
                    reject("should not find insert item since rollback");
                }
            });
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }
}
