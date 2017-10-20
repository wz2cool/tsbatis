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
    const userMapper = new UserMapper(connection);
    describe("#insert", () => {
        it("should return seq after inserting a new row", (done) => {
            const newUser = new User();
            newUser.username = "frankTest";
            newUser.password = "pwd";
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

    describe("#update", () => {
        it("change id = 2, name to 'hello world'", (done) => {
            const updateUser = new User();
            updateUser.id = 2;
            updateUser.username = "hello world";
            userMapper.updateByKeySelective(updateUser)
                .then(() => {
                    const searchUser = new User();
                    searchUser.id = 2;
                    return userMapper.select(searchUser);
                })
                .then((users) => {
                    if (users.length === 0) {
                        done("cannot find user");
                        return;
                    }

                    const user = users[0];
                    console.log(user);
                    if (updateUser.username === user.username) {
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

    describe("#delete", () => {
        it("delete by key", (done) => {
            const newUser = new User();
            newUser.username = "the user need delete";
            newUser.password = "pwd";
            userMapper.insertSelective(newUser)
                .then((id) => {
                    newUser.id = id;
                    console.log("insert id: ", id);
                    const searchUser = new User();
                    searchUser.id = id;
                    return userMapper.delete(searchUser);
                })
                .then(() => {
                    const searchUser = new User();
                    searchUser.id = newUser.id;
                    return userMapper.select(searchUser);
                })
                .then((users) => {
                    if (users.length === 0) {
                        done();
                    } else {
                        done("user should be deleted");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
