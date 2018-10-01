import { DynamicQuery } from "ts-dynamic-query";
import { Entity } from "./entity";
import { RelationBase } from "./relationBase";

// one to one
export class AssociationRelation<TSource extends Entity, TTarget extends Entity> extends RelationBase {
  private readonly mappingProp: keyof TSource;
  private readonly sourceKeyProp: keyof TSource;
  private readonly targetKeyProp: keyof TTarget;
  private readonly targetEntityClass: { new (): TTarget };
  private readonly selectSql: string;
  private readonly dynamicQuery: DynamicQuery<TTarget>;

  constructor(
    // one to one.
    mappingProp: keyof TSource,
    sourceKeyProp: keyof TSource,
    targetKeyProp: keyof TTarget,
    targetEntityClass: { new (): TTarget },
    selectSql: string,
    dynamicQuery: DynamicQuery<TTarget> = null,
  ) {
    super();

    this.mappingProp = mappingProp;
    this.sourceKeyProp = sourceKeyProp;
    this.targetKeyProp = targetKeyProp;
    this.targetEntityClass = targetEntityClass;
    this.dynamicQuery = dynamicQuery;
    this.selectSql = selectSql;
  }

  public getMappingProp(): string {
    return this.mappingProp.toString();
  }

  public getSourceProp(): string {
    return this.sourceKeyProp.toString();
  }

  public getTargetProp(): string {
    return this.targetKeyProp.toString();
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
