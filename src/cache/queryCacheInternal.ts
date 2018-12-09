import { DynamicQuery } from "ts-dynamic-query";
import { SqlTemplate } from "../model";

export class QueryCacheInternal {
  public static getInstance() {
    return this.instance;
  }
  private static instance = new QueryCacheInternal();
  private queryCache: Map<DynamicQuery<any>, SqlTemplate> = new Map<DynamicQuery<any>, SqlTemplate>();

  private constructor() {
    // hide constructor.
  }

  public getCache(query: DynamicQuery<any>): SqlTemplate {
    return this.queryCache.get(query);
  }

  public containsQuery(query: DynamicQuery<any>): boolean {
    return this.queryCache.has(query);
  }

  public addQuery(query: DynamicQuery<any>, sqlTemplate?: SqlTemplate): void {
    this.queryCache.set(query, sqlTemplate);
  }

  public clearQuerys(): void {
    this.queryCache.clear();
  }

  public removeQuery(query: DynamicQuery<any>): boolean {
    return this.queryCache.delete(query);
  }

  public getAllQuerys(): Array<DynamicQuery<any>> {
    return Array.from(this.queryCache.keys());
  }
}
