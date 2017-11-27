import { Entity } from "./entity";
export declare abstract class TableEntity extends Entity {
    abstract getTableName(): string;
}
