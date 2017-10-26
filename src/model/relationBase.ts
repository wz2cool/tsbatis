import { DynamicQuery } from "./dynamicQuery";
import { Entity } from "./entity";

export abstract class RelationBase {
    public relations: RelationBase[] = [];

    public abstract getMappingProp(): string;
    public abstract getSourceProp(): string;
    public abstract getRefSourceProp(): string;
    public abstract getRefEntityClass(): new () => Entity;
    public abstract getSelectSql(): string;
    public abstract getDynamicQuery(): DynamicQuery<Entity>;
}
