import { BaseMapper } from "../mapper";
import { MysqlSqlQuery } from "./mysqlSqlQuery";
import { User } from "./user";

export class UserDao extends BaseMapper<User> {
    constructor() {
        super(MysqlSqlQuery.getInstance());
    }
}
