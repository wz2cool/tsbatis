import { DynamicQuery } from "ts-dynamic-query";
import { QueryCacheInternal } from "./queryCacheInternal";

export class QueryCache {
  public static addQuery(query: DynamicQuery<any>): void {
    return this.queryCache.addQuery(query, null);
  }

  public static removeQuery(query: DynamicQuery<any>): boolean {
    return this.queryCache.removeQuery(query);
  }

  public static clearQuerys(): void {
    return this.queryCache.clearQuerys();
  }
  private static readonly queryCache = QueryCacheInternal.getInstance();
}
