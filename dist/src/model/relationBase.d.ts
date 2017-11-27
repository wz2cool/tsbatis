import { DynamicQuery } from "./dynamicQuery";
import { Entity } from "./entity";
export declare abstract class RelationBase {
    relations: RelationBase[];
    abstract getMappingProp(): string;
    abstract getSourceProp(): string;
    abstract getTargetProp(): string;
    abstract getTargetEntityClass(): new () => Entity;
    abstract getSelectSql(): string;
    abstract getDynamicQuery(): DynamicQuery<Entity>;
}
