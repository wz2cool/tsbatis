import { EntityHelper } from "../helper";
import { DynamicQuery } from "./dynamicQuery";
import { Entity } from "./entity";
import { RelationBase } from "./relationBase";

// one to one
export class AssociationRelation<TSource extends Entity, TRef extends Entity> extends RelationBase {
    private readonly mappingPropFn: (t: TSource) => TRef;
    private readonly sourcePropFn: (t: TSource) => any;
    private readonly refPropFun: (t: TRef) => any;
    private readonly refEntityClass: { new(): TRef };
    private readonly selectSql: string;
    private readonly dynamicQuery: DynamicQuery<TRef>;

    constructor(
        // one to one.
        mappingPropFn: (t: TSource) => TRef,
        sourcePropFn: (t: TSource) => any,
        refPropFn: (t: TRef) => any,
        refEntityClass: { new(): TRef },
        selectSql: string,
        dynamicQuery: DynamicQuery<TRef> = null) {
        super();

        this.mappingPropFn = mappingPropFn;
        this.sourcePropFn = sourcePropFn;
        this.refPropFun = refPropFn;
        this.refEntityClass = refEntityClass;
        this.dynamicQuery = dynamicQuery;
        this.selectSql = selectSql;
    }

    public getMappingProp(): string {
        return EntityHelper.getPropertyName<TSource>(this.mappingPropFn);
    }

    public getSourceProp(): string {
        return EntityHelper.getPropertyName<TSource>(this.sourcePropFn);
    }

    public getRefSourceProp(): string {
        return EntityHelper.getPropertyName<TRef>(this.refPropFun);
    }

    public getRefEntityClass(): new () => TRef {
        return this.refEntityClass;
    }

    public getSelectSql(): string {
        return this.selectSql;
    }

    public getDynamicQuery(): DynamicQuery<TRef> {
        return this.dynamicQuery;
    }
}
