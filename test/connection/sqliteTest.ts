import * as path from "path";
import * as sqlite3 from "sqlite3";
import { ISqlConnection, SqliteConnection } from "../../src/connection";
import { BaseTableMapper } from "../../src/mapper";
import { User } from "../db/entity/table/user";

class UserMapper extends BaseTableMapper<User> {
    constructor(sqlConnection: ISqlConnection) {
        super(sqlConnection);
    }
}

const dbPath = path.join(__dirname, "sqlite.db");
console.log(dbPath);
const db = new sqlite3.Database(dbPath);
const connection = new SqliteConnection(db);

describe(".SqliteConnection", () => {
    describe("#insert", () => {
        it("should return seq after inserting a new row", (done) => {
            const newUser = new User();
            newUser.username = "frank";
            newUser.password = "pwd";

            const userMapper = new UserMapper(connection);
            userMapper.insert(newUser).then((id) => {
                console.log("insert id: ", id);
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});
