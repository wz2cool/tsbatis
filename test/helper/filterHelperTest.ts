import { expect } from "chai";
import { FilterOperator } from "ts-dynamic-query";
import { FilterHelper } from "../../src/helper";
import { ColumnInfo } from "../../src/model";

describe(".FilterHelper", () => {
  describe("#processSingleFilterValue", () => {
    it("should return 1% if operator is startwith and value is 1", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.START_WITH, 1);
      expect("1%").to.be.eq(result);
    });

    it("should return % if operator is startwith and value is null", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.START_WITH, null);
      expect("%").to.be.eq(result);
    });

    it("should return %1 if operator is endwith and value is 1", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.END_WITH, 1);
      expect("%1").to.be.eq(result);
    });

    it("should return % if operator is endwith and value is null", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.END_WITH, null);
      expect("%").to.be.eq(result);
    });

    it("should return %1 if operator is endwith and value is 1", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.CONTAINS, 1);
      expect("%1%").to.be.eq(result);
    });

    it("should return %% if operator is endwith and value is null", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.CONTAINS, null);
      expect("%%").to.be.eq(result);
    });

    it("should return null if opeartor is equal and value is null", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.EQUAL, null);
      expect(null).to.be.eq(result);
    });

    it("should return value if opeartor is equal and value is not null", () => {
      const result = (FilterHelper as any).processSingleFilterValue(FilterOperator.EQUAL, 1);
      expect(1).to.be.eq(result);
    });
  });

  describe("#getFilterValues", () => {
    it("shoud return array if operator is 'IN' and value is array", () => {
      const filterValues = [1, 2];
      const result = (FilterHelper as any).getFilterValues(FilterOperator.IN, filterValues);
      expect(filterValues).to.be.eq(result);
    });

    it("shoud return error if operator is 'IN' and value is 1", () => {
      function test() {
        (FilterHelper as any).getFilterValues(FilterOperator.IN, 1);
      }
      expect(test).to.throw(TypeError);
    });

    it("shoud return array if operator is 'NOT_IN' and value is array", () => {
      const filterValues = [1, 2];
      const result = (FilterHelper as any).getFilterValues(FilterOperator.NOT_IN, filterValues);
      expect(filterValues).to.be.eq(result);
    });

    it("shoud return error if operator is 'NOT_IN' and value is 1", () => {
      function test() {
        (FilterHelper as any).getFilterValues(FilterOperator.NOT_IN, 1);
      }
      expect(test).to.throw(TypeError);
    });

    it("shoud return array if operator is 'BETWEEN' and value is array", () => {
      const filterValues = [1, 2];
      const result = (FilterHelper as any).getFilterValues(FilterOperator.BETWEEN, filterValues);
      expect(filterValues).to.be.eq(result);
    });

    it("shoud return error if operator is 'BETWEEN' and value is 1", () => {
      function test() {
        (FilterHelper as any).getFilterValues(FilterOperator.BETWEEN, 1);
      }
      expect(test).to.throw(TypeError);
    });

    it("shoud return error if operator is 'BETWEEN' and value is [1,2,3]", () => {
      function test() {
        (FilterHelper as any).getFilterValues(FilterOperator.BETWEEN, [1, 2, 3]);
      }
      expect(test).to.throw(TypeError);
    });

    it("should return error if operator not 'IN', 'NOT_IN', 'BETWEEN', value is [1,2,3]", () => {
      function test() {
        (FilterHelper as any).getFilterValues(FilterOperator.EQUAL, [1, 2, 3]);
      }
      expect(test).to.throw(TypeError);
    });

    it("should return null if operator is 'EQUAL' and value is null", () => {
      const result = (FilterHelper as any).getFilterValues(FilterOperator.EQUAL, null);
      expect(null).to.be.eq(result[0]);
    });

    it("should return [1] if operator is 'EQUAL' and value is 1 ", () => {
      const result = (FilterHelper as any).getFilterValues(FilterOperator.EQUAL, 1);
      expect(1).to.be.eq(result[0]);
    });
  });

  describe("#getEqualExpression", () => {
    const opeartor = FilterOperator.EQUAL;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "name";
    columnInfo.property = "name";
    columnInfo.table = "student";
    it("expression should return 'is null' if value is null", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, null);
      expect("student.name IS NULL").to.be.eq(result.sqlExpression);
    });

    it("expression should return '[column] = ?' if value is null", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, "frank");
      expect("student.name = ?").to.be.eq(result.sqlExpression);
      expect("frank").to.be.eq(result.params[0]);
    });
  });

  describe("#getNotEqualExpression", () => {
    const opeartor = FilterOperator.NOT_EQUAL;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "name";
    columnInfo.property = "name";
    columnInfo.table = "student";
    it("expression should return 'IS NOT NULL' if value is null", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, null);
      expect("student.name IS NOT NULL").to.be.eq(result.sqlExpression);
    });

    it("expression should return '[column] <> ?' if value is null", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, "frank");
      expect("student.name <> ?").to.be.eq(result.sqlExpression);
      expect("frank").to.be.eq(result.params[0]);
    });
  });

  describe("#getLessThanExpression", () => {
    const opeartor = FilterOperator.LESS_THAN;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "age";
    columnInfo.property = "age";
    columnInfo.table = "student";
    it("expression should return '[column] < ?'", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
      expect("student.age < ?").to.be.eq(result.sqlExpression);
      expect(30).to.be.eq(result.params[0]);
    });
  });

  describe("#getLessThanOrEqualExpression", () => {
    const opeartor = FilterOperator.LESS_THAN_OR_EQUAL;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "age";
    columnInfo.property = "age";
    columnInfo.table = "student";
    it("expression should return '[column] <= ?'", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
      expect("student.age <= ?").to.be.eq(result.sqlExpression);
      expect(30).to.be.eq(result.params[0]);
    });
  });

  describe("#getGreaterThanOrEqualExpression", () => {
    const opeartor = FilterOperator.GREATER_THAN_OR_EQUAL;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "age";
    columnInfo.property = "age";
    columnInfo.table = "student";
    it("expression should return '[column] >= ?'", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
      expect("student.age >= ?").to.be.eq(result.sqlExpression);
      expect(30).to.be.eq(result.params[0]);
    });
  });

  describe("#getGreaterThanExpression", () => {
    const opeartor = FilterOperator.GREATER_THAN;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "age";
    columnInfo.property = "age";
    columnInfo.table = "student";
    it("expression should return '[column] > ?'", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, 30);
      expect("student.age > ?").to.be.eq(result.sqlExpression);
      expect(30).to.be.eq(result.params[0]);
    });
  });

  describe("#getLikeExpression", () => {
    const opeartor = FilterOperator.START_WITH;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "name";
    columnInfo.property = "name";
    columnInfo.table = "student";
    it("expression should return '[column] > ?'", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, "fra");
      expect("student.name LIKE ?").to.be.eq(result.sqlExpression);
      expect("fra%").to.be.eq(result.params[0]);
    });
  });

  describe("#getInExpression", () => {
    const opeartor = FilterOperator.IN;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "age";
    columnInfo.property = "age";
    columnInfo.table = "student";
    it("expression should return '[column] IN (?, ?, ?)' if array is not empty.", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, [10, 20, 30]);
      expect("student.age IN (?, ?, ?)").to.be.eq(result.sqlExpression);
      expect(10).to.be.eq(result.params[0]);
      expect(20).to.be.eq(result.params[1]);
      expect(30).to.be.eq(result.params[2]);
    });

    it("expression should return empty if array is empty.", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, []);
      expect("").to.be.eq(result.sqlExpression);
      expect(0).to.be.eq(result.params.length);
    });
  });

  describe("#getNotInExpression", () => {
    const opeartor = FilterOperator.NOT_IN;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "age";
    columnInfo.property = "age";
    columnInfo.table = "student";
    it("expression should return '[column] NOT IN (?, ?, ?)' if array is not empty.", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, [10, 20, 30]);
      expect("student.age NOT IN (?, ?, ?)").to.be.eq(result.sqlExpression);
      expect(10).to.be.eq(result.params[0]);
      expect(20).to.be.eq(result.params[1]);
      expect(30).to.be.eq(result.params[2]);
    });

    it("expression should return empty if array is empty.", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, []);
      expect("").to.be.eq(result.sqlExpression);
      expect(0).to.be.eq(result.params.length);
    });
  });

  describe("#getBetweenExpression", () => {
    const opeartor = FilterOperator.BETWEEN;
    const columnInfo = new ColumnInfo();
    columnInfo.columnName = "age";
    columnInfo.property = "age";
    columnInfo.table = "student";
    it("expression should return '[column] BETWEEN ? AND ?' if array is not empty.", () => {
      const result = FilterHelper.getFilterExpression(opeartor, columnInfo, [10, 20]);
      expect("student.age BETWEEN ? AND ?").to.be.eq(result.sqlExpression);
      expect(10).to.be.eq(result.params[0]);
      expect(20).to.be.eq(result.params[1]);
    });
  });
});
