import * as path from "path";
import * as sqlite3 from "sqlite3";
import { ISqlConnection, SqliteConnection } from "../../src/connection";
import { BaseTableMapper } from "../../src/mapper";
import { DynamicQuery, FilterDescriptor, FilterOperator } from "../../src/model";
import { User } from "./entity/table/user";
import { UserMapper } from "./mapper/userMapper";

describe(".SqliteConnection", () => {
    const dbPath = path.join(__dirname, "../sqlite.db");
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
                    return userMapper.selectByExample(searchUser);
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
                    return userMapper.selectByExample(searchUser);
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
            newUser.username = "the user need delete by key";
            newUser.password = "pwd";
            userMapper.insertSelective(newUser)
                .then((id) => {
                    newUser.id = id;
                    console.log("insert id: ", id);
                    return userMapper.deleteByKey(id);
                })
                .then(() => {
                    return userMapper.selectByKey(newUser.id);
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

        it("delete by example", (done) => {
            const newUser = new User();
            newUser.username = "the user need delete by example";
            newUser.password = "pwd";
            userMapper.insertSelective(newUser)
                .then((id) => {
                    newUser.id = id;
                    console.log("insert id: ", id);
                    const searchUser = new User();
                    searchUser.username = newUser.username;
                    return userMapper.deleteByExample(searchUser);
                })
                .then(() => {
                    return userMapper.selectByKey(newUser.id);
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

        it("delete by dynamic query", (done) => {
            const newUser = new User();
            newUser.username = "the user need delete by dynamicQuery";
            newUser.password = "pwd";
            userMapper.insertSelective(newUser)
                .then((id) => {
                    newUser.id = id;
                    console.log("insert id: ", id);
                    const nameFilter =
                        new FilterDescriptor<User>((u) => u.username, FilterOperator.CONTAINS, "dynamicQuery");

                    const query = DynamicQuery.createIntance<User>()
                        .addFilters(nameFilter);
                    return userMapper.deleteByDynamicQuery(query);
                })
                .then(() => {
                    return userMapper.selectByKey(newUser.id);
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

    describe("#select", () => {
        it("select by key", (done) => {
            const newUser = new User();
            newUser.username = "select by key";
            newUser.password = "pwd";
            userMapper.insert(newUser)
                .then((id) => {
                    console.log("insert id: ", id);
                    return userMapper.selectByKey(id);
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

        it("select by example", (done) => {
            const newUser = new User();
            newUser.username = "newUserForSelectByExample";
            newUser.password = "pwd";
            userMapper.insert(newUser)
                .then((id) => {
                    console.log("insert id: ", id);
                    const searchUser = new User();
                    searchUser.username = newUser.username;
                    return userMapper.selectByExample(searchUser);
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

        it("select by dynamicQuery", (done) => {
            const newUser = new User();
            newUser.username = "newUserForSelectByDynamicQuery";
            newUser.password = "pwd";
            userMapper.insert(newUser)
                .then((id) => {
                    console.log("insert id: ", id);
                    const nameFilter =
                        new FilterDescriptor<User>((u) => u.username, FilterOperator.CONTAINS, "dynamicQuery");

                    const query = DynamicQuery.createIntance<User>()
                        .addFilters(nameFilter);
                    return userMapper.selectByDynamicQuery(query);
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

    describe("#selectCount", () => {
        it("select count by key", (done) => {
            const newUser = new User();
            newUser.username = "select by key count";
            newUser.password = "pwd";
            userMapper.insert(newUser)
                .then((id) => {
                    console.log("insert id: ", id);
                    return userMapper.selectCountByKey(id);
                })
                .then((count) => {
                    if (count === 1) {
                        done();
                    } else {
                        done("count should be 1");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("select count by example", (done) => {
            const newUser = new User();
            newUser.username = "newUserForSelectCountByExample";
            newUser.password = "pwd";
            userMapper.insert(newUser)
                .then((id) => {
                    console.log("insert id: ", id);
                    const searchUser = new User();
                    searchUser.username = newUser.username;
                    return userMapper.selectCountByExample(searchUser);
                })
                .then((count) => {
                    if (count === 1) {
                        done();
                    } else {
                        done("count should be 1");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("select count by dynamicQuery", (done) => {
            const newUser = new User();
            newUser.username = "newUserForSelectCountByDynamicQuery";
            newUser.password = "pwd";
            userMapper.insert(newUser)
                .then((id) => {
                    console.log("insert id: ", id);
                    const nameFilter =
                        new FilterDescriptor<User>(
                            (u) => u.username, FilterOperator.EQUAL, "newUserForSelectCountByDynamicQuery");

                    const query = DynamicQuery.createIntance<User>()
                        .addFilters(nameFilter);
                    return userMapper.selectCountByDynamicQuery(query);
                })
                .then((count) => {
                    if (count === 1) {
                        done();
                    } else {
                        done("count should be 1");
                    }
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
