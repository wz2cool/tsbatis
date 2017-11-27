import { IConnectionConfig } from "../model";
import { IConnection } from "./iConnection";
export declare class ConnectionFactory {
    private readonly pool;
    private readonly enableLog;
    constructor(config: IConnectionConfig, enableLog?: boolean);
    getConnection(): Promise<IConnection>;
}
