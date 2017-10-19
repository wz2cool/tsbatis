import * as sqlite3 from "sqlite3";
import { CommonHelper } from "../../../src/helper";
import { SqlProvider } from "../../../src/provider";
import { User } from "../entity/user";
import { BaseDao } from "./baseDao";

export class UserDao extends BaseDao<User> {
    constructor(db: sqlite3.Database) {
        super(db);
    }
}
