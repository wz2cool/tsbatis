import { injectable } from "inversify";
import * as path from "path";
import "reflect-metadata";
import * as sqlite3 from "sqlite3";

@injectable()
export class InjectableSqlitedb {
    public readonly sqlitedb: sqlite3.Database;

    constructor() {
        const dbPath = path.join(__dirname, "../../northwind.db");
        this.sqlitedb = new sqlite3.Database(dbPath);
    }
}
