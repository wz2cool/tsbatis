import { DynamicQuery } from "ts-dynamic-query";
import { Entity } from "./entity";

export abstract class RelationBase {
    public relations: RelationBase[] = [];

    public abstract getMappingProp(): string;
    public abstract getSourceProp(): string;
    public abstract getTargetProp(): string;
    public abstract getTargetEntityClass(): new () => Entity;
    public abstract getSelectSql(): string;
    public abstract getDynamicQuery(): DynamicQuery<Entity>;
}
