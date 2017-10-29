import * as mysql from "mysql";
import { ConnectionFactory } from "../../connection";
import { MysqlConnectionConfig, RelationBase } from "../../model";
import { SqlTemplateProvider } from "../../provider";
import { Relations } from "../entity/relation/relations";
import { Customer } from "../entity/table/customer";
import { Order } from "../entity/table/order";
import { Student } from "../entity/table/student";
import { CustomerMapper } from "../mapper/customerMapper";
import { StudentMapper } from "../mapper/studentMapper";

export class TansTest {
    private readonly connectionFactory: ConnectionFactory;
    constructor() {
        const config = new MysqlConnectionConfig();
        config.host = "sql12.freemysqlhosting.net";
        config.port = 3306;
        config.database = "sql12200910";
        config.user = "sql12200910";
        config.password = "ku8lhu9lAg";

        const connectionFactory = new ConnectionFactory(config, true);
        this.connectionFactory = connectionFactory;
    }

    public async insertSuccess(): Promise<void> {
        try {
            const connection = await this.connectionFactory.getConnection();
            try {
                await connection.beginTransaction();
                try {
                    const transMapper = new StudentMapper(connection);
                    const newStudent = new Student();
                    newStudent.name = "frankTest";
                    newStudent.age = 20;
                    newStudent.createTime = new Date();
                    newStudent.updateTime = new Date();
                    await transMapper.insert(newStudent);
                    await connection.commit();
                    return new Promise<void>((resolve, reject) => resolve());
                } catch (e) {
                    await connection.rollback();
                    return new Promise<void>((resolve, reject) => reject(e));
                }
            } catch (beginTransError) {
                return new Promise<void>((resolve, reject) => reject(beginTransError));
            } finally {
                await connection.release();
            }
        } catch (getConnError) {
            return new Promise<void>((resolve, reject) => reject(getConnError));
        }
    }

    public async insertRollback(): Promise<void> {
        try {
            const connection = await this.connectionFactory.getConnection();
            try {
                await connection.beginTransaction();
                try {
                    const transMapper = new StudentMapper(connection);
                    const newStudent = new Student();
                    newStudent.name = "frankSucess";
                    newStudent.age = 20;
                    newStudent.createTime = new Date();
                    newStudent.updateTime = new Date();
                    await transMapper.insert(newStudent);

                    const invalidStudent = new Student();
                    await transMapper.insert(invalidStudent);

                    await connection.commit();
                    return new Promise<void>((resolve, reject) => resolve());
                } catch (e) {
                    await connection.rollback();
                    return new Promise<void>((resolve, reject) => reject(e));
                }
            } catch (beginTransError) {
                return new Promise<void>((resolve, reject) => reject(beginTransError));
            } finally {
                await connection.release();
            }
        } catch (getConnError) {
            return new Promise<void>((resolve, reject) => reject(getConnError));
        }
    }
}
