import * as path from "path";
import * as sqlite3 from "sqlite3";
import { SqlTemplateProvider } from "../../src/provider";
import { UserDao } from "./dao/userDao";

describe(".dbBaseTest", () => {
    const dbPath = path.join(__dirname, "sqlite.db");
    console.log(dbPath);
    const db = new sqlite3.Database(dbPath);
    const userDao = new UserDao(db);
    it("test connect to db", (done) => {
        db.serialize(() => {
            db.all("select * from users", (err, rows) => {
                if (err) {
                    done(err);
                    return;
                }

                if (rows.length > 0) {
                    console.log(rows);
                    done();
                    return;
                } else {
                    done("row count can not be 0");
                }
            });
        });
    });
});
