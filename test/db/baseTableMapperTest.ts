import * as path from "path";
import * as sqlite3 from "sqlite3";
import { ISqlConnection, SqliteConnection } from "../../src/connection";
import { BaseTableMapper } from "../../src/mapper";
import { User } from "./entity/table/user";
import { UserMapper } from "./mapper/userMapper";

describe(".SqliteConnection", () => {
    const dbPath = path.join(__dirname, "sqlite.db");
    const db = new sqlite3.Database(dbPath);
    const connection = new SqliteConnection(db);
    const newUser = new User();
    newUser.username = "frankTest";
    newUser.password = "pwd";
    const userMapper = new UserMapper(connection);
    describe("#insert", () => {
        it("should return seq after inserting a new row", (done) => {
            userMapper.insert(newUser)
                .then((id) => {
                    console.log("insert id: ", id);
                    const searchUser = new User();
                    searchUser.id = id;
                    return userMapper.select(searchUser);
                })
                .then((users) => {
                    if (users.length === 0) {
                        done("cannot find user");
                        return;
                    }

                    const user = users[0];
                    if (newUser.username === user.username
                        && newUser.password === user.password) {
                        done();
                    } else {
                        done("user is invalid");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
