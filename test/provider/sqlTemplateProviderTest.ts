import { expect } from "chai";
import * as path from "path";
import { MysqlConnection, SqliteConnection } from "../../src/connection";
import { DatabaseType, SqliteConnectionConfig } from "../../src/model";
import { RowBounds } from "../../src/model/rowBounds";
import { Customer } from "../db/entity/customer";

describe(".mysqlConnection", () => {
    describe("#getDataBaseType", () => {
        it("should return mysql", () => {
            const mysqlConnection = new MysqlConnection(null);
            const result = mysqlConnection.getDataBaseType();
            expect(DatabaseType.MYSQL).to.be.eq(result);
        });
    });
});
