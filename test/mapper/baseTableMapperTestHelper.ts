import * as path from "path";
import { MysqlConnectionPool } from "../../src/connection/mysqlConnectionPool";
import { BaseTableMapper, ConnectionFactory, MysqlConnectionConfig, SqliteConnectionConfig } from "../../src/index";
import { Student } from "../db/entity/student";

export class BaseTableMapperTestHelper {
    private readonly sqliteConnectionFactory: ConnectionFactory;
    private readonly mysqlConnectionFactory: ConnectionFactory;
    private readonly studentMapper: StudentMapper;

    constructor() {
        const filepath = path.join(__dirname, "../../", "test", "northwind.db");
        const sqliteConfig = new SqliteConnectionConfig();
        sqliteConfig.filepath = filepath;
        this.sqliteConnectionFactory = new ConnectionFactory(sqliteConfig, true);

        const mysqlConfig = new MysqlConnectionConfig();
        mysqlConfig.database = "northwind";
        mysqlConfig.host = "localhost";
        mysqlConfig.user = "travis";
        this.mysqlConnectionFactory = new ConnectionFactory(mysqlConfig, true);
    }

    public async insertTest(): Promise<void> {
        try {
            await this.insertTestInternal(this.sqliteConnectionFactory);
            await this.insertTestInternal(this.mysqlConnectionFactory);
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    private async insertTestInternal(connectionFactory: ConnectionFactory): Promise<void> {
        try {
            const conn = await connectionFactory.getConnection();
            const mapper = new StudentMapper(conn);
            const newStudent = new Student();
            newStudent.name = "mapperTest_" + new Date().toString();
            newStudent.age = 30;
            const result = await mapper.insert(newStudent);
            conn.release();
            if (result > 0) {
                return new Promise<void>((resolve) => resolve());
            } else {
                return new Promise<void>((resolve, reject) => reject("insert failed"));
            }
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }
}

// tslint:disable-next-line:max-classes-per-file
class StudentMapper extends BaseTableMapper<Student> {
    public getEntityClass(): new () => Student {
        return Student;
    }
}
