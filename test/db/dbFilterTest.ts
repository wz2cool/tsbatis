// // tslint:disable-next-line:no-var-keyword
// // tslint:disable-next-line:no-var-requires
// var sqlite3 = require("sqlite3").verbose();
// // tslint:disable-next-line:no-var-keyword
// // tslint:disable-next-line:no-var-requires
// var db = new sqlite3.Database("sqlite.db");

// describe(".dbFilterTest", () => {
//     it("test connect to db", (done) => {
//         // tslint:disable-next-line:only-arrow-functions
//         // tslint:disable-next-line:space-before-function-paren
//         // tslint:disable-next-line:only-arrow-functions
//         db.serialize(() => {
//             db.all("SELECT * from users", (err, row) => {
//                 console.log(err);
//                 console.log(row);
//                 done();
//             });
//         });

//         db.close();
//     }).timeout(500000);
// });
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
