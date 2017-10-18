import * as path from "path";
import * as sqlite3 from "sqlite3";
import { SqlProvider } from "../../src/provider";
import { User } from "./entity/user";

describe(".dbBaseTest", () => {
    const dbPath = path.join(__dirname, "sqlite.db");
    console.log(dbPath);
    const db = new sqlite3.Database(dbPath);

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

    it("test insert data to db", (done) => {
        const newUser = new User();
        newUser.username = "frank";
        newUser.password = "test";
        const sqlParam = SqlProvider.getInsert<User>(newUser, true);
        db.serialize(() => {
            db.run(sqlParam.sqlExpression, sqlParam.params, (err, row) => {
                if (err) {
                    done(err);
                    return;
                }
            });

            db.each("select seq from sqlite_sequence where name=?", "users", (err, row) => {
                if (err) {
                    done(err);
                    return;
                } else {
                    db.each("select * from users where id =? ", row.seq, (err1, row1) => {
                        if (err) {
                            done(err);
                            return;
                        } else {
                            console.log(row1);
                            if (row1.username === newUser.username && row1.password === newUser.password) {
                                done();
                                return;
                            } else {
                                done(row1);
                                return;
                            }
                        }
                    });
                }
            });
        });
    });
});
