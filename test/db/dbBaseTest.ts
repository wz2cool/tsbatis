import * as path from "path";
import * as sqlite3 from "sqlite3";
import { SqlProvider } from "../../src/provider";
import { UserDao } from "./dao/userDao";
import { User } from "./entity/user";

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

    it("test insert to db", (done) => {
        const newUser = new User();
        newUser.username = "create user time: " + new Date();
        newUser.password = "test";
        userDao.insert(newUser)
            .then((id) => {
                const searchUser = new User();
                searchUser.id = id;
                return userDao.selectByKey(searchUser);
            }).then((users) => {
                const result = users[0];
                if (result.username === newUser.username
                    && result.password === newUser.password) {
                    done();
                } else {
                    done("result user is valid");
                }
            })
            .catch((err) => {
                done(err);
            });
    });
});
