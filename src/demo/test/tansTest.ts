import * as mysql from "mysql";
import { MysqlConnection } from "../../connection";
import { RelationBase } from "../../model";
import { SqlTemplateProvider } from "../../provider";
import { Relations } from "../entity/relation/relations";
import { Customer } from "../entity/table/customer";
import { Order } from "../entity/table/order";
import { Student } from "../entity/table/student";
import { CustomerMapper } from "../mapper/customerMapper";
import { StudentMapper } from "../mapper/studentMapper";

export class TansTest {
    private readonly conn: MysqlConnection;
    constructor() {
        const connection = mysql.createConnection({
            host: "sql12.freemysqlhosting.net",
            port: 3306,
            // tslint:disable-next-line:object-literal-sort-keys
            database: "sql12200910",
            user: "sql12200910",
            password: "ku8lhu9lAg",
        });

        const conn = new MysqlConnection(connection);
    }

    public async insertSuccess(): Promise<void> {
        try {
            const transConnection = await this.conn.beginTransaction();
            try {
                const transMapper = new StudentMapper(transConnection);
                const newStudent = new Student();
                newStudent.name = "frankTest";
                newStudent.age = 20;
                newStudent.createTime = new Date();
                newStudent.updateTime = new Date();
                await transMapper.insert(newStudent);
                await transConnection.commit();
                return new Promise<void>((resolve, reject) => resolve());
            } catch (e) {
                await transConnection.rollback();
                return new Promise<void>((resolve, reject) => reject(e));
            }
        } catch (beginTransError) {
            return new Promise<void>((resolve, reject) => reject(beginTransError));
        }
    }

    public async insertRollback(): Promise<void> {
        try {
            const transConnection = await this.conn.beginTransaction();
            try {
                const transMapper = new StudentMapper(transConnection);
                const newStudent = new Student();
                newStudent.name = "frankSucess";
                newStudent.age = 20;
                newStudent.createTime = new Date();
                newStudent.updateTime = new Date();
                await transMapper.insert(newStudent);

                const invalidStudent = new Student();
                await transMapper.insert(invalidStudent);

                await transConnection.commit();
                return new Promise<void>((resolve, reject) => resolve());
            } catch (e) {
                await transConnection.rollback();
                return new Promise<void>((resolve, reject) => reject(e));
            }
        } catch (beginTransError) {
            return new Promise<void>((resolve, reject) => reject(beginTransError));
        }
    }
}
