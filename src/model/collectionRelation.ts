import { DynamicQuery } from "ts-dynamic-query";
import { Entity } from "./entity";
import { RelationBase } from "./relationBase";

// one to many
export class CollectionRelation<TSource extends Entity, TTarget extends Entity> extends RelationBase {
  private readonly mappingProp: keyof TSource;
  private readonly sourceProp: keyof TSource;
  private readonly targetProp: keyof TTarget;
  private readonly targetEntityClass: { new (): TTarget };
  private readonly selectSql: string;
  private readonly dynamicQuery: DynamicQuery<TTarget>;

  constructor(
    // one to many.
    mappingProp: keyof TSource,
    sourceProp: keyof TSource,
    targetProp: keyof TTarget,
    targetEntityClass: { new (): TTarget },
    selectSql: string,
    dynamicQuery: DynamicQuery<TTarget> = null,
  ) {
    super();

    this.mappingProp = mappingProp;
    this.sourceProp = sourceProp;
    this.targetProp = targetProp;
    this.targetEntityClass = targetEntityClass;
    this.dynamicQuery = dynamicQuery;
    this.selectSql = selectSql;
  }

  public getMappingProp(): string {
    return this.mappingProp.toString();
  }

  public getSourceProp(): string {
    return this.sourceProp.toString();
  }

  public getTargetProp(): string {
    return this.targetProp.toString();
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
