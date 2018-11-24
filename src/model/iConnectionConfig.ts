import { DatabaseType } from "./databaseType";

export interface IConnectionConfig {
  getDatabaseType(): DatabaseType;
}
