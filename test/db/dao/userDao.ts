import * as sqlite3 from "sqlite3";
import { CommonHelper } from "../../../src/helper";
import { SqlProvider } from "../../../src/provider";
import { User } from "../entity/table/user";
import { BaseTableDao } from "./baseTableDao";

export class UserDao extends BaseTableDao<User> {
    constructor(db: sqlite3.Database) {
        super(db);
    }
}
