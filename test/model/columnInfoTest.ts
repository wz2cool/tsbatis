import { expect } from "chai";
import { ColumnInfo } from "../../src/model";

describe(".ColumnInfo", () => {
  describe("#getQueryColumn", () => {
    it("should return [column] if table is empty", () => {
      const filter = new ColumnInfo();
      filter.columnName = "name";
      expect("name").to.be.eq(filter.getQueryColumn());
    });

    it("should return [table].[column] if table is not empty", () => {
      const filter = new ColumnInfo();
      filter.columnName = "name";
      filter.table = "student";
      expect("student.name").to.be.eq(filter.getQueryColumn());
    });
  });
});
