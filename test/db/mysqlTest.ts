import * as mysql from "mysql";
import { CommonHelper } from "../../src";

describe("mysql connection test", () => {
    it("should connect to mysql", (done) => {
        const pool = mysql.createPool({
            host: "sql12.freemysqlhosting.net",
            port: 3306,
            // tslint:disable-next-line:object-literal-sort-keys
            database: "sql12200910",
            user: "sql12200910",
            password: "ku8lhu9lAg",
        });


        
        pool.query("select * from customers", (err, result) => {
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
