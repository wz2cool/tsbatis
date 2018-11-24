import { expect } from "chai";
import { EntityCache } from "../../src/cache/entityCache";
import { EntityHelper } from "../../src/helper";
import { ColumnInfo } from "../../src/model/columnInfo";

describe(".EntityCache", () => {
  describe("#addColumnInfo", () => {
    const cache = EntityCache.getInstance();

    it("should get column after adding it", () => {
      const targetConstrutor = EntityHelper.getTargetConstrutor(ColumnInfo);
      const colInfo = new ColumnInfo();
      colInfo.columnName = "colName";
      colInfo.property = "prop";
      colInfo.table = "table";
      colInfo.targetConstructor = targetConstrutor;
      cache.cacheColumnInfo(colInfo);

      const result = cache.getColumnInfo(targetConstrutor, "prop");
      expect(colInfo.columnName).to.be.eq(result.columnName);
      expect(colInfo.property).to.be.eq(result.property);
      expect(colInfo.table).to.be.eq(result.table);
    });

    it("should get columns after adding multi columns", () => {
      const targetConstrutor2 = EntityHelper.getTargetConstrutor(ColumnInfo);
      const colInfo1 = new ColumnInfo();
      colInfo1.columnName = "colName";
      colInfo1.property = "prop";
      colInfo1.table = "table";
      colInfo1.targetConstructor = targetConstrutor2;
      cache.cacheColumnInfo(colInfo1);

      const colInfo2 = new ColumnInfo();
      colInfo2.columnName = "colName2";
      colInfo2.property = "prop2";
      colInfo2.table = "table";
      colInfo2.targetConstructor = targetConstrutor2;
      cache.cacheColumnInfo(colInfo2);

      const targetConstrutor = EntityHelper.getTargetConstrutor(ColumnInfo);
      const result = cache.getColumnInfos(targetConstrutor);
      expect(2).to.be.eq(result.length);
    });
  });

  describe("#getColumnInfo", () => {
    const cache = EntityCache.getInstance();
    const colInfo = new ColumnInfo();
    colInfo.columnName = "colName";
    colInfo.property = "prop";
    colInfo.table = "table";
    cache.cacheColumnInfo(colInfo);
    const targetConstrutor = EntityHelper.getTargetConstrutor(colInfo);
    it("should return null, if entity not found", () => {
      const result = cache.getColumnInfo(targetConstrutor, "name");
      expect(null).to.be.eq(result);
    });

    it("should return null, if prop not found", () => {
      const result = cache.getColumnInfo(targetConstrutor, "notfoundProp");
      expect(null).to.be.eq(result);
    });

    it("should return null, if targetConstructor not found", () => {
      const result = cache.getColumnInfo(null, "name");
      expect(null).to.be.eq(result);
    });
  });

  describe("#getColumnInfos", () => {
    const cache = EntityCache.getInstance();
    const colInfo = new ColumnInfo();
    colInfo.columnName = "colName";
    colInfo.property = "prop";
    colInfo.table = "table";
    colInfo.targetConstructor = EntityHelper.getTargetConstrutor(ColumnInfo);
    cache.cacheColumnInfo(colInfo);

    it("should return empty array, if entity not found", () => {
      const result = cache.getColumnInfos(null);
      expect(0).to.be.eq(result.length);
    });

    it("should return columns", () => {
      const targetConstrutor = EntityHelper.getTargetConstrutor(ColumnInfo);
      const result = cache.getColumnInfos(targetConstrutor);
      expect(true).to.be.eq(result.length > 0);
    });
  });

  describe("#getProperties", () => {
    const cache = EntityCache.getInstance();
    const colInfo = new ColumnInfo();
    colInfo.columnName = "colName";
    colInfo.property = "prop";
    colInfo.table = "table";
    colInfo.targetConstructor = EntityHelper.getTargetConstrutor(ColumnInfo);
    cache.cacheColumnInfo(colInfo);

    it("should return ['prop'], if entity exists", () => {
      const targetConstrutor = EntityHelper.getTargetConstrutor(ColumnInfo);
      const result = cache.getProperties(targetConstrutor);
      expect("prop").to.be.eq(result[0]);
    });
    it("should return [], if entity does not exist", () => {
      const result = cache.getProperties(null);
      expect(0).to.be.eq(result.length);
    });
  });
});
