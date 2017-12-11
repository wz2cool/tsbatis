import { expect } from "chai";
import * as path from "path";
import { SqliteConnectionPool } from "../../src/connection/sqliteConnectionPool";
import { SqliteConnectionConfig } from "../../src/model/index";

describe(".SqliteConnectionPool", () => {
    describe("#constructor", () => {
        it("init", (done) => {
            const filepath = path.join(__dirname, "../../", "test", "northwind.db");
            const config = new SqliteConnectionConfig();
            config.filepath = filepath;
            const pool = new SqliteConnectionPool(config, true);
            pool.getConnection()
                .then((conn) => {
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });

        it("should return err if filepath is null", (done) => {
            const config = new SqliteConnectionConfig();
            config.filepath = null;
            const pool = new SqliteConnectionPool(config, true);
            pool.getConnection()
                .then((conn) => {
                    done("should have error");
                })
                .catch((err) => {
                    done();
                });
        });
    });
});
