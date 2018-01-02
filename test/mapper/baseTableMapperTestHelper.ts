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
            return new Promise<void>((resolve) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public async insertWithAutoIncreaseTest(): Promise<void> {
        try {
            await this.insertTestInternalWithAutoIncrease(this.sqliteConnectionFactory);
            await this.insertTestInternalWithAutoIncrease(this.mysqlConnectionFactory);
            return new Promise<void>((resolve) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public async insertSelectiveWithAutoIncreaseTest(): Promise<void> {
        try {
            await this.insertSelectiveTestInternalWithAutoIncrease(this.sqliteConnectionFactory);
            await this.insertSelectiveTestInternalWithAutoIncrease(this.mysqlConnectionFactory);
            return new Promise<void>((resolve) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public async updateByPrimaryKeyTest(): Promise<void> {
        try {
            await this.updateByPrimaryKeyInternal(this.sqliteConnectionFactory);
            await this.updateByPrimaryKeyInternal(this.mysqlConnectionFactory);
            return new Promise<void>((resolve) => resolve());
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    public async updateSelectiveByPrimaryKeyTest(): Promise<void> {
        try {
            await this.updateSelectiveByPrimaryKeyInternal(this.sqliteConnectionFactory);
            await this.updateSelectiveByPrimaryKeyInternal(this.mysqlConnectionFactory);
            return new Promise<void>((resolve) => resolve());
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
            newBook.price = 20;
            const result = await mapper.insert(newBook);
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

    private async insertSelectiveTestInternalWithAutoIncrease(connectionFactory: ConnectionFactory): Promise<void> {
        try {
            const conn = await connectionFactory.getConnection();
            const mapper = new BookMapper(conn);
            const newBook = new Book();
            newBook.name = "book_" + new Date().toString();
            const result = await mapper.insertSelective(newBook);

            const searchBook = await mapper.selectByPrimaryKey(newBook.id);
            conn.release();
            if (result > 0 && newBook.id > 0 && searchBook && searchBook.price === 10) {
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

    private async updateByPrimaryKeyInternal(connectionFactory: ConnectionFactory): Promise<void> {
        try {
            const conn = await connectionFactory.getConnection();
            try {
                const mapper = new BookMapper(conn);
                const newBook = new Book();
                newBook.name = "book_" + new Date().toString();
                const result = await mapper.insertSelective(newBook);
                const searchBook = await mapper.selectByPrimaryKey(newBook.id);
                if (result > 0 && newBook.id > 0 && searchBook && searchBook.price === 10) {
                    const updateBook = new Book();
                    updateBook.price = 100;
                    updateBook.name = newBook.name;
                    updateBook.id = newBook.id;
                    await mapper.updateByPrimaryKey(updateBook);
                    const updatedBook = await mapper.selectByPrimaryKey(newBook.id);
                    if (updatedBook
                        && updatedBook.price === 100
                        && updatedBook.name === newBook.name) {
                        return new Promise<void>((resolve) => resolve());
                    } else {
                        return new Promise<void>((resolve, reject) => reject("upate failed"));
                    }
                } else {
                    return new Promise<void>((resolve, reject) => reject("insert failed"));
                }
            } finally {
                conn.release();
            }
        } catch (e) {
            return new Promise<void>((resolve, reject) => reject(e));
        }
    }

    private async updateSelectiveByPrimaryKeyInternal(connectionFactory: ConnectionFactory): Promise<void> {
        try {
            const conn = await connectionFactory.getConnection();
            try {
                const mapper = new BookMapper(conn);
                const newBook = new Book();
                newBook.name = "book_" + new Date().toString();
                const result = await mapper.insertSelective(newBook);
                const searchBook = await mapper.selectByPrimaryKey(newBook.id);
                if (result > 0 && newBook.id > 0 && searchBook && searchBook.price === 10) {
                    const updateBook = new Book();
                    updateBook.price = 100;
                    // no need assign name
                    // updateBook.name = newBook.name;
                    updateBook.id = newBook.id;
                    await mapper.updateByPrimaryKeySelective(updateBook);
                    const updatedBook = await mapper.selectByPrimaryKey(newBook.id);
                    if (updatedBook
                        && updatedBook.price === 100
                        && updatedBook.name === newBook.name) {
                        return new Promise<void>((resolve) => resolve());
                    } else {
                        return new Promise<void>((resolve, reject) => reject("upate failed"));
                    }
                } else {
                    return new Promise<void>((resolve, reject) => reject("insert failed"));
                }
            } finally {
                conn.release();
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
