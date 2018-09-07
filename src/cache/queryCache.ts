import { DynamicQuery } from "ts-dynamic-query";
import { ArrayUtils } from "ts-commons";

export class QueryCache {
  private static instance = new QueryCache();
  private queryCache: DynamicQuery<any>[];
  public static getInstance() {
    return this.instance;
  }

  private constructor() {
    this.queryCache = [];
    // hide constructor.
  }

  public cacheQuery(query: DynamicQuery<any>): void {
    this.queryCache.push(query);
  }

  public clearCache(): void {
    this.queryCache = [];
  }

  public removeQuery(query: DynamicQuery<any>): boolean {
    return ArrayUtils.remove(this.queryCache, query);
  }
}
