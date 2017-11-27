export declare class SqliteConnectionTestHelper {
    private readonly sqliteConnection;
    constructor();
    testTransactionInsert(): Promise<void>;
    testTransactionInsertThenRollback(): Promise<void>;
}
