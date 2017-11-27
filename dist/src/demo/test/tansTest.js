// import * as path from "path";
// import { ConnectionFactory } from "../../connection";
// import { IConnectionConfig, MysqlConnectionConfig, RelationBase, SqliteConnectionConfig } from "../../model";
// import { SqlTemplateProvider } from "../../provider";
// import { Relations } from "../entity/relation/relations";
// import { Customer } from "../entity/table/customer";
// import { Order } from "../entity/table/order";
// import { Student } from "../entity/table/student";
// import { CustomerMapper } from "../mapper/customerMapper";
// import { StudentMapper } from "../mapper/studentMapper";
// export class TansTest {
//     private readonly connectionFactory: ConnectionFactory;
//     constructor() {
//         const connectionFactory = new ConnectionFactory(this.getMysqlConnectionConfig(), true);
//         this.connectionFactory = connectionFactory;
//     }
//     public getSqliteConnectionConfig(): IConnectionConfig {
//         const config = new SqliteConnectionConfig();
//         config.filepath = path.join(__dirname, "../sqlite.db");
//         return config;
//     }
//     public getMysqlConnectionConfig(): IConnectionConfig {
//         const config = new MysqlConnectionConfig();
//         config.host = "sql12.freemysqlhosting.net";
//         config.user = "sql12200910";
//         config.password = "ku8lhu9lAg";
//         config.database = "sql12200910";
//         return config;
//     }
//     public async insertSuccess(): Promise<number> {
//         try {
//             const connection = await this.connectionFactory.getConnection();
//             try {
//                 await connection.beginTransaction();
//                 try {
//                     let effectCount = 0;
//                     const students: Student[] = [];
//                     for (let i = 0; i < 10; i++) {
//                         const transMapper = new StudentMapper(connection);
//                         const newStudent = new Student();
//                         newStudent.name = "frankTest";
//                         newStudent.age = 20;
//                         newStudent.createTime = new Date();
//                         newStudent.updateTime = new Date();
//                         students.push(newStudent);
//                         effectCount += await transMapper.insert(newStudent);
//                     }
//                     console.log("insert succss: ", students[0].id);
//                     await connection.commit();
//                     return new Promise<number>((resolve, reject) => resolve(effectCount));
//                 } catch (e) {
//                     await connection.rollback();
//                     return new Promise<number>((resolve, reject) => reject(e));
//                 }
//             } catch (beginTransError) {
//                 return new Promise<number>((resolve, reject) => reject(beginTransError));
//             } finally {
//                 await connection.release();
//             }
//         } catch (getConnError) {
//             return new Promise<number>((resolve, reject) => reject(getConnError));
//         }
//     }
//     public async insertRollback(): Promise<void> {
//         try {
//             const connection = await this.connectionFactory.getConnection();
//             try {
//                 await connection.beginTransaction();
//                 try {
//                     const transMapper = new StudentMapper(connection);
//                     const newStudent = new Student();
//                     newStudent.name = "frankSucess";
//                     newStudent.age = 20;
//                     newStudent.createTime = new Date();
//                     newStudent.updateTime = new Date();
//                     await transMapper.insert(newStudent);
//                     const invalidStudent = new Student();
//                     await transMapper.insert(invalidStudent);
//                     await connection.commit();
//                     return new Promise<void>((resolve, reject) => resolve());
//                 } catch (e) {
//                     await connection.rollback();
//                     return new Promise<void>((resolve, reject) => reject(e));
//                 }
//             } catch (beginTransError) {
//                 return new Promise<void>((resolve, reject) => reject(beginTransError));
//             } finally {
//                 await connection.release();
//             }
//         } catch (getConnError) {
//             return new Promise<void>((resolve, reject) => reject(getConnError));
//         }
//     }
//     public async deleteSuccess(): Promise<number> {
//         try {
//             const connection = await this.connectionFactory.getConnection();
//             try {
//                 await connection.beginTransaction();
//                 try {
//                     const transMapper = new StudentMapper(connection);
//                     const deleteStudent = new Student();
//                     deleteStudent.name = "frankTest";
//                     deleteStudent.age = 20;
//                     const effectCount = await transMapper.deleteByExample(deleteStudent);
//                     await connection.commit();
//                     return new Promise<number>((resolve, reject) => resolve(effectCount));
//                 } catch (e) {
//                     await connection.rollback();
//                     return new Promise<number>((resolve, reject) => reject(e));
//                 }
//             } catch (beginTransError) {
//                 return new Promise<number>((resolve, reject) => reject(beginTransError));
//             } finally {
//                 await connection.release();
//             }
//         } catch (getConnError) {
//             return new Promise<number>((resolve, reject) => reject(getConnError));
//         }
//     }
//     public async updateSuccess(): Promise<number> {
//         try {
//             const connection = await this.connectionFactory.getConnection();
//             try {
//                 await connection.beginTransaction();
//                 try {
//                     const transMapper = new StudentMapper(connection);
//                     const updateStudent = new Student();
//                     updateStudent.id = 1221;
//                     updateStudent.name = "1111111111111";
//                     updateStudent.age = 200;
//                     const effectCount = await transMapper.updateByPrimaryKeySelective(updateStudent);
//                     await connection.commit();
//                     return new Promise<number>((resolve, reject) => resolve(effectCount));
//                 } catch (e) {
//                     await connection.rollback();
//                     return new Promise<number>((resolve, reject) => reject(e));
//                 }
//             } catch (beginTransError) {
//                 return new Promise<number>((resolve, reject) => reject(beginTransError));
//             } finally {
//                 await connection.release();
//             }
//         } catch (getConnError) {
//             return new Promise<number>((resolve, reject) => reject(getConnError));
//         }
//     }
// }
//# sourceMappingURL=tansTest.js.map