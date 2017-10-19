import { Entity } from "./entity";

export abstract class TableEntity extends Entity {
    public abstract getTableName(): string;
}
