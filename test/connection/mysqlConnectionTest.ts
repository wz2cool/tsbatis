import { expect } from "chai";
import { MysqlConnection } from "../../src/connection/index";
import { DatabaseType, MysqlConnectionConfig } from "../../src/index";
import { RowBounds } from "../../src/model/index";

describe(".mysqlConnection", () => {
    describe("#getDataBaseType", () => {
        it("should get mysql", () => {
            const conn = new MysqlConnection(null);
            const result = conn.getDataBaseType();
            expect(DatabaseType.MYSQL).to.be.eq(result);
        });
    });

    describe("#getRowBoundsExpression", () => {
        it("should return `limit 20, 10` if rowbounds.offset is 20, rowbounds.limit 10", () => {
            const conn = new MysqlConnection(null);
            const rowbounds = new RowBounds(20, 10);
            const result = conn.getRowBoundsExpression(rowbounds);
            expect("limit 20, 10").to.be.eq(result);
        });
    });

    describe("#common", () => {
        it("should select customer", (done) => {
            const config = new MysqlConnectionConfig();
            config.database = "northwind";
            config.host = "localhost";
            config.user = "root";
            const conn = new MysqlConnection(config);
            conn.selectCount("SELECT COUNT(0) FROM customer", [])
                .then((value) => {
                    console.log(value);
                    done(value);
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});