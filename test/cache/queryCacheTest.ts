import { expect } from "chai";
import { DynamicQuery } from "ts-dynamic-query";
import { QueryCache } from "../../src/cache/queryCache";
import { QueryCacheInternal } from "../../src/cache/queryCacheInternal";
import { ColumnInfo } from "../../src/model/columnInfo";

describe(".QueryCache", () => {
  describe("#addColumnInfo", () => {
    const queryCacheInternal = QueryCacheInternal.getInstance();

    it("add query to cache should success", () => {
      const query = new DynamicQuery<ColumnInfo>();

      QueryCache.addQuery(query);
      const getAll = queryCacheInternal.getAllQuerys();
      expect(getAll[0]).to.be.eq(query);
      QueryCache.clearQuerys();
    });

    it("remove cache should be success", () => {
      const query = new DynamicQuery<ColumnInfo>();
      QueryCache.addQuery(query);
      QueryCache.removeQuery(query);
      const getAll = queryCacheInternal.getAllQuerys();
      expect(0).to.be.eq(getAll.length);
      QueryCache.clearQuerys();
    });
  });
});
