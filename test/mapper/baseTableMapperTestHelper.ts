import * as path from "path";
import { MysqlConnectionPool } from "../../src/connection/mysqlConnectionPool";
import { BaseTableMapper, ConnectionFactory, MysqlConnectionConfig, SqliteConnectionConfig } from "../../src/index";
import { Book } from "../db/entity/book";
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

    public async insertWithoutAutoIncreaseTest(): Promise<void> {
        try {
            await this.insertTestInternalWithoutAutoIncrease(this.sqliteConnectionFactory);
            await this.insertTestInternalWithoutAutoIncrease(this.mysqlConnectionFactory);
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public async insertWithAutoIncreaseTest(): Promise<void> {
        try {
            await this.insertTestInternalWithAutoIncrease(this.sqliteConnectionFactory);
            await this.insertTestInternalWithAutoIncrease(this.mysqlConnectionFactory);
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    private async insertTestInternalWithAutoIncrease(connectionFactory: ConnectionFactory): Promise<void> {
        try {
            const conn = await connectionFactory.getConnection();
            const mapper = new BookMapper(conn);
            const newBook = new Book();
            newBook.name = "book_" + new Date().toString();
            conn.beginTransaction();
            const result = await mapper.insert(newBook);
            console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX: ", JSON.stringify(newBook));
            conn.commit();
            conn.release();
            if (result > 0 && newBook.id > 0) {
                return new Promise<void>((resolve) => resolve());
            } else {
                return new Promise<void>((resolve, reject) => reject("insert failed"));
            }
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    private async insertTestInternalWithoutAutoIncrease(connectionFactory: ConnectionFactory): Promise<void> {
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

// tslint:disable-next-line:max-classes-per-file
class BookMapper extends BaseTableMapper<Book>{
    public getEntityClass(): new () => Book {
        return Book;
    }
}
