import { IConnection } from "./iConnection";

export interface IConnectionPool {
    getConnection(): Promise<IConnection>;
    getDriver(): any;
}
