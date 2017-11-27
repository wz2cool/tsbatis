import { DynamicQuery } from "./dynamicQuery";
import { Entity } from "./entity";
import { RelationBase } from "./relationBase";
export declare class AssociationRelation<TSource extends Entity, TTarget extends Entity> extends RelationBase {
    private readonly mappingPropFn;
    private readonly sourcePropFn;
    private readonly targetPropFn;
    private readonly targetEntityClass;
    private readonly selectSql;
    private readonly dynamicQuery;
    constructor(mappingPropFn: (source: TSource) => TTarget, sourcePropFn: (source: TSource) => any, targetPropFn: (target: TTarget) => any, targetEntityClass: {
        new (): TTarget;
    }, selectSql: string, dynamicQuery?: DynamicQuery<TTarget>);
    getMappingProp(): string;
    getSourceProp(): string;
    getTargetProp(): string;
    getTargetEntityClass(): new () => TTarget;
    getSelectSql(): string;
    getDynamicQuery(): DynamicQuery<TTarget>;
}
