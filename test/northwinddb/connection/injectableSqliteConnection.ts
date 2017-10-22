import { injectable } from "inversify";
import * as path from "path";
import * as sqlite3 from "sqlite3";
import { SqliteConnection } from "../../../src";

@injectable()
export class InjectableSqliteConnection extends SqliteConnection {
    constructor() {
        const dbPath = path.join(__dirname, "sqlite.db");
        const db = new sqlite3.Database(dbPath);
        super(db);
    }
}
