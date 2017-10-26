import { EntityHelper } from "../helper";
import { DynamicQuery } from "./dynamicQuery";
import { Entity } from "./entity";
import { RelationBase } from "./relationBase";

// one to one
export class AssociationRelation<TSource extends Entity, TTarget extends Entity> extends RelationBase {
    private readonly mappingPropFn: (t: TSource) => TTarget;
    private readonly sourcePropFn: (t: TSource) => any;
    private readonly targetPropFun: (t: TTarget) => any;
    private readonly targetEntityClass: { new(): TTarget };
    private readonly selectSql: string;
    private readonly dynamicQuery: DynamicQuery<TTarget>;

    constructor(
        // one to one.
        mappingPropFn: (source: TSource) => TTarget,
        sourcePropFn: (source: TSource) => any,
        targetPropFn: (target: TTarget) => any,
        targetEntityClass: { new(): TTarget },
        selectSql: string,
        dynamicQuery: DynamicQuery<TTarget> = null) {
        super();

        this.mappingPropFn = mappingPropFn;
        this.sourcePropFn = sourcePropFn;
        this.targetPropFun = targetPropFn;
        this.targetEntityClass = targetEntityClass;
        this.dynamicQuery = dynamicQuery;
        this.selectSql = selectSql;
    }

    public getMappingProp(): string {
        return EntityHelper.getPropertyName<TSource>(this.mappingPropFn);
    }

    public getSourceProp(): string {
        return EntityHelper.getPropertyName<TSource>(this.sourcePropFn);
    }

    public getTargetProp(): string {
        return EntityHelper.getPropertyName<TTarget>(this.targetPropFun);
    }

    public getTargetEntityClass(): new () => TTarget {
        return this.targetEntityClass;
    }

    public getSelectSql(): string {
        return this.selectSql;
    }

    public getDynamicQuery(): DynamicQuery<TTarget> {
        return this.dynamicQuery;
    }
}
