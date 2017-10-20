import * as path from "path";
import * as sqlite3 from "sqlite3";
import { ISqlConnection, SqliteConnection } from "../../../src/connection";
import { BaseTableMapper } from "../../../src/mapper";
import { User } from "../entity/table/user";

export class UserMapper extends BaseTableMapper<User> {
    constructor(sqlConnection: ISqlConnection) {
        super(sqlConnection);
    }
}
