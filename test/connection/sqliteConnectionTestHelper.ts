import * as path from "path";
import { SqliteConnection } from "../../src/connection/sqliteConnection";
import { Student } from "../db/entity/student";

export class SqliteConnectionTestHelper {
    private readonly sqliteConnection: SqliteConnection;
    constructor() {
        const filepath = path.join(__dirname, "../../", "test", "northwind.db");
        this.sqliteConnection = new SqliteConnection(filepath, true);
    }

    public async testTransactionInsert(): Promise<void> {
        try {
            const newStudent = new Student();
            newStudent.name = new Date().toString();
            newStudent.age = 30;
            await this.sqliteConnection.beginTransaction();
            const insertSqlTemplate = `INSERT INTO student values(?, ?)`;
            await this.sqliteConnection.run(insertSqlTemplate, [newStudent.name, newStudent.age]);
            await this.sqliteConnection.commit();
            const selectMatchStudentTemplate = `SELECT * FROM student where name = ?`;
            const matchStudent = await this.sqliteConnection.selectEntities<Student>(
                Student, selectMatchStudentTemplate, [newStudent.name]);

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
            const newStudent = new Student();
            newStudent.name = "rollback" + new Date().toString();
            newStudent.age = 30;
            await this.sqliteConnection.beginTransaction();
            const insertSqlTemplate = `INSERT INTO student values(?, ?)`;
            await this.sqliteConnection.run(insertSqlTemplate, [newStudent.name, newStudent.age]);
            await this.sqliteConnection.rollback();
            const selectMatchStudentTemplate = `SELECT * FROM student where name = ?`;
            const matchStudent = await this.sqliteConnection.selectEntities<Student>(
                Student, selectMatchStudentTemplate, [newStudent.name]);

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
