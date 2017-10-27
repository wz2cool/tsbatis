import { ISqlConnection } from "./iSqlConnection";

export interface ITransactionConnection extends ISqlConnection {
    rollback(): Promise<void>;
    commit(): Promise<void>;
}
