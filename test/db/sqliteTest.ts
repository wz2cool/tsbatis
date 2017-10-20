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
    newUser.username = "frank";
    newUser.password = "pwd";
    const userMapper = new UserMapper(connection);
    it("should return seq after inserting a new row", (done) => {
        userMapper.insert(newUser).then((id) => {
            console.log("insert id: ", id);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});
