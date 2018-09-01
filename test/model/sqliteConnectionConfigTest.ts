import { expect } from "chai";
import { DatabaseType, SqliteConnectionConfig } from "../../src";

describe(".SqliteConnectionConfig", () => {
    describe("#getDatabaseType", () => {
        it("should getDatabaseType", () => {
            const config = new SqliteConnectionConfig();
            const result = config.getDatabaseType();
            const expectValue = DatabaseType.SQLITE3;
            expect(expectValue).to.be.eq(result);
        });
    });
});
