import * as path from "path";
import * as sqlite3 from "sqlite3";
import { DynamicQuery, FilterDescriptor, FilterOperator } from "../../src/model";
import { SqlTemplateProvider } from "../../src/provider";
import { UserDao } from "./dao/userDao";
import { User } from "./entity/table/user";


describe(".dbDaoTest", () => {
    const dbPath = path.join(__dirname, "sqlite.db");
    console.log(dbPath);
    const db = new sqlite3.Database(dbPath);
    const userDao = new UserDao(db);

    it("test insert to db", (done) => {
        const newUser = new User();
        newUser.username = "create user time: " + new Date();
        newUser.password = "test";
        userDao.insert(newUser)
            .then((id) => {
                console.log("insert user success");
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

    it("test delete by key", (done) => {
        const newUser = new User();
        newUser.username = "create user time: " + new Date();
        newUser.password = "test";
        userDao.insert(newUser)
            .then((id) => {
                newUser.id = id;
                console.log("insert user success. id: ", id);
                const searchUser = new User();
                // 'id' is key
                searchUser.id = id;
                return userDao.deleteByKey(searchUser);
            }).then(() => {
                const searchUser = new User();
                searchUser.id = newUser.id;
                return userDao.selectByKey(searchUser);
            }).then((users) => {
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

    it("test delete by dynamic query", (done) => {
        const newUser = new User();
        newUser.username = "create user time: " + new Date();
        newUser.password = "test";
        userDao.insert(newUser)
            .then((id) => {
                newUser.id = id;
                console.log("insert user success. id: ", id);
                const nameFilter = new FilterDescriptor<User>((u) => u.username, FilterOperator.CONTAINS, "user");
                const dynamicQuery = DynamicQuery.createIntance<User>()
                    .addFilters(nameFilter);
                return userDao.deleteByDynamicQuery(User, dynamicQuery);
            }).then(() => {
                const searchUser = new User();
                searchUser.id = newUser.id;
                return userDao.selectByKey(searchUser);
            }).then((users) => {
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

    it("test select id is 1 user", (done) => {
        const searchUser = new User();
        searchUser.id = 1;
        userDao.selectByKey(searchUser)
            .then((users) => {
                const result = users[0];
                if ("usr1" === result.username
                    && "bigSecret" === result.password) {
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
