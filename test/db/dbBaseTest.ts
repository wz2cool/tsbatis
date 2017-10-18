import * as sqlite3 from "sqlite3";

describe(".dbFilterTest", () => {
    const db = new sqlite3.Database("./sqlite.db");

    it("test connect to db", (done) => {
        db.serialize(() => {
            db.all("select * from users", (err, rows) => {
                if (err) {
                    done(err);
                    return;
                }

                if (rows.length > 0) {
                    console.log(rows);
                    done();
                    return;
                } else {
                    done("row count can not be 0");
                }
            });
        });
    });
});
