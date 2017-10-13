import * as mysql from "mysql";
import { ISqlQuery } from "../../src/model";

export class MysqlSqlQuery implements ISqlQuery {
    public static instance = new MysqlSqlQuery();
    public static getInstance(): MysqlSqlQuery {
        return MysqlSqlQuery.instance;
    }

    private readonly pool: mysql.IPool;
    constructor() {
        this.pool = mysql.createPool({
            host: "wz2cool.wicp.net",
            port: 4306,
            user: "ts_im",
            // tslint:disable-next-line:object-literal-sort-keys
            password: "innodealing",
            database: "ts_im",
            acquireTimeout: 100000,
        });
    }

    public query(sql: string, params: any[], callback: (err: any, result?: any) => void) {
        this.pool.query(sql, params, callback);
    }
}
