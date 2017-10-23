import { injectable } from "inversify";
import * as path from "path";
import "reflect-metadata";
import * as sqlite3 from "sqlite3";
import { SqliteConnection } from "../../../src";
import { InjectableSqlitedb } from "./injectableSqlitedb";

@injectable()
export class InjectableSqliteConnection extends SqliteConnection {
    constructor(db: InjectableSqlitedb) {
        super(db.sqlitedb);
    }
}
