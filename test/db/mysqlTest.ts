import * as mysql from "mysql";
import { CommonHelper } from "../../src";

describe("mysql connection test", () => {
    it("should connect to mysql", (done) => {
        const connection = mysql.createConnection({
            host: "sql12.freemysqlhosting.net",
            port: 3306,
            database: "sql12200910",
            user: "sql12200910",
            password: "ku8lhu9lAg",
        });

        connection.query("select * from customers", (err, result) => {
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
