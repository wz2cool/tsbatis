import { expect } from "chai";
import { MysqlConnection } from "../../src/connection";
import { DatabaseType } from "../../src/model";
import { RowBounds } from "../../src/model/rowBounds";

describe(".mysqlConnection", () => {
    describe("#getDataBaseType", () => {
        it("should return mysql", () => {
            const mysqlConnection = new MysqlConnection(null);
            const result = mysqlConnection.getDataBaseType();
            expect(DatabaseType.MYSQL).to.be.eq(result);
        });
    });

    describe("#getRowBoundsExpression", () => {
        it("should return `limit 20, 10` if rowbounds.offset is 20, rowbounds.limit 10", () => {
            const mysqlConnection = new MysqlConnection(null);
            const rowbounds = new RowBounds(20, 10);
            const result = mysqlConnection.getRowBoundsExpression(rowbounds);
            expect("limit 20, 10").to.be.eq(result);
        });
    });
});
