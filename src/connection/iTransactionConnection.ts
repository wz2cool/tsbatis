import { IConnection } from "./iConnection";

export interface ITransactionConnection extends IConnection {
    rollback(): Promise<void>;
    commit(): Promise<void>;
}
